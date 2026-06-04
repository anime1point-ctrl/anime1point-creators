import { Navigate, Outlet } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

export default function ProtectedAdminRoute() {
    const { isAuthed } = useAdmin()
    return isAuthed ? <Outlet /> : <Navigate to="/admin" replace />
}
