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
      signInWithGoogle: async () => {
        await navigateTo("/admin")
      },
      signOut: async () => {
        await navigateTo("/login")
      },
    }
  }

  // Real auth mode
  const client = getAuthClient()
  const session = client.useSession()

  const isLoggedIn = computed(() => !!session.value.data?.user)
  const user = computed(() => session.value.data?.user ?? null)

  async function signInWithGoogle() {
    await client.signIn.social({
      provider: "google",
      callbackURL: "/admin",
    })
  }

  async function signOut() {
    await client.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigateTo("/login")
        },
      },
    })
  }

  return {
    session,
    user,
    isLoggedIn,
    signInWithGoogle,
    signOut,
  }
}
