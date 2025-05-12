'use client'

import { Button } from '@/components/ui/button'
import { useSession } from '@/hooks/use-session'

export const AuthShowCase: React.FC = () => {
  const { session, status, signIn, signOut } = useSession()

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'unauthenticated')
    return (
      <div>
        <p>Not authenticated</p>
        <Button onClick={() => signIn('discord')}>Sign In with Discord</Button>
      </div>
    )

  return (
    <div>
      <div className="max-w-md overflow-x-auto">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>

      <Button onClick={signOut}>Logout</Button>
    </div>
  )
}
