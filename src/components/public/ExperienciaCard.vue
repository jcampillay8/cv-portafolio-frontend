<template>
  <router-link :to="`/experiencia/${experiencia.id}`" class="card experiencia-card">
    <div class="card-body">
      <div class="card-header">
        <div>
          <h3 class="card-title">{{ experiencia.rol }}</h3>
          <span class="card-company">{{ experiencia.empresa }}</span>
        </div>
        <span class="card-date">{{ formatPeriod(experiencia.periodo_inicio, experiencia.periodo_fin) }}</span>
      </div>
      <p class="card-desc">{{ truncate(experiencia.descripcion_logros, 200) }}</p>
      <div class="card-tags">
        <span v-for="tag in experiencia.tags_industria" :key="tag" class="tag tag-industry">{{ tag }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  experiencia: { type: Object, required: true },
})

function formatPeriod(start, end) {
  const fmt = (d) => new Date(d).toLocaleDateString('es-CL', { year: 'numeric', month: 'short' })
  return `${fmt(start)} - ${end ? fmt(end) : 'Presente'}`
}

function truncate(text, max) {
  return text.length > max ? text.slice(0, max) + '...' : text
}
</script>

<style scoped>
.experiencia-card {
  display: block;
  color: inherit;
}

.experiencia-card:hover {
  text-decoration: none;
  color: inherit;
}

.card-body {
  padding: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-gray-900);
}

.card-company {
  font-size: 0.875rem;
  color: var(--color-accent);
  font-weight: 500;
}

.card-date {
  font-size: 0.8125rem;
  color: var(--color-gray-400);
  white-space: nowrap;
}

.card-desc {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}
</style>
