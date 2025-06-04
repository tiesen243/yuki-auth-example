import type { AuthOptions } from '@/server/auth/types'
import { DiscordProvider } from '@/server/auth/providers/discord'
import { FacebookProvider } from '@/server/auth/providers/facebook'
import { FigmaProvider } from '@/server/auth/providers/figma'
import { GithubProvider } from '@/server/auth/providers/github'
import { GoogleProvider } from '@/server/auth/providers/google'
import { MicrosoftProvider } from '@/server/auth/providers/microsoft'
import { NotionProvider } from '@/server/auth/providers/notion'
import { SpotifyProvider } from '@/server/auth/providers/spotify'

/**
 * Authentication configuration
 *
 * @remarks
 * Each provider requires CLIENT_ID and CLIENT_SECRET environment variables
 * (e.g., DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET)
 *
 * Callback URL should be set to: {{ BASE_URL }}/api/auth/{{ provider }}/callback
 * (e.g., https://yourdomain.com/api/auth/discord/callback)
 */
export const authOptions = {
  cookieKey: 'auth_token',
  cookieOptions: {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  },
  session: {
    expires: 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds
    expiresThreshold: 1000 * 60 * 60 * 24 * 15, // 15 days in milliseconds
  },
  providers: {
    discord: new DiscordProvider(),
    facebook: new FacebookProvider(),
    figma: new FigmaProvider(),
    github: new GithubProvider(),
    google: new GoogleProvider(),
    microsoft: new MicrosoftProvider(),
    notion: new NotionProvider(),
    spotify: new SpotifyProvider(),
  },
} satisfies AuthOptions
