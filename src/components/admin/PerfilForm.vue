<template>
  <div class="card form-card">
    <h3 class="form-title">{{ perfil ? 'Editar Perfil' : 'Nuevo Perfil' }}</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Descripción Personal (Markdown)</label>
        <textarea v-model="form.descripcion" class="form-textarea" rows="10" required></textarea>
      </div>
      <div class="form-group">
        <label>URL de Imagen de perfil (o ID de Google Drive)</label>
        <input v-model="form.image_url" type="text" class="form-input" placeholder="ID de Drive o URL completa" @blur="handleParseImageUrl" />
      </div>
      <div class="form-group">
        <label>URL del Avatar navbar (o ID de Google Drive)</label>
        <input v-model="form.avatar_url" type="text" class="form-input" placeholder="ID de Drive o URL completa" @blur="handleParseAvatarUrl" />
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Guardar</button>
        <button type="button" class="btn btn-outline" @click="$emit('cancel')">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { parseImageUrl } from '../../services/utils.js'

const props = defineProps({
  perfil: { type: Object, default: null },
})
const emit = defineEmits(['save', 'cancel'])

const form = ref({
  descripcion: '',
  image_url: '',
  avatar_url: '',
})

function handleParseImageUrl() {
  form.value.image_url = parseImageUrl(form.value.image_url)
}

function handleParseAvatarUrl() {
  form.value.avatar_url = parseImageUrl(form.value.avatar_url)
}

function handleSubmit() {
  emit('save', { ...form.value })
}

onMounted(() => {
  if (props.perfil) {
    form.value = { ...props.perfil }
  }
})
</script>

<style scoped>
.form-card {
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.form-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: 1.25rem;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
</style>
