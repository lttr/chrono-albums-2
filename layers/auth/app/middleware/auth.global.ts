export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn, isPending } = useAuth()

  // Session loads asynchronously after OAuth callback. Skip redirect logic
  // until we know the actual auth state - login.vue handles post-OAuth redirect.
  if (isPending.value) {
    return
  }

  // Protect admin routes
  if (to.path.startsWith("/admin") && !isLoggedIn.value) {
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
