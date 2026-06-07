import { useState } from 'react'
import { auth, db } from '../firebase'
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore'

/**
 * CreatorAuth.jsx — Anime1Point Creators Hub
 *
 * Separate creator account flow (distinct from viewer accounts).
 * On sign-up, a Firestore document is created under /creators/{uid} with:
 *   - Basic profile (name, email, channelUrl, channelId, category, bio, etc.)
 *   - youtubeApiKey: stored encrypted server-side via Cloud Function write
 *     (the key is NEVER stored in plain text client-side)
 *   - status: 'pending' (admin must approve before the feed goes live)
 *
 * After auth, the creator's Firestore UID is used by the Cloud Function
 * to fetch their YouTube videos securely.
 */

const GOOGLE_PROVIDER = new GoogleAuthProvider()

// ─── Firestore helper ────────────────────────────────────────────────────────

/**
 * Save creator profile to Firestore.
 * The YouTube API key is sent to the Cloud Function SEPARATELY for encrypted storage.
 * It is NOT stored in this Firestore document.
 */
async function saveCreatorProfile(uid, profile) {
  const ref = doc(db, 'creators', uid)
  await setDoc(ref, {
    uid,
    name:         profile.name,
    email:        profile.email,
    channelUrl:   profile.channelUrl,
    channelName:  profile.channelName,
    channelId:    profile.channelId,
    category:     profile.category,
    genres:       profile.genres,
    bio:          profile.bio,
    referral:     profile.referral,
    status:       'pending',         // admin must approve
    createdAt:    serverTimestamp(),
    updatedAt:    serverTimestamp(),
    // NOTE: youtubeApiKey is NOT stored here — it goes through the secure Cloud Function
  }, { merge: true })
}

/**
 * Send the YouTube API key to the secure Cloud Function for encrypted storage.
 * The key is NEVER stored in plain text in Firestore or sent back to the client.
 */
