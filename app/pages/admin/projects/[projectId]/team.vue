<template>
  <div class="p-flow">
    <div class="p-cluster header-container">
      <h1 class="p-heading-2">Členové</h1>
      <button
        v-if="canInviteMembers"
        type="button"
        class="p-button p-button-small"
        @click="showInviteModal = true"
      >
        <Icon name="uil-user-plus" />
        Pozvat člena
      </button>
    </div>

    <div class="members-list">
      <div v-for="member of members" :key="member.userId" class="member-card">
        <div class="member-info">
          <span class="member-name">{{ member.name }}</span>
          <span class="member-email">{{ member.email }}</span>
        </div>
        <div class="member-actions">
          <span class="role-badge" :class="member.role">
            {{ member.role === "owner" ? "Vlastník" : "Člen" }}
          </span>
          <button
            v-if="canRemoveMembers && member.userId !== currentUserId"
            type="button"
            class="remove-btn"
            @click="removeMember(member.userId)"
          >
            <Icon name="uil-times" />
          </button>
        </div>
      </div>
    </div>

    <!-- Invite Modal -->
    <Teleport to="body">
      <div v-if="showInviteModal" class="modal-overlay">
        <button
          type="button"
          class="modal-backdrop"
          aria-label="Zavřít"
          @click="showInviteModal = false"
        ></button>
        <div class="modal-card">
          <h2 class="modal-title">Pozvat člena</h2>
          <form @submit.prevent="inviteMember">
            <div class="p-form-group">
              <label for="invite-email">Email</label>
              <input
                id="invite-email"
                v-model="inviteEmail"
                type="email"
                placeholder="email@example.com"
                required
              />
              <p v-if="inviteError" class="error-message">{{ inviteError }}</p>
            </div>
            <div class="modal-actions">
              <button
                type="button"
                class="p-button"
                :disabled="inviteLoading"
                @click="showInviteModal = false"
              >
                Zrušit
              </button>
              <button
                type="submit"
                class="p-button p-button-primary"
                :disabled="inviteLoading"
              >
                {{ inviteLoading ? "Zvu..." : "Pozvat" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  pageName: "Členové",
})

useHead({
  title: "Členové | Admin",
})

const route = useRoute("admin-projects-projectId-team")
const projectId = computed(() => route.params.projectId)

const { user } = await useAuth()
const { canInviteMembers, canRemoveMembers } = await useProjectAccess(projectId)

const currentUserId = computed(() => user.value?.id)

// Fetch members from API
const { data: members, refresh: refreshMembers } = useFetch(
  () => `/api/projects/${projectId.value}/members`,
)

const showInviteModal = ref(false)
const inviteEmail = ref("")
const inviteError = ref("")
const inviteLoading = ref(false)

async function inviteMember() {
  inviteError.value = ""
  inviteLoading.value = true

  try {
    await $fetch(`/api/projects/${projectId.value}/members`, {
      method: "POST",
      body: { email: inviteEmail.value },
    })
    inviteEmail.value = ""
    showInviteModal.value = false
    await refreshMembers()
  } catch (err: unknown) {
    const error = err as { data?: { message?: string } }
    inviteError.value = error.data?.message || "Nepodařilo se pozvat uživatele"
  } finally {
    inviteLoading.value = false
  }
}

async function removeMember(memberId: string) {
  try {
    await $fetch(`/api/projects/${projectId.value}/members/${memberId}`, {
      method: "DELETE",
    })
    await refreshMembers()
  } catch (err: unknown) {
    const error = err as { data?: { message?: string } }
    console.error("Failed to remove member:", error.data?.message)
  }
}
</script>

<style scoped>
.header-container {
  justify-content: space-between;
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.member-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3);
  background: var(--surface-0);
  border: var(--border-1);
  border-radius: var(--radius-2);
}

.member-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.member-name {
  font-weight: var(--font-weight-5);
}

.member-email {
  font-size: var(--font-size--1);
  color: var(--text-color-2);
}

.member-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.role-badge {
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size--2);
  border-radius: var(--radius-1);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &.owner {
    background: var(--brand-color);
    color: white;
  }

  &.member {
    background: var(--surface-2);
    color: var(--text-color-2);
  }
}

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-1);
  background: transparent;
  border: none;
  border-radius: var(--radius-1);
  color: var(--text-color-3);
  cursor: pointer;

  &:hover {
    background: var(--surface-1);
    color: var(--negative-color);
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  cursor: default;
}

.modal-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--surface-0);
  border-radius: var(--radius-2);
  min-width: 300px;
}

.modal-title {
  font-size: var(--font-size-2);
  margin: 0;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.error-message {
  color: var(--negative-color);
  font-size: var(--font-size--1);
  margin-top: var(--space-1);
}
</style>
