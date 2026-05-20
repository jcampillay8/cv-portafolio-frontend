<template>
  <div class="app">
    <header class="header">
      <div class="container header-inner">
        <router-link to="/" class="logo">
          <span class="logo-icon">&lt;/&gt;</span>
          <span class="logo-text">Jaime Campillay</span>
        </router-link>
        <nav class="nav">
          <router-link to="/" class="nav-link">Chat IA</router-link>
          <router-link to="/portafolio" class="nav-link">Portafolio</router-link>
          <router-link to="/contactame" class="nav-link">Contáctame</router-link>
          <router-link to="/sobre-mi" class="nav-link nav-link-avatar">
            <img v-if="avatarUrl" :src="avatarUrl" alt="" class="nav-avatar" />
            <span v-else class="nav-avatar-placeholder">JA</span>
            Sobre Mí
          </router-link>
          <router-link to="/admin" class="nav-link nav-link-admin">Admin</router-link>
        </nav>
      </div>
    </header>
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} Jaime Gabriel Campillay Rojas &mdash; Ingeniero Civil Industrial</p>
      </div>
    </footer>
    <ChatWidget v-if="route.path !== '/'" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePerfilStore } from './stores/perfil'
import ChatWidget from './components/public/ChatWidget.vue'

const route = useRoute()
const perfilStore = usePerfilStore()
const avatarUrl = computed(() => perfilStore.items[0]?.avatar_url || null)

onMounted(() => {
  perfilStore.fetchAll()
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: var(--color-primary-dark);
  color: #fff;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-weight: 600;
  font-size: 1.125rem;
}

.logo:hover {
  text-decoration: none;
  opacity: 0.9;
}

.logo-icon {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-accent);
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  padding: 0.375rem 0;
  color: var(--color-gray-300);
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.15s;
}

.nav-link:hover {
  color: #fff;
  text-decoration: none;
}

.nav-link-avatar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-gray-600);
  flex-shrink: 0;
}

.nav-avatar-placeholder {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-gray-700);
  color: var(--color-gray-400);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  font-weight: 600;
  flex-shrink: 0;
}

.nav-link-admin {
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--color-gray-600);
  border-radius: var(--radius-sm);
}

.main {
  flex: 1;
  padding: 2rem 0;
}

.footer {
  background: var(--color-gray-900);
  color: var(--color-gray-500);
  padding: 1.5rem 0;
  text-align: center;
  font-size: 0.875rem;
}
</style>
