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
            v-for="category of categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
      <button type="submit" class="create">Vytvořit</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
const titleId = useId()
const monthId = useId()
const yearId = useId()
const categoryId = useId()

const currentYear = new Date().getFullYear()
const firstYear = 1968
const years = Array.from(
  Array(currentYear - firstYear + 1),
  (_, i) => firstYear + i,
).reverse()
const months = Array.from(Array(12), (_, i) => i + 1).reverse()

const categories = [
  "Akce oddílu",
  "Tábory",
  "Svojsíkovy závody",
  "Roveři",
  "Tábořiště",
  "Oddílové hry",
  "Klubovny",
]

function onSubmit(e: Event) {
  const id = crypto.randomUUID()
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const searchParams = new URLSearchParams(
    formData as unknown as Record<string, string>,
  ).toString()
  navigateTo(`/album/${id}/upload-media?${searchParams}`)
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
</style>
