<template>
  <NuxtLink :to="`/a/${slug}`" class="album-card">
    <div class="album-card__cover">
      <div
        v-if="coverLqip"
        class="album-card__lqip"
        :style="{ backgroundImage: `url(${coverLqip})` }"
      ></div>
      <img
        v-if="coverThumbnail"
        :src="coverThumbnail"
        :alt="title"
        loading="lazy"
        class="album-card__img"
        @load="($event.target as HTMLImageElement).classList.add('loaded')"
      />
      <div v-else class="album-card__placeholder">
        <span>No photos</span>
      </div>
    </div>
    <div class="album-card__info">
      <h3 class="album-card__title">{{ title }}</h3>
      <p class="album-card__meta">
        <span v-if="month">{{ formatMonth(month) }} </span>{{ year }}
        <span class="album-card__count">{{ mediaCount }} photos</span>
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  slug: string
  title: string
  month: number | null
  year: number
  coverThumbnail: string | null
  coverLqip: string | null
  mediaCount: number
  projectName?: string | null
  categoryName?: string | null
}

defineProps<Props>()

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function formatMonth(month: number): string {
  return months[month - 1] ?? ""
}
</script>

<style scoped>
.album-card {
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: var(--radius-2);
  overflow: hidden;
  background: var(--surface-1);
  transition: transform 0.15s ease;
}

.album-card:hover {
  transform: translateY(-2px);
}

.album-card__cover {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: var(--surface-2);
}

.album-card__lqip {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  transform: scale(1.1);
}

.album-card__img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* eslint-disable-next-line vue-scoped-css/no-unused-selector -- class added dynamically */
.album-card__img.loaded {
  opacity: 1;
}

.album-card__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--text-color-3);
  font-size: var(--font-size--1);
}

.album-card__info {
  padding: var(--space-3);
}

.album-card__title {
  margin: 0;
  font-size: var(--font-size-1);
  font-weight: 500;
  line-height: 1.3;
}

.album-card__meta {
  margin: var(--space-1) 0 0;
  font-size: var(--font-size--1);
  color: var(--text-color-2);
  display: flex;
  gap: var(--space-2);
}

.album-card__count {
  margin-left: auto;
}
</style>
