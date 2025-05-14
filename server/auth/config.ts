import type { AuthOptions } from '@/server/auth/types'
import { DiscordProvider } from '@/server/auth/providers/discord'
import { FacebookProvider } from '@/server/auth/providers/facebook'
import { FigmaProvider } from '@/server/auth/providers/figma'
import { GithubProvider } from '@/server/auth/providers/github'
import { GoogleProvider } from '@/server/auth/providers/google'
import { NotionProvider } from '@/server/auth/providers/notion'

/**
 * Configuration constants for session management
 */
export const TOKEN_BYTES = 20 // Number of random bytes for token generation
export const SESSION_EXPIRATION = 1000 * 60 * 60 * 24 * 30 // 30 days in milliseconds
export const SESSION_REFRESH_THRESHOLD = SESSION_EXPIRATION / 2 // 15 days in milliseconds
export const SESSION_COOKIE_NAME = 'auth_token' // Name of the session cookie

/**
 * Authentication configuration
 *
 * @remarks
 * Each provider requires CLIENT_ID and CLIENT_SECRET environment variables
 * (e.g., DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET)
 *
 * Callback URL should be set to: {{ BASE_URL }}/api/auth/{{ PROVIDER }}/callback
 * (e.g., https://yourdomain.com/api/auth/discord/callback)
 */
export const authOptions = {
  discord: new DiscordProvider(),
  facebook: new FacebookProvider(),
  figma: new FigmaProvider(),
  github: new GithubProvider(),
  google: new GoogleProvider(),
  notion: new NotionProvider(),
} satisfies AuthOptions
