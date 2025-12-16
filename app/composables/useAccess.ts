export type ProjectRole = "owner" | "member"

export interface ProjectMembership {
  projectId: string
  role: ProjectRole
}

interface AccessState {
  memberships: ProjectMembership[]
  loading: boolean
}

export function useAccess() {
  const { user, isLoggedIn } = useAuth()

  const state = useState<AccessState>("access", () => ({
    memberships: [],
    loading: false,
  }))

  // Fetch memberships when user logs in
  async function fetchMemberships() {
    if (!isLoggedIn.value) {
      state.value.memberships = []
      return
    }

    state.value.loading = true
    try {
      const data = await $fetch("/api/user/memberships")
      state.value.memberships = data
    } catch {
      state.value.memberships = []
    } finally {
      state.value.loading = false
    }
  }

  // Watch for login state changes
  watch(
    isLoggedIn,
    (loggedIn) => {
      if (loggedIn) {
        fetchMemberships()
      } else {
        state.value.memberships = []
      }
    },
    { immediate: true },
  )

  function getProjectRole(projectId: string): ProjectRole | null {
    const membership = state.value.memberships.find(
      (m) => m.projectId === projectId,
    )
    return membership?.role ?? null
  }

  function hasProjectAccess(projectId: string): boolean {
    return getProjectRole(projectId) !== null
  }

  function isProjectOwner(projectId: string): boolean {
    return getProjectRole(projectId) === "owner"
  }

  return {
    user,
    isLoggedIn,
    memberships: computed(() => state.value.memberships),
    loading: computed(() => state.value.loading),
    getProjectRole,
    hasProjectAccess,
    isProjectOwner,
    refetchMemberships: fetchMemberships,
  }
}
