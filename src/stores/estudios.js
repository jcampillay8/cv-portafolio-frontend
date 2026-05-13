import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../services/api'

export const useEstudiosStore = defineStore('estudios', () => {
  const items = ref([])
  const current = ref(null)
  const loading = ref(false)

  async function fetchAll() {
    loading.value = true
    try {
      items.value = await api.getEstudios()
    } finally {
      loading.value = false
    }
  }

  async function fetchOne(id) {
    loading.value = true
    try {
      current.value = await api.getEstudio(id)
    } finally {
      loading.value = false
    }
  }

  async function create(data) {
    const item = await api.createEstudio(data)
    items.value.unshift(item)
    return item
  }

  async function update(id, data) {
    const item = await api.updateEstudio(id, data)
    const idx = items.value.findIndex((e) => e.id === id)
    if (idx !== -1) items.value[idx] = item
    return item
  }

  async function remove(id) {
    await api.deleteEstudio(id)
    items.value = items.value.filter((e) => e.id !== id)
  }

  return { items, current, loading, fetchAll, fetchOne, create, update, remove }
})
