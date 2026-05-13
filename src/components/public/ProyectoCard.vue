<template>
  <router-link :to="`/proyecto/${proyecto.id}`" class="card proyecto-card">
    <div class="card-body">
      <div class="card-header">
        <h3 class="card-title">{{ proyecto.titulo }}</h3>
        <span class="card-date">{{ formatDate(proyecto.fecha_proyecto) }}</span>
      </div>
      <p class="card-desc">{{ proyecto.descripcion_corta }}</p>
      <div class="card-tags">
        <span v-for="tag in proyecto.tags" :key="tag" class="tag tag-industry">{{ tag }}</span>
      </div>
      <div class="card-stack">
        <span v-for="tech in (proyecto.stack_tecnologico || []).slice(0, 5)" :key="tech" class="tag tag-tech">{{ tech }}</span>
        <span v-if="proyecto.stack_tecnologico?.length > 5" class="tag">+{{ proyecto.stack_tecnologico.length - 5 }}</span>
      </div>
      <div v-if="proyecto.kpis && Object.keys(proyecto.kpis).length" class="card-kpis">
        <div v-for="(val, key) in proyecto.kpis" :key="key" class="kpi-item">
          <span class="kpi-value">{{ val }}</span>
          <span class="kpi-label">{{ key }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  proyecto: { type: Object, required: true },
})

function formatDate(d) {
  return new Date(d).toLocaleDateString('es-CL', { year: 'numeric', month: 'short' })
}
</script>

<style scoped>
.proyecto-card {
  display: block;
  color: inherit;
}

.proyecto-card:hover {
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

.card-date {
  font-size: 0.8125rem;
  color: var(--color-gray-400);
  white-space: nowrap;
}

.card-desc {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
}

.card-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.card-kpis {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-gray-100);
}

.kpi-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.kpi-value {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-primary);
}

.kpi-label {
  font-size: 0.6875rem;
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
