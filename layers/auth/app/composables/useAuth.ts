import { createAuthClient } from "better-auth/vue"
import { MOCK_USER } from "~~/shared/constants/mockAuth"

let authClient: ReturnType<typeof createAuthClient> | null = null

function getAuthClient() {
  if (!authClient) {
    authClient = createAuthClient({
      baseURL: useRuntimeConfig().public.authUrl || undefined,
    })
  }
  return authClient
}

export function useAuth() {
  const config = useRuntimeConfig()

  // Mock auth mode - bypass better-auth entirely
  if (config.public.mockAuth) {
    const mockUser = ref(MOCK_USER)
    const mockSession = ref({ data: { user: MOCK_USER } })

    return {
      session: mockSession,
      user: computed(() => mockUser.value),
      isLoggedIn: computed(() => true),
      isPending: computed(() => false),
      signInWithGoogle: async () => {
        const route = useRoute()
        const redirectTo = route.query.redirect as string | undefined
        const callbackURL =
          redirectTo && redirectTo !== "/" ? redirectTo : "/admin"
        await navigateTo(callbackURL)
      },
      signOut: async () => {
        await navigateTo("/login")
      },
    }
  }

  // Real auth mode
  const client = getAuthClient()
  const session = client.useSession()

  const isPending = computed(() => session.value.isPending ?? false)
  const isLoggedIn = computed(() => !!session.value.data?.user)
  const user = computed(() => session.value.data?.user ?? null)

  async function signInWithGoogle() {
    const route = useRoute()
    const redirectTo = route.query.redirect as string | undefined
    // Default to /admin if on homepage or no redirect specified
    const callbackURL = redirectTo && redirectTo !== "/" ? redirectTo : "/admin"

    await client.signIn.social({
      provider: "google",
      callbackURL,
    })
  }

  async function signOut() {
    await client.signOut()
    // Force full page reload to clear client-side session state
    await navigateTo("/login", { external: true })
  }

  return {
    session,
    user,
    isLoggedIn,
    isPending,
    signInWithGoogle,
    signOut,
  }
}
