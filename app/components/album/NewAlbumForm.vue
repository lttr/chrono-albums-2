<template>
  <div>
    <form class="form" @submit.prevent="onSubmit">
      <div class="p-form-group">
        <label :for="titleId">Název alba</label>
        <input
          :id="titleId"
          type="text"
          name="title"
          required
          minlength="3"
          maxlength="70"
        />
      </div>
      <div class="p-form-group">
        <label :for="monthId">Měsíc konání</label>
        <select :id="monthId" name="month">
          <option v-for="month of months" :key="month" :value="month">
            {{ month }}
          </option>
        </select>
      </div>
      <div class="p-form-group">
        <label :for="yearId">Rok konání</label>
        <select :id="yearId" name="year">
          <option v-for="year of years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
      <div class="p-form-group">
        <label :for="categoryId">Kategorie</label>
        <select :id="categoryId" name="category">
          <option
            v-for="category of categoriesFromDb"
            :key="category.name"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="p-form-group">
        <label :for="projectId">Projekt</label>
        <select :id="projectId" name="project">
          <option
            v-for="project of projects"
            :key="project.name"
            :value="project.id"
          >
            {{ project.name }}
          </option>
        </select>
      </div>
      <button type="submit" class="create">Vytvořit</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { months, years, categories } from "~~/shared/types/albums"

const categoriesFromDb = categories.map((category) => ({
  id: crypto.randomUUID(),
  name: category,
}))

const projects = categories.map((category) => ({
  id: crypto.randomUUID(),
  name: category,
}))

const titleId = useId()
const monthId = useId()
const yearId = useId()
const categoryId = useId()
const projectId = useId()

const error = ref("")

function onSubmit(e: Event) {
  const id = crypto.randomUUID()
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const rawData = Object.fromEntries(formData)
  const result = AlbumSearchParamsSchema.safeParse({
    ...rawData,
    id
  })
  
  if (!result.success) {
    error.value = formatError(result.error)
    console.error('Validation failed:', result.error)
    return
  }

  navigateTo({
    path: `/album/${id}/upload-media`,
    query: result.data
  })
}
</script>

<style scoped>
.form {
  max-width: var(--size-content-2);
}

.create {
  width: auto;
  min-width: 0;
  justify-self: start;
}

.error {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-default);
  background-color: var(--error-alert-bg-color);
  color: var(--error-alert-color);
}
</style>
