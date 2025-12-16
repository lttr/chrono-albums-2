<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-title">Přihlášení</h1>
      <p class="login-subtitle">Pro správu alb se přihlaste</p>

      <button type="button" class="google-btn" @click="handleGoogleLogin">
        <Icon name="uil-google" />
        Přihlásit se přes Google
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "default",
})

const { login, isLoggedIn } = useUser()
const router = useRouter()

// Redirect if already logged in
watch(
  isLoggedIn,
  (loggedIn) => {
    if (loggedIn) {
      router.push("/admin")
    }
  },
  { immediate: true },
)

function handleGoogleLogin() {
  // Mock login - will be replaced with real OAuth
  login()
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.login-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--surface-0);
  border: var(--border-1);
  border-radius: var(--radius-2);
  max-width: 400px;
  width: 100%;
}

.login-title {
  font-size: var(--font-size-3);
  font-weight: var(--font-weight-6);
  margin: 0;
}

.login-subtitle {
  color: var(--text-color-2);
  margin: 0;
  text-align: center;
}

.google-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--surface-1);
  border: var(--border-1);
  border-radius: var(--radius-2);
  font-size: var(--font-size-0);
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: var(--surface-2);
  }
}
</style>
