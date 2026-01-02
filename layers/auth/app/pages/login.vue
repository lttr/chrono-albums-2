<template>
  <div class="login-page">
    <div class="login-card">
      <template v-if="isPending">
        <h1 class="login-title">Načítám...</h1>
        <p class="login-subtitle">Ověřuji přihlášení</p>
      </template>

      <template v-else-if="isLoggedIn">
        <h1 class="login-title">Přihlášen</h1>
        <p class="login-subtitle">Přesměrovávám...</p>
      </template>

      <template v-else>
        <h1 class="login-title">Přihlášení</h1>
        <p class="login-subtitle">Pro správu alb se přihlaste</p>

        <GoogleSignInButton @click="signInWithGoogle">
          Přihlásit se přes Google
        </GoogleSignInButton>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "default",
})

const route = useRoute()
const { signInWithGoogle, isLoggedIn, isPending } = useAuth()

// After OAuth callback, session loads asynchronously. The middleware can't
// redirect because isPending is true initially. We watch for session to load
// and redirect here once login state is confirmed.
watch(
  [isLoggedIn, isPending],
  ([loggedIn, pending]) => {
    if (!pending && loggedIn) {
      const redirect = route.query.redirect as string | undefined
      navigateTo(redirect && redirect !== "/" ? redirect : "/admin")
    }
  },
  { immediate: true },
)
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
</style>
