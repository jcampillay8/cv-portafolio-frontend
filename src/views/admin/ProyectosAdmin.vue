<template>
  <div class="container">
    <AdminLayout>
      <div class="admin-header">
        <h1 class="page-title">Proyectos</h1>
        <button class="btn btn-primary" @click="openForm(null)">+ Nuevo Proyecto</button>
      </div>

      <ProyectoForm
        v-if="showForm"
        :proyecto="editingProyecto"
        @save="handleSave"
        @cancel="showForm = false"
      />

      <div v-if="store.loading" class="loading"><div class="spinner"></div></div>
      <div v-else-if="!store.items.length" class="empty-state">No hay proyectos registrados.</div>
      <div v-else class="admin-list">
        <div v-for="p in store.items" :key="p.id" class="card admin-item">
          <div class="admin-item-info">
            <h3>{{ p.titulo }}</h3>
            <span class="admin-item-date">{{ formatDate(p.fecha_proyecto) }}</span>
          </div>
          <div class="admin-item-tags">
            <span v-for="tag in p.tags" :key="tag" class="tag tag-industry">{{ tag }}</span>
          </div>
          <div class="admin-item-actions">
            <button class="btn btn-outline btn-sm" @click="openForm(p)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="handleDelete(p.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../../components/admin/AdminLayout.vue'
import ProyectoForm from '../../components/admin/ProyectoForm.vue'
import { useProyectosStore } from '../../stores/proyectos'

const store = useProyectosStore()
const showForm = ref(false)
const editingProyecto = ref(null)

function formatDate(d) {
  return new Date(d).toLocaleDateString('es-CL', { year: 'numeric', month: 'short' })
}

function openForm(proyecto) {
  editingProyecto.value = proyecto ? { ...proyecto } : null
  showForm.value = true
}

async function handleSave(data) {
  if (editingProyecto.value) {
    await store.update(editingProyecto.value.id, data)
  } else {
    await store.create(data)
  }
  showForm.value = false
}

async function handleDelete(id) {
  if (confirm('¿Eliminar este proyecto?')) {
    await store.remove(id)
  }
}

onMounted(() => store.fetchAll())
</script>

<style scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.admin-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.admin-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
}

.admin-item-info {
  flex: 1;
}

.admin-item-info h3 {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-gray-900);
}

.admin-item-date {
  font-size: 0.8125rem;
  color: var(--color-gray-500);
}

.admin-item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.admin-item-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
}
</style>
