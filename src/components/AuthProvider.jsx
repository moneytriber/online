import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../lib/auth-context'
import { getSupabase, supabaseConfigured } from '../lib/supabase'

function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const location = useLocation()
  const accountRoute = location.pathname === '/auth' || location.pathname.startsWith('/dashboard')
  const [loading, setLoading] = useState(() => supabaseConfigured && accountRoute)

  useEffect(() => {
    if (!accountRoute || !supabaseConfigured) {
      return undefined
    }

    let active = true
    let subscription
    Promise.resolve().then(() => {
      if (active) setLoading(true)
    })

    getSupabase().then((supabase) => {
      if (!active) return

      supabase.auth.getSession().then(({ data }) => {
        if (!active) return
        setSession(data.session)
        setLoading(false)
      })

      const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
        setSession(nextSession)
        setLoading(false)
      })
      subscription = listener.subscription
    })

    return () => {
      active = false
      subscription?.unsubscribe()
    }
  }, [accountRoute])

  const signIn = async (email, password) => {
    const supabase = await getSupabase()
    return supabase.auth.signInWithPassword({ email, password })
  }

  const signUp = async (name, email, password) => {
    const supabase = await getSupabase()
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name.trim() },
        emailRedirectTo: `${window.location.origin}/auth`,
      },
    })
  }

  const signOut = async () => {
    const supabase = await getSupabase()
    return supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ configured: supabaseConfigured, loading, session, user: session?.user ?? null, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
