import { cookies, headers } from 'next/headers'

import * as base from '@/server/auth'
import { authOptions } from '@/server/auth/config'

export const auth = async () => {
  return base.auth({ headers: await headers() })
}

export const signIn = async (options: Parameters<typeof base.signIn>[0]) => {
  const { sessionToken, expires } = await base.signIn(options)
  ;(await cookies()).set({
    name: authOptions.cookieKey,
    value: sessionToken,
    expires,
    ...authOptions.cookieOptions,
  })
}

export const signOut = async () => {
  await base.signOut({ headers: await headers() })
  ;(await cookies()).delete(authOptions.cookieKey)
}
