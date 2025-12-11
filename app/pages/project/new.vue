<template>
  <div>
    <h1 class="p-heading-2 page-title">Nový projekt</h1>

    <form class="project-form" @submit.prevent="onSubmit">
      <div class="p-form-group">
        <label :for="nameId">Název projektu</label>
        <input :id="nameId" type="text" required />
      </div>

      <div class="p-cluster form-actions">
        <NuxtLink to="/project" class="p-button p-button-secondary"
          >Zrušit</NuxtLink
        >
        <button type="submit" class="p-button p-button-brand">
          {{ "Vytvořit projekt" }}
        </button>
      </div>
    </form>

    <div v-if="submitError" class="submit-error">
      {{ submitError }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NewProject, ProjectInsertSchema } from "~~/server/database/schema"

const nameId = useId()

const router = useRouter()

const submitError = ref("")

// Use the schema from shared types with Czech error messages
const ProjectFormSchema = NewProjectSchema.extend({
  name: z
    .string()
    .min(1, "Název projektu je povinný")
    .max(100, "Název projektu je příliš dlouhý"),
  description: z.string().max(500, "Popis je příliš dlouhý").optional(),
})

async function createProject() {
  // Reset errors
  errors.name = ""
  errors.description = ""
  submitError.value = ""

  try {
    // Validate form
    const validatedData = ProjectFormSchema.parse(form)

    isSubmitting.value = true

    // Submit to API
    const { error } = await useFetch("/api/projects", {
      method: "POST",
      body: validatedData,
    })

    if (error.value) {
      submitError.value = "Nastala chyba při vytváření projektu"
      console.error(error.value)
      return
    }

    // Redirect to projects list
    router.push("/project")
  } catch (err) {
    // if (err instanceof z.ZodError) {
    //   const formattedErrors = err.format()
    //   if (formattedErrors.name?._errors) {
    //     errors.name = formattedErrors.name._errors.join(", ")
    //   }
    //   if (formattedErrors.description?._errors) {
    //     errors.description = formattedErrors.description._errors.join(", ")
    //   }
    // } else {
    //   submitError.value = "Nastala neočekávaná chyba"
    //   console.error(err)
    // }
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
