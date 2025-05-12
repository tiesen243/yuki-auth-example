import { cookies } from 'next/headers'

import { env } from '@/env'
import { auth, signIn, signOut } from '@/server/auth'

export default async function SSRPage() {
  const session = await auth()

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <div className="max-w-md overflow-hidden">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>

      {session.user ? (
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <button>Sign Out</button>
        </form>
      ) : (
        <form
          action={async (formData: FormData) => {
            'use server'

            const { sessionToken, expires } = await signIn({
              email: formData.get('email') as string,
              password: formData.get('password') as string,
            })
            ;(await cookies()).set('auth_token', sessionToken, {
              path: '/',
              httpOnly: true,
              sameSite: 'lax' as const,
              secure: env.NODE_ENV === 'production',
              expires,
            })
          }}
        >
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button>Sign In</button>
        </form>
      )}
    </main>
  )
}
