<template>
  <div>
    <h1 class="p-heading-2 page-title">Nová kategorie</h1>

    <form class="category-form" @submit.prevent="onSubmit">
      <div class="p-form-group">
        <label :for="nameId">Název kategorie</label>
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
        <NuxtLink
          :to="`/admin/projects/${projectId}`"
          class="p-button p-button-secondary"
        >
          Zrušit
        </NuxtLink>
        <button
          type="submit"
          class="p-button p-button-brand"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Vytvářím..." : "Vytvořit kategorii" }}
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

definePageMeta({
  layout: "admin",
  pageName: "Nová kategorie",
})

useHead({
  title: "Nová kategorie | Admin",
})

const route = useRoute("admin-projects-projectId-categories-new")
const router = useRouter()
const projectId = computed(() => route.params.projectId)

const nameId = useId()

const form = reactive({
  name: "",
})

const errors = reactive({
  name: "",
})

const isSubmitting = ref(false)
const submitError = ref("")

const CategoryFormSchema = z.object({
  name: z
    .string()
    .check(
      z.minLength(1, "Název kategorie je povinný"),
      z.maxLength(100, "Název kategorie je příliš dlouhý"),
    ),
})

async function onSubmit() {
  errors.name = ""
  submitError.value = ""

  const result = z.safeParse(CategoryFormSchema, form)
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
    const response = await $fetch("/api/categories", {
      method: "POST",
      body: {
        ...result.data,
        projectId: projectId.value,
      },
    })

    router.push(`/admin/projects/${projectId.value}/categories/${response.id}`)
  } catch (err) {
    submitError.value = "Nastala chyba při vytváření kategorie"
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

.category-form {
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
