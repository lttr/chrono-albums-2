import { createAuthClient } from "better-auth/vue"

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
