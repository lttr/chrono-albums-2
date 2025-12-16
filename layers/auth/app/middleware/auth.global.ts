export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn } = useAuth()

  // Protect admin routes
  if (to.path.startsWith("/admin") && !isLoggedIn.value) {
    return navigateTo("/login")
  }
})
