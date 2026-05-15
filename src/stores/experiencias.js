import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../services/api'
import { parseImageUrl } from '../services/utils'

function normalize(item) {
  if (item.image_url) item.image_url = parseImageUrl(item.image_url)
  return item
}

export const useExperienciasStore = defineStore('experiencias', () => {
  const items = ref([])
  const current = ref(null)
  const loading = ref(false)

  async function fetchAll(params = '') {
    loading.value = true
    try {
      items.value = (await api.getExperiencias(params)).map(normalize)
    } finally {
      loading.value = false
    }
  }

  async function fetchOne(id) {
    loading.value = true
    try {
      current.value = normalize(await api.getExperiencia(id))
    } finally {
      loading.value = false
    }
  }

  async function create(data) {
    const item = await api.createExperiencia(data)
    items.value.unshift(item)
    return item
  }

  async function update(id, data) {
    const item = await api.updateExperiencia(id, data)
    const idx = items.value.findIndex((e) => e.id === id)
    if (idx !== -1) items.value[idx] = item
    return item
  }

  async function remove(id) {
    await api.deleteExperiencia(id)
    items.value = items.value.filter((e) => e.id !== id)
  }

  return { items, current, loading, fetchAll, fetchOne, create, update, remove }
})
