/**
 * Permission helpers for project-level access control.
 * Frontend-only for now - will be backed by API later.
 *
 * Roles:
 * - owner: created the project, full control
 * - member: invited collaborator, can contribute but not delete structural items
 */
export function useProjectAccess(projectId: MaybeRef<string>) {
  const { getProjectRole } = useAccess()

  const role = computed(() => getProjectRole(toValue(projectId)))
  const isOwner = computed(() => role.value === "owner")
  const isMember = computed(() => role.value !== null)

  // Owner-only actions
  const canEditProject = isOwner
  const canDeleteProject = isOwner
  const canDeleteCategory = isOwner
  const canInviteMembers = isOwner
  const canRemoveMembers = isOwner

  // Any member actions (owner or member)
  const canCreateCategory = isMember
  const canEditCategory = isMember
  const canCreateAlbum = isMember
  const canEditAlbum = isMember
  const canDeleteAlbum = isMember
  const canUploadMedia = isMember
  const canEditMedia = isMember
  const canDeleteMedia = isMember
  const canViewMembers = isMember

  return {
    role,
    isOwner,
    isMember,
    // Project
    canEditProject,
    canDeleteProject,
    // Category
    canCreateCategory,
    canEditCategory,
    canDeleteCategory,
    // Album
    canCreateAlbum,
    canEditAlbum,
    canDeleteAlbum,
    // Media
    canUploadMedia,
    canEditMedia,
    canDeleteMedia,
    // Members
    canViewMembers,
    canInviteMembers,
    canRemoveMembers,
  }
}
