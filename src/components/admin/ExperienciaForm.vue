<template>
  <div class="card form-card">
    <h3 class="form-title">{{ experiencia ? 'Editar Experiencia' : 'Nueva Experiencia' }}</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group flex-1">
          <label>Empresa</label>
          <input v-model="form.empresa" type="text" class="form-input" required />
        </div>
        <div class="form-group flex-1">
          <label>Rol</label>
          <input v-model="form.rol" type="text" class="form-input" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group flex-1">
          <label>Periodo Inicio</label>
          <input v-model="form.periodo_inicio" type="date" class="form-input" required />
        </div>
        <div class="form-group flex-1">
          <label>Periodo Fin (dejar vacío si es actual)</label>
          <input v-model="form.periodo_fin" type="date" class="form-input" />
        </div>
      </div>
      <div class="form-group">
        <label>Descripción de Logros (Markdown)</label>
        <textarea v-model="form.descripcion_logros" class="form-textarea" rows="6" required></textarea>
      </div>
      <div class="form-group">
        <label>Tags de Industria (separado por comas)</label>
        <input v-model="tagsInput" type="text" class="form-input" placeholder="Minería, Banca, IA" @blur="parseTags" />
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

const props = defineProps({
  experiencia: { type: Object, default: null },
})
const emit = defineEmits(['save', 'cancel'])

const form = ref({
  empresa: '',
  rol: '',
  periodo_inicio: '',
  periodo_fin: '',
  descripcion_logros: '',
  tags_industria: [],
})

const tagsInput = ref('')

function parseTags() {
  form.value.tags_industria = tagsInput.value.split(',').map((s) => s.trim()).filter(Boolean)
}

function handleSubmit() {
  parseTags()
  const data = { ...form.value }
  if (!data.periodo_fin) data.periodo_fin = null
  emit('save', data)
}

onMounted(() => {
  if (props.experiencia) {
    form.value = { ...props.experiencia }
    form.value.periodo_inicio = props.experiencia.periodo_inicio?.slice(0, 10) || ''
    form.value.periodo_fin = props.experiencia.periodo_fin?.slice(0, 10) || ''
    tagsInput.value = (props.experiencia.tags_industria || []).join(', ')
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

.form-row {
  display: flex;
  gap: 1rem;
}

.flex-1 {
  flex: 1;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
</style>
