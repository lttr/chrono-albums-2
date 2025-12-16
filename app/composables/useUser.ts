export interface User {
  id: string
  name: string
  email: string
  loginMethod: "google"
}

export type ProjectRole = "owner" | "member"

export interface ProjectMembership {
  projectId: string
  role: ProjectRole
}

interface UserState {
  user: User | null
  memberships: ProjectMembership[]
}

// Mock data for development
const mockUser: User = {
  id: "user-1",
  name: "Lukáš",
  email: "lukas@example.com",
  loginMethod: "google",
}

const mockMemberships: ProjectMembership[] = [
  { projectId: "1", role: "owner" },
  { projectId: "2", role: "member" },
]

export function useUser() {
  const state = useState<UserState>("user", () => ({
    user: null,
    memberships: [],
  }))

  const isLoggedIn = computed(() => state.value.user !== null)

  function login() {
    state.value = {
      user: mockUser,
      memberships: mockMemberships,
    }
  }

  function logout() {
    state.value = {
      user: null,
      memberships: [],
    }
  }

  function getProjectRole(projectId: string): ProjectRole | null {
    const membership = state.value.memberships.find(
      (m) => m.projectId === projectId,
    )
    return membership?.role ?? null
  }

  return {
    user: computed(() => state.value.user),
    memberships: computed(() => state.value.memberships),
    isLoggedIn,
    login,
    logout,
    getProjectRole,
  }
}