async function storeApiKeySecurely(uid, idToken, apiKey) {
  const res = await fetch(
    'https://us-central1-anime1point-hub.cloudfunctions.net/storeCreatorApiKey',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify({ uid, apiKey }),
    }
  )
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to store API key securely')
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CreatorAuth() {
  const [tab, setTab] = useState('signup')   // 'signup' | 'login'
  const [step, setStep] = useState(1)        // 1 = auth, 2 = channel details
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    channelUrl: '', channelName: '', channelId: '',
    youtubeApiKey: '',
    category: '', genres: '', bio: '', referral: '',
  })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  // ── Step 1: Create Firebase account ────────────────────────────────────────

  async function handleGoogleSignIn() {
    setLoading(true); setError('')
    try {
      const result = await signInWithPopup(auth, GOOGLE_PROVIDER)
      setUser(result.user)
      setForm(prev => ({ ...prev, name: result.user.displayName || '', email: result.user.email || '' }))
      setStep(2)
    } catch (err) {
      setError(err.code === 'auth/popup-closed-by-user' ? 'Popup closed — please try again.' : err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleEmailSignUp(e) {
    e.preventDefault()
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true); setError('')
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await updateProfile(cred.user, { displayName: form.name })
      setUser(cred.user)
      setStep(2)
    } catch (err) {
      const msgs = {
        'auth/email-already-in-use': 'This email is already registered. Try signing in.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/weak-password': 'Password too weak — use at least 8 characters.',
      }
      setError(msgs[err.code] || err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleEmailSignIn(e) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const cred = await signInWithEmailAndPassword(auth, form.email, form.password)
      setUser(cred.user)
      // Check if they already have a profile
      const existing = await getDoc(doc(db, 'creators', cred.user.uid))
      if (existing.exists()) {
        setSubmitted(true) // Already registered
      } else {
        setStep(2)
      }
    } catch (err) {
      const msgs = {
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/invalid-credential': 'Invalid email or password.',
      }
      setError(msgs[err.code] || err.message)
    } finally {
      setLoading(false)
    }
  }

  // ── Step 2: Save channel details ────────────────────────────────────────────

  async function handleChannelSubmit(e) {
    e.preventDefault()
    if (!user) { setError('Please sign in first.'); return }
    if (!form.channelId || !form.youtubeApiKey) {
      setError('Channel ID and YouTube API Key are required.')
      return
    }
    setLoading(true); setError('')
    try {
      // 1. Save the public profile to Firestore (no API key here)
      await saveCreatorProfile(user.uid, form)

      // 2. Send API key to the secure Cloud Function
      const idToken = await user.getIdToken()
      await storeApiKeySecurely(user.uid, idToken, form.youtubeApiKey)

      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center bg-bg-card border border-border-dim rounded-2xl p-10">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="font-orbitron font-black text-2xl text-accent2 mb-3">Application Received!</h2>
          <p className="text-text-secondary leading-relaxed">
            Thank you, <strong className="text-text-primary">{user?.displayName || form.name}</strong>!
            Your creator application has been submitted. Our admin team will review your YouTube channel
            and get back to you within 2–3 business days.
          </p>
          <p className="text-text-secondary text-sm mt-4">
            Your YouTube API key has been stored securely — it will only be used to display
            your latest videos on your creator profile.
          </p>
          <a href="/index.html" className="btn-primary inline-block mt-8">← Back to Home</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-lg mx-auto">

        {step === 1 && (
          <>
            {/* Tab switcher */}
            <div className="flex gap-0 mb-0 border-b-2 border-border-dim">
              {['signup', 'login'].map(t => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setError('') }}
                  className={`flex-1 py-3 font-rajdhani font-bold text-sm uppercase tracking-widest transition-colors ${
                    tab === t
                      ? 'bg-bg-card text-text-primary border-b-2 border-accent -mb-0.5'
                      : 'bg-bg-card2 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {t === 'signup' ? '✦ Create Account' : '→ Sign In'}
                </button>
              ))}
            </div>

            <div className="bg-bg-card border border-border-dim rounded-b-2xl p-8">
              {error && (
                <div className="bg-accent/10 border border-accent/30 text-red-300 rounded-lg px-4 py-3 mb-6 text-sm">
                  {error}
                </div>
              )}

              {/* Google */}
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-white text-gray-900 border-2 border-gray-300 rounded-lg py-3 px-5 font-rajdhani font-bold text-base flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:opacity-60 mb-6"
              >
                <span className="font-black text-blue-500 text-lg">G</span>
                Continue with Google
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-border-dim" />
                <span className="text-text-secondary text-xs uppercase tracking-wider">or email</span>
                <div className="flex-1 h-px bg-border-dim" />
              </div>

              <form onSubmit={tab === 'signup' ? handleEmailSignUp : handleEmailSignIn} className="space-y-4">
                {tab === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Your Name *</label>
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder="Creator name or alias" required
                      className="w-full bg-bg-dark border border-border-dim rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-purple/50 text-sm" />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com" required
                    className="w-full bg-bg-dark border border-border-dim rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-purple/50 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Password *</label>
                  <input name="password" type="password" value={form.password} onChange={handleChange}
                    placeholder="At least 8 characters" required minLength={8}
                    className="w-full bg-bg-dark border border-border-dim rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-purple/50 text-sm" />
                </div>
                {tab === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Confirm Password *</label>
                    <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange}
                      placeholder="Repeat your password" required minLength={8}
                      className="w-full bg-bg-dark border border-border-dim rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-purple/50 text-sm" />
                  </div>
                )}
                <button type="submit" disabled={loading}
                  className="w-full bg-accent hover:bg-red-700 text-white font-rajdhani font-bold py-3 rounded-lg transition-colors disabled:opacity-60 text-base">
                  {loading ? 'Please wait...' : tab === 'signup' ? '✦ Create Creator Account' : '→ Sign In'}
                </button>
              </form>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="bg-bg-card border border-border-dim rounded-2xl p-8">
            <h2 className="font-orbitron font-black text-xl text-text-primary mb-2">Channel Details</h2>
            <p className="text-text-secondary text-sm mb-6">
              Account created! Now tell us about your YouTube channel.
            </p>

            {error && (
              <div className="bg-accent/10 border border-accent/30 text-red-300 rounded-lg px-4 py-3 mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleChannelSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">YouTube Channel URL *</label>
                <input name="channelUrl" value={form.channelUrl} onChange={handleChange}
                  placeholder="https://www.youtube.com/@yourchannel" required type="url"
                  className="w-full bg-bg-dark border border-border-dim rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-purple/50 text-sm" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">YouTube Channel Name *</label>
                <input name="channelName" value={form.channelName} onChange={handleChange}
                  placeholder="Your channel name as shown on YouTube" required
                  className="w-full bg-bg-dark border border-border-dim rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-purple/50 text-sm" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">YouTube Channel ID *</label>
                <input name="channelId" value={form.channelId} onChange={handleChange}
                  placeholder="UCxxxxxxxxxxxxxxxxxxxxxx" required
                  className="w-full bg-bg-dark border border-border-dim rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-purple/50 text-sm" />
                <p className="text-xs text-text-secondary mt-1.5">
                  Find it at YouTube → Settings → Advanced settings. Starts with <strong>UC</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                  🔑 YouTube Data API Key *
                </label>
                <input name="youtubeApiKey" value={form.youtubeApiKey} onChange={handleChange}
                  placeholder="AIzaSy..." required
                  className="w-full bg-bg-dark border border-border-dim rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-purple/50 text-sm font-mono" />
                <div className="mt-2 text-xs text-text-secondary space-y-1 bg-bg-dark border border-border-dim rounded-lg p-3">
                  <p className="text-accent2 font-semibold mb-1">🔒 Your key is stored securely</p>
                  <p>Your API key is encrypted and stored server-side. It is NEVER exposed in client code or browser requests. It is only used by our secure Cloud Function to fetch your latest videos.</p>
                  <p className="mt-2 font-semibold">How to get a free API key:</p>
                  <ol className="list-decimal list-inside space-y-0.5">
                    <li>Go to Google Cloud Console and create a free project.</li>
                    <li>Enable the YouTube Data API v3.</li>
                    <li>Go to Credentials → Create Credentials → API Key.</li>
                    <li>(Recommended) Restrict the key to YouTube Data API v3 only.</li>
                  </ol>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Content Focus *</label>
                <select name="category" value={form.category} onChange={handleChange} required
                  className="w-full bg-bg-dark border border-border-dim rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-purple/50 text-sm">
                  <option value="">Select your main content type</option>
                  <option value="anime">Anime (Reviews, Breakdowns, Reactions)</option>
                  <option value="manga">Manga (Chapter Reviews, Analysis)</option>
                  <option value="light-novel">Light Novels / Web Novels</option>
                  <option value="mixed">Mixed (Anime + Manga + Novels)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">Favourite Series / Genres</label>
                <input name="genres" value={form.genres} onChange={handleChange}
                  placeholder="e.g. Isekai, Tensura, One Piece, Shonen..."
                  className="w-full bg-bg-dark border border-border-dim rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-purple/50 text-sm" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">About Your Channel *</label>
                <textarea name="bio" value={form.bio} onChange={handleChange}
                  placeholder="Tell viewers what makes your YouTube channel unique." required rows={4}
                  className="w-full bg-bg-dark border border-border-dim rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-purple/50 text-sm resize-none" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-accent hover:bg-red-700 text-white font-rajdhani font-bold py-3.5 rounded-lg transition-colors disabled:opacity-60 text-base">
                {loading ? 'Submitting securely...' : '📡 Submit Creator Application'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
