<template>
  <div>
    <h1 class="p-heading-2 page-title">Nové album</h1>

    <form class="album-form" @submit.prevent="onSubmit">
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

useHead({
  title: "Nové album | Admin",
})

const route = useRoute("admin-projects-projectId-albums-new")
const router = useRouter()
const projectId = computed(() => route.params.projectId)

const { data: categories } = await useFetch("/api/categories")

const projectCategories = computed(
  () => categories.value?.filter((c) => c.projectId === projectId.value) || [],
)

const titleId = useId()
const monthId = useId()
const yearId = useId()
const categorySelectId = useId()

const currentDate = new Date()
const form = reactive({
  title: "",
  month: currentDate.getMonth() + 1,
  year: currentDate.getFullYear(),
  categoryId: null as number | null,
})

const isSubmitting = ref(false)
const submitError = ref("")

async function onSubmit() {
  submitError.value = ""
  isSubmitting.value = true

  try {
    const id = crypto.randomUUID()

    // Navigate to upload page with album params
    router.push({
      path: `/admin/projects/${projectId.value}/albums/${id}/upload`,
      query: {
        title: form.title,
        month: form.month,
        year: form.year,
        categoryId: form.categoryId ?? undefined,
        projectId: projectId.value,
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
