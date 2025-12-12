<template>
  <div>
    <h1 class="p-heading-2 page-title">Nové album</h1>

    <form class="album-form" @submit.prevent="onSubmit">
      <div class="p-form-group">
        <label :for="projectSelectId">Projekt</label>
        <select :id="projectSelectId" v-model="form.projectId" required>
          <option :value="null" disabled>Vyberte projekt</option>
          <option
            v-for="project of projects"
            :key="project.id"
            :value="project.id"
          >
            {{ project.name }}
          </option>
        </select>
      </div>

      <div class="p-form-group">
        <label :for="titleId">Název alba</label>
        <input
          :id="titleId"
          v-model="form.title"
          type="text"
          required
          minlength="3"
          maxlength="70"
        />
      </div>

      <div class="p-form-group">
        <label :for="monthId">Měsíc konání</label>
        <select :id="monthId" v-model="form.month">
          <option v-for="month of months" :key="month" :value="month">
            {{ month }}
          </option>
        </select>
      </div>

      <div class="p-form-group">
        <label :for="yearId">Rok konání</label>
        <select :id="yearId" v-model="form.year">
          <option v-for="year of years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

      <div class="p-form-group">
        <label :for="categorySelectId">Kategorie (volitelné)</label>
        <select :id="categorySelectId" v-model="form.categoryId">
          <option :value="null">Bez kategorie</option>
          <option
            v-for="category of projectCategories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="p-cluster form-actions">
        <NuxtLink to="/admin" class="p-button p-button-secondary">
          Zrušit
        </NuxtLink>
        <button
          type="submit"
          class="p-button p-button-brand"
          :disabled="isSubmitting || !form.projectId"
        >
          {{ isSubmitting ? "Vytvářím..." : "Vytvořit album" }}
        </button>
      </div>
    </form>

    <div v-if="submitError" class="submit-error">
      {{ submitError }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { months, years } from "~~/shared/types/albums"

definePageMeta({
  layout: "admin",
  pageName: "Nové album",
})

const router = useRouter()

const { data: projects } = await useFetch("/api/projects")
const { data: categories } = await useFetch("/api/categories")

const projectCategories = computed(
  () => categories.value?.filter((c) => c.projectId === form.projectId) || [],
)

const titleId = useId()
const monthId = useId()
const yearId = useId()
const categorySelectId = useId()
const projectSelectId = useId()

const currentDate = new Date()
const form = reactive({
  projectId: null as string | null,
  title: "",
  month: currentDate.getMonth() + 1,
  year: currentDate.getFullYear(),
  categoryId: null as string | null,
})

// Reset category when project changes
watch(
  () => form.projectId,
  () => {
    form.categoryId = null
  },
)

const isSubmitting = ref(false)
const submitError = ref("")

async function onSubmit() {
  if (!form.projectId) {
    return
  }

  submitError.value = ""
  isSubmitting.value = true

  try {
    const id = crypto.randomUUID()

    router.push({
      path: `/admin/projects/${form.projectId}/albums/${id}/upload`,
      query: {
        title: form.title,
        month: form.month,
        year: form.year,
        categoryId: form.categoryId ?? undefined,
        projectId: form.projectId,
      },
    })
  } catch (err) {
    submitError.value = "Nastala chyba"
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

.album-form {
  max-width: var(--size-content-2);
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
