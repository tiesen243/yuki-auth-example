import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { auth, signIn, signOut } from '@/lib/auth'
import { db } from '@/server/db'

export default async function SSRPage() {
  try {
    const session = await auth()

    const linkAccounts = await db.query.accounts.findMany({
      where: (accounts, { eq }) => eq(accounts.userId, session.user?.id ?? ''),
    })

    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
        <div className="flex max-w-md flex-col gap-4 overflow-hidden">
          <h2 className="text-2xl font-bold">User Info</h2>
          <pre>{JSON.stringify(session, null, 2)}</pre>

          <h2 className="text-2xl font-bold">Linked Accounts</h2>
          <pre className="max-h-80 overflow-y-auto">
            {JSON.stringify(linkAccounts, null, 2)}
          </pre>
        </div>

        {session.user && (
          <form
            action={async () => {
              'use server'
              await signOut()
            }}
          >
            <Button>Sign Out</Button>
          </form>
        )}
      </main>
    )
  } catch {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
        <div className="flex max-w-md flex-col gap-4 overflow-hidden">
          <h2 className="text-2xl font-bold">User Info</h2>
          <h2 className="text-2xl font-bold">Linked Accounts</h2>
        </div>

        <form
          className="flex flex-col gap-4"
          action={async (formData: FormData) => {
            'use server'
            await signIn({
              email: formData.get('email') as string,
              password: formData.get('password') as string,
            })
          }}
        >
          <Input name="email" type="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Password" />
          <Button>Sign In</Button>
        </form>
      </main>
    )
  }
}
