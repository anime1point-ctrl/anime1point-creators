import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import AdminLayout from './components/layout/AdminLayout'
import ProtectedAdminRoute from './components/layout/ProtectedAdminRoute'
import { AdminProvider } from './context/AdminContext'
import { VideoModalProvider } from './context/VideoModalContext'
import Home from './pages/Home'
import About from './pages/About'
import Creators from './pages/Creators'
import VideoDetail from './pages/VideoDetail'
import CreatorProfile from './pages/CreatorProfile'
import CategoryPage from './pages/CategoryPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCreators from './pages/admin/AdminCreators'
import AdminVideos from './pages/admin/AdminVideos'
import AdminCategories from './pages/admin/AdminCategories'
import AdminHomeSections from './pages/admin/AdminHomeSections'

export default function App() {
  return (
    <AdminProvider>
      <VideoModalProvider>
        <HashRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="creators" element={<Creators />} />
              <Route path="video/:id" element={<VideoDetail />} />
              <Route path="creator/:id" element={<CreatorProfile />} />
              <Route path="category/:slug" element={<CategoryPage />} />
            </Route>
            <Route path="admin" element={<AdminLogin />} />
            <Route element={<ProtectedAdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="admin/dashboard" element={<AdminDashboard />} />
                <Route path="admin/creators" element={<AdminCreators />} />
                <Route path="admin/videos" element={<AdminVideos />} />
                <Route path="admin/categories" element={<AdminCategories />} />
                <Route path="admin/home-sections" element={<AdminHomeSections />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </VideoModalProvider>
    </AdminProvider>
  )
}
