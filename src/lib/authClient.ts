import { useSession } from 'next-auth/react'

export function useAuth() {
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'

  return {
    session,
    isLoading,
    isAuthenticated,
    user: session?.user
  }
}