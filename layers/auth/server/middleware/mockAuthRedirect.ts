import { isMockAuthEnabled } from "~~/server/utils/mockAuth"

export default defineEventHandler((event) => {
  // Redirect /login to /admin when mock auth is enabled
  if (isMockAuthEnabled() && getRequestURL(event).pathname === "/login") {
    return sendRedirect(event, "/admin", 302)
  }
})
