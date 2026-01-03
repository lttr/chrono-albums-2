export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn } = await useAuth()

  const isAdminRoute = to.path.startsWith("/admin")

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
