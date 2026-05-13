<template>
  <div class="card form-card">
    <h3 class="form-title">{{ estudio ? 'Editar Estudio' : 'Nuevo Estudio' }}</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Institución</label>
        <input v-model="form.institucion" type="text" class="form-input" required />
      </div>
      <div class="form-group">
        <label>Título</label>
        <input v-model="form.titulo" type="text" class="form-input" required />
      </div>
      <div class="form-group">
        <label>Año de Obtención</label>
        <input v-model.number="form.anio_obtencion" type="number" class="form-input" min="1900" :max="new Date().getFullYear()" required />
      </div>
      <div class="form-group">
        <label>URL de Imagen (o ID de Google Drive)</label>
        <input v-model="form.image_url" type="text" class="form-input" placeholder="ID de Drive o URL completa" @blur="handleParseImageUrl" />
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
  estudio: { type: Object, default: null },
})
const emit = defineEmits(['save', 'cancel'])

const form = ref({
  institucion: '',
  titulo: '',
  anio_obtencion: new Date().getFullYear(),
  image_url: '',
})

function handleParseImageUrl() {
  form.value.image_url = parseImageUrl(form.value.image_url)
}

function handleSubmit() {
  emit('save', { ...form.value })
}

onMounted(() => {
  if (props.estudio) {
    form.value = { ...props.estudio }
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
