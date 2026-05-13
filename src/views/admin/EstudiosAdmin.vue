<template>
  <div class="container">
    <AdminLayout>
      <div class="admin-header">
        <h1 class="page-title">Estudios & Certificaciones</h1>
        <button class="btn btn-primary" @click="openForm(null)">+ Nuevo Estudio</button>
      </div>

      <EstudioForm
        v-if="showForm"
        :estudio="editingEstudio"
        @save="handleSave"
        @cancel="showForm = false"
      />

      <div v-if="store.loading" class="loading"><div class="spinner"></div></div>
      <div v-else-if="!store.items.length" class="empty-state">No hay estudios registrados.</div>
      <div v-else class="admin-list">
        <div v-for="e in store.items" :key="e.id" class="card admin-item">
          <div class="admin-item-info">
            <h3>{{ e.titulo }}</h3>
            <span class="admin-item-meta">{{ e.institucion }} &middot; {{ e.anio_obtencion }}</span>
          </div>
          <div class="admin-item-actions">
            <button class="btn btn-outline btn-sm" @click="openForm(e)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="handleDelete(e.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../../components/admin/AdminLayout.vue'
import EstudioForm from '../../components/admin/EstudioForm.vue'
import { useEstudiosStore } from '../../stores/estudios'

const store = useEstudiosStore()
const showForm = ref(false)
const editingEstudio = ref(null)

function openForm(estudio) {
  editingEstudio.value = estudio ? { ...estudio } : null
  showForm.value = true
}

async function handleSave(data) {
  if (editingEstudio.value) {
    await store.update(editingEstudio.value.id, data)
  } else {
    await store.create(data)
  }
  showForm.value = false
}

async function handleDelete(id) {
  if (confirm('¿Eliminar este estudio?')) {
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

.admin-item-meta {
  font-size: 0.8125rem;
  color: var(--color-gray-500);
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
