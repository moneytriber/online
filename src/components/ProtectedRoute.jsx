import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function ProtectedRoute({ children }) {
  const { configured, loading, user } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--mf-background)] px-6">
        <div className="text-center">
          <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[var(--mf-primary)]" />
          <p className="mt-4 text-sm font-bold text-slate-500">Opening My Moniebestie...</p>
        </div>
      </div>
    )
  }

  if (!configured) {
    return <Navigate to="/auth" replace state={{ configurationError: true }} />
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />
  }

  return children
}

export default ProtectedRoute
