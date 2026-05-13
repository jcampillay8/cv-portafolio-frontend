<template>
  <div class="container">
    <div v-if="store.loading" class="loading"><div class="spinner"></div></div>
    <div v-else-if="!store.items.length" class="empty-state">
      <p>No hay información disponible.</p>
      <router-link to="/" class="btn btn-outline" style="margin-top:1rem">Volver al inicio</router-link>
    </div>
    <article v-else class="about">
      <router-link to="/" class="back-link">&larr; Volver</router-link>
      <div class="about-hero">
        <img
          v-if="profile.image_url"
          :src="profile.image_url"
          :alt="'Jaime Campillay'"
          class="about-img"
        />
        <div class="about-header">
          <h1 class="about-title">Sobre Mí</h1>
          <p class="about-subtitle">Jaime Gabriel Campillay Rojas</p>
        </div>
      </div>
      <div class="about-content">
        <div class="markdown" v-html="renderMarkdown(profile.descripcion)"></div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { usePerfilStore } from '../../stores/perfil'

const store = usePerfilStore()
const profile = computed(() => store.items[0] || {})

function renderMarkdown(text) {
  if (!text) return ''
  let html = text
    .replace(/### (.+)/g, '<h3>$1</h3>')
    .replace(/## (.+)/g, '<h2>$1</h2>')
    .replace(/# (.+)/g, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^- (.+)/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
  return '<p>' + html + '</p>'
}

onMounted(() => store.fetchAll())
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.about-hero {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.about-img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--color-gray-200);
  flex-shrink: 0;
}

.about-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 0.25rem;
}

.about-subtitle {
  font-size: 1rem;
  color: var(--color-accent);
  font-weight: 500;
}

.about-content {
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

@media (max-width: 600px) {
  .about-hero {
    flex-direction: column;
    text-align: center;
  }
  .about-img {
    width: 120px;
    height: 120px;
  }
}
</style>
