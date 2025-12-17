/**
 * Mock user for development and testing.
 * Used by both server (server/utils/mockAuth.ts) and client (useAuth composable).
 */
export const MOCK_USER = {
  id: "mock-user-001",
  name: "Dev User",
  email: "dev@localhost",
  emailVerified: true,
  image: null,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
} as const
