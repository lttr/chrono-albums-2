<template>
  <div>
    <h1 class="p-heading-2 page-title">Nový projekt</h1>

    <form class="project-form" @submit.prevent="onSubmit">
      <div class="p-form-group">
        <label :for="nameId">Název projektu</label>
        <input
          :id="nameId"
          v-model="form.name"
          type="text"
          required
          :class="{ 'input-error': errors.name }"
        />
        <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
      </div>

      <div class="p-cluster form-actions">
        <NuxtLink to="/project" class="p-button p-button-secondary"
          >Zrušit</NuxtLink
        >
        <button
          type="submit"
          class="p-button p-button-brand"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Vytvářím..." : "Vytvořit projekt" }}
        </button>
      </div>
    </form>

    <div v-if="submitError" class="submit-error">
      {{ submitError }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as z from "zod"

const nameId = useId()
const router = useRouter()

// Form state
const form = reactive({
  name: "",
})

const errors = reactive({
  name: "",
})

const isSubmitting = ref(false)
const submitError = ref("")

// Validation schema with Czech error messages
const ProjectFormSchema = z.object({
  name: z
    .string()
    .check(
      z.minLength(1, "Název projektu je povinný"),
      z.maxLength(100, "Název projektu je příliš dlouhý"),
    ),
})

async function onSubmit() {
  // Reset errors
  errors.name = ""
  submitError.value = ""

  // Validate form
  const result = z.safeParse(ProjectFormSchema, form)
  if (!result.success) {
    for (const issue of result.error.issues) {
      if (issue.path[0] === "name") {
        errors.name = issue.message
      }
    }
    return
  }

  isSubmitting.value = true

  try {
    // Submit to API
    const { error } = await useFetch("/api/projects", {
      method: "POST",
      body: result.data,
    })

    if (error.value) {
      submitError.value = "Nastala chyba při vytváření projektu"
      console.error(error.value)
      return
    }

    // Redirect to projects list
    router.push("/project")
  } catch (err) {
    submitError.value = "Nastala neočekávaná chyba"
    console.error(err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.page-title {
  margin-bottom: var(--space-6);
}

.project-form {
  max-width: var(--size-content-2);
}

.input-error {
  border-color: var(--negative-color);
}

.error-text {
  color: var(--negative-color);
  font-size: var(--font-size--1);
}

.form-actions {
  justify-content: space-between;
  margin-top: var(--space-6);
}

.submit-error {
  margin-top: var(--space-4);
  padding: var(--space-3);
  background-color: var(--error-alert-bg-color);
  color: var(--error-alert-color);
  border-radius: var(--radius-2);
}
</style>
