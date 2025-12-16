export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useUser()

  // Protect admin routes
  if (to.path.startsWith("/admin") && !isLoggedIn.value) {
    return navigateTo("/login")
  }
})
