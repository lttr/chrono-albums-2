export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn, isPending } = useAuth()

  const isAdminRoute = to.path.startsWith("/admin")

  // While session is loading, redirect protected routes to login.
  // Login page watches auth state and redirects back when session resolves.
  if (isPending.value) {
    if (isAdminRoute) {
      return navigateTo({
        path: "/login",
        query: { redirect: to.fullPath },
      })
    }
    return
  }

  // Protect admin routes
  if (isAdminRoute && !isLoggedIn.value) {
    return navigateTo({
      path: "/login",
      query: { redirect: to.fullPath },
    })
  }

  // Redirect logged-in users away from login page
  if (to.path === "/login" && isLoggedIn.value) {
    const redirect = to.query.redirect as string | undefined
    return navigateTo(redirect && redirect !== "/" ? redirect : "/admin")
  }
})
