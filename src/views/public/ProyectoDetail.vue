<template>
  <div class="container">
    <div v-if="store.loading" class="loading"><div class="spinner"></div></div>
    <div v-else-if="!store.current" class="empty-state">Proyecto no encontrado.</div>
    <article v-else class="detail">
      <router-link to="/" class="back-link">&larr; Volver</router-link>
      <h1 class="detail-title">{{ store.current.titulo }}</h1>
      <div class="detail-meta">
        <time>{{ formatDate(store.current.fecha_proyecto) }}</time>
        <span class="detail-date">Actualizado: {{ formatDate(store.current.updated_at) }}</span>
      </div>

      <div class="detail-tags">
        <span v-for="tag in store.current.tags" :key="tag" class="tag tag-industry">{{ tag }}</span>
      </div>

      <div class="detail-stack">
        <span v-for="tech in store.current.stack_tecnologico" :key="tech" class="tag tag-tech">{{ tech }}</span>
      </div>

      <div class="detail-links">
        <a v-if="store.current.link_github" :href="store.current.link_github" target="_blank" class="btn btn-outline">GitHub</a>
        <a v-if="store.current.link_demo" :href="store.current.link_demo" target="_blank" class="btn btn-outline">Demo</a>
      </div>

      <div v-if="store.current.kpis && Object.keys(store.current.kpis).length" class="detail-kpis">
        <h3 class="section-title">KPIs</h3>
        <div class="kpis-grid">
          <div v-for="(val, key) in store.current.kpis" :key="key" class="kpi-card">
            <span class="kpi-value">{{ val }}</span>
            <span class="kpi-label">{{ key }}</span>
          </div>
        </div>
      </div>

      <div class="detail-content">
        <h3 class="section-title">Descripción</h3>
        <div class="markdown" v-html="renderMarkdown(store.current.descripcion_detallada)"></div>
      </div>

      <div class="detail-pq">
        <h3 class="section-title">Contexto</h3>
        <p>{{ store.current.descripcion_corta }}</p>
      </div>
    </article>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProyectosStore } from '../../stores/proyectos'

const route = useRoute()
const store = useProyectosStore()

function formatDate(d) {
  return new Date(d).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })
}

function renderMarkdown(text) {
  if (!text) return ''
  let html = text
    .replace(/### (.+)/g, '<h4>$1</h4>')
    .replace(/## (.+)/g, '<h3>$1</h3>')
    .replace(/# (.+)/g, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^- (.+)/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
  return '<p>' + html + '</p>'
}

onMounted(() => store.fetchOne(route.params.id))
</script>

<style scoped>
.detail {
  max-width: 800px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.detail-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 0.75rem;
}

.detail-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--color-gray-500);
  margin-bottom: 1rem;
}

.detail-tags,
.detail-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.detail-links {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.detail-kpis {
  margin-bottom: 2rem;
}

.kpis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.kpi-card {
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  padding: 1rem;
  text-align: center;
}

.kpi-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
}

.kpi-label {
  display: block;
  font-size: 0.75rem;
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.25rem;
}

.detail-content {
  margin-bottom: 2rem;
}

.markdown {
  line-height: 1.8;
  color: var(--color-gray-700);
}

.markdown code {
  background: var(--color-gray-100);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.markdown li {
  margin-left: 1.5rem;
  margin-bottom: 0.25rem;
}

.detail-pq {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--color-gray-50);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-accent);
}

.detail-pq p {
  color: var(--color-gray-600);
  line-height: 1.6;
}
</style>
