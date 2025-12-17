export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth()

  // Protect admin routes
  if (to.path.startsWith("/admin") && !isLoggedIn.value) {
    return navigateTo("/login")
  }

  // Redirect logged-in users away from login page
  if (to.path === "/login" && isLoggedIn.value) {
    return navigateTo("/admin")
  }
})
