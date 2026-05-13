<template>
  <div class="container">
    <AdminLayout>
      <h1 class="page-title">Panel de Administración</h1>
      <p class="page-subtitle">Bienvenido, {{ authStore.user?.username }}. Gestiona tu portafolio desde aquí.</p>

      <div class="stats-grid">
        <router-link to="/admin/proyectos" class="stat-card card">
          <div class="stat-number">{{ proyectosStore.items.length }}</div>
          <div class="stat-label">Proyectos</div>
        </router-link>
        <router-link to="/admin/experiencias" class="stat-card card">
          <div class="stat-number">{{ experienciasStore.items.length }}</div>
          <div class="stat-label">Experiencias</div>
        </router-link>
        <router-link to="/admin/estudios" class="stat-card card">
          <div class="stat-number">{{ estudiosStore.items.length }}</div>
          <div class="stat-label">Estudios</div>
        </router-link>
      </div>

      <div class="admin-actions">
        <router-link to="/admin/proyectos" class="btn btn-primary">Gestionar Proyectos</router-link>
        <router-link to="/admin/experiencias" class="btn btn-primary">Gestionar Experiencias</router-link>
        <router-link to="/admin/estudios" class="btn btn-primary">Gestionar Estudios</router-link>
      </div>

      <button class="btn btn-outline logout-btn" @click="handleLogout">Cerrar Sesión</button>
    </AdminLayout>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '../../components/admin/AdminLayout.vue'
import { useAuthStore } from '../../stores/auth'
import { useProyectosStore } from '../../stores/proyectos'
import { useExperienciasStore } from '../../stores/experiencias'
import { useEstudiosStore } from '../../stores/estudios'

const router = useRouter()
const authStore = useAuthStore()
const proyectosStore = useProyectosStore()
const experienciasStore = useExperienciasStore()
const estudiosStore = useEstudiosStore()

function handleLogout() {
  authStore.logout()
  router.push('/admin/login')
}

onMounted(() => {
  authStore.fetchUser()
  proyectosStore.fetchAll()
  experienciasStore.fetchAll()
  estudiosStore.fetchAll()
})
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: block;
  padding: 1.5rem;
  text-align: center;
  color: inherit;
}

.stat-card:hover {
  text-decoration: none;
  color: inherit;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  margin-top: 0.25rem;
}

.admin-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.logout-btn {
  margin-top: 1rem;
}
</style>
