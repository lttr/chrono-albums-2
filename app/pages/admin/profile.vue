<template>
  <div class="p-flow">
    <h1 class="p-heading-2">Profil</h1>

    <div v-if="user" class="profile-card">
      <dl class="profile-info">
        <div class="info-row">
          <dt>Jméno</dt>
          <dd>{{ user.name }}</dd>
        </div>
        <div class="info-row">
          <dt>Email</dt>
          <dd>{{ user.email }}</dd>
        </div>
        <div class="info-row">
          <dt>Způsob přihlášení</dt>
          <dd class="login-method">
            <Icon name="uil-google" />
            Google
          </dd>
        </div>
      </dl>

      <button type="button" class="logout-btn" @click="handleLogout">
        <Icon name="uil-signout" />
        Odhlásit se
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  pageName: "Profil",
})

const { user, logout } = useUser()
const router = useRouter()

function handleLogout() {
  logout()
  router.push("/login")
}
</script>

<style scoped>
.profile-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-5);
  background: var(--surface-0);
  border: var(--border-1);
  border-radius: var(--radius-2);
  max-width: 400px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin: 0;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.info-row dt {
  font-size: var(--font-size--1);
  color: var(--text-color-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-row dd {
  margin: 0;
  font-size: var(--font-size-1);
}

.login-method {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--surface-1);
  border: var(--border-1);
  border-radius: var(--radius-2);
  cursor: pointer;
  color: var(--text-color-2);

  &:hover {
    background: var(--surface-2);
    color: var(--text-color-1);
  }
}
</style>
