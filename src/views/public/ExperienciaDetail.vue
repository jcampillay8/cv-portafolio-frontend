<template>
  <div class="container">
    <div v-if="store.loading" class="loading"><div class="spinner"></div></div>
    <div v-else-if="!store.current" class="empty-state">Experiencia no encontrada.</div>
    <article v-else class="detail">
      <router-link to="/" class="back-link">&larr; Volver</router-link>
      <h1 class="detail-title">{{ store.current.rol }}</h1>
      <p class="detail-company">{{ store.current.empresa }}</p>
      <div class="detail-meta">
        <time>{{ formatPeriod(store.current.periodo_inicio, store.current.periodo_fin) }}</time>
      </div>
      <img v-if="store.current.image_url" :src="store.current.image_url" :alt="store.current.empresa" class="detail-img" />

      <div class="detail-tags">
        <span v-for="tag in store.current.tags_industria" :key="tag" class="tag tag-industry">{{ tag }}</span>
      </div>

      <div class="detail-actions" v-if="store.current.link || store.current.link_demo">
        <a v-if="store.current.link" :href="store.current.link" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Ver Enlace / Más Info</a>
        <a v-if="store.current.link_demo" :href="store.current.link_demo" target="_blank" rel="noopener noreferrer" class="btn btn-outline">Ver Demo</a>
      </div>

      <div class="detail-content">
        <h3 class="section-title">Logros</h3>
        <div class="markdown" v-html="renderMarkdown(store.current.descripcion_logros)"></div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useExperienciasStore } from '../../stores/experiencias'

const route = useRoute()
const store = useExperienciasStore()

function formatPeriod(start, end) {
  const fmt = (d) => new Date(d).toLocaleDateString('es-CL', { year: 'numeric', month: 'long' })
  return `${fmt(start)} - ${end ? fmt(end) : 'Presente'}`
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

watch(() => route.params.id, (newId) => {
  if (newId) {
    store.fetchOne(newId)
  }
})

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

.detail-img {
  width: 100%;
  max-height: 360px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  margin-bottom: 1.5rem;
}

.detail-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 0.25rem;
}

.detail-company {
  font-size: 1.125rem;
  color: var(--color-accent);
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.detail-meta {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  margin-bottom: 1rem;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.detail-actions {
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
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
</style>
