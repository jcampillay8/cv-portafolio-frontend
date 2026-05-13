<template>
  <div class="container">
    <AdminLayout>
      <div class="admin-header">
        <h1 class="page-title">Sobre Mí</h1>
        <button v-if="!store.items.length" class="btn btn-primary" @click="openForm(null)">+ Agregar</button>
      </div>

      <PerfilForm
        v-if="showForm"
        :perfil="editingPerfil"
        @save="handleSave"
        @cancel="showForm = false"
      />

      <div v-if="store.loading" class="loading"><div class="spinner"></div></div>
      <div v-else-if="!store.items.length" class="empty-state">No hay perfil creado aún.</div>
      <div v-else class="admin-list">
        <div v-for="p in store.items" :key="p.id" class="card admin-item">
          <div class="admin-item-info">
            <img v-if="p.avatar_url" :src="p.avatar_url" alt="" class="admin-avatar-thumb" />
            <img v-if="p.image_url" :src="p.image_url" alt="" class="admin-thumb" />
            <div>
              <p class="admin-item-preview">{{ truncate(p.descripcion, 120) }}</p>
              <span class="admin-item-date">Actualizado: {{ formatDate(p.updated_at) }}</span>
            </div>
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
import PerfilForm from '../../components/admin/PerfilForm.vue'
import { usePerfilStore } from '../../stores/perfil'

const store = usePerfilStore()
const showForm = ref(false)
const editingPerfil = ref(null)

function formatDate(d) {
  return new Date(d).toLocaleDateString('es-CL', { year: 'numeric', month: 'short', day: 'numeric' })
}

function truncate(text, max) {
  return text?.length > max ? text.slice(0, max) + '...' : text
}

function openForm(perfil) {
  editingPerfil.value = perfil ? { ...perfil } : null
  showForm.value = true
}

async function handleSave(data) {
  if (editingPerfil.value) {
    await store.update(editingPerfil.value.id, data)
  } else {
    await store.create(data)
  }
  showForm.value = false
}

async function handleDelete(id) {
  if (confirm('¿Eliminar este perfil?')) {
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
  display: flex;
  align-items: center;
  gap: 1rem;
}

.admin-thumb {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  flex-shrink: 0;
}

.admin-avatar-thumb {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid var(--color-gray-200);
}

.admin-item-preview {
  font-size: 0.875rem;
  color: var(--color-gray-700);
  line-height: 1.4;
}

.admin-item-date {
  font-size: 0.75rem;
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
