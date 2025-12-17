import type { H3Event } from "h3"
import { auth } from "~~/layers/auth/server/utils/auth"
import { MOCK_USER } from "~~/shared/constants/mockAuth"

export { MOCK_USER }

export const MOCK_SESSION = {
  user: MOCK_USER,
  session: {
    id: "mock-session-001",
    token: "mock-token",
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    userId: MOCK_USER.id,
  },
}

export function isMockAuthEnabled() {
  return useRuntimeConfig().public.mockAuth === true
}

/**
 * Get the current auth session, using mock session when NUXT_PUBLIC_MOCK_AUTH=true
 */
export async function getAuthSession(event: H3Event) {
  if (isMockAuthEnabled()) {
    return MOCK_SESSION
  }
  return auth.api.getSession({ headers: event.headers })
}
