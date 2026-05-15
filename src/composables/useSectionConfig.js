import { reactive, watch } from 'vue'

const STORAGE_KEY = 'section-defaults'

function loadDefaults() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return { tags: true, proyectos: true, experiencia: true, estudios: true }
}

const defaults = reactive(loadDefaults())

watch(defaults, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...val }))
}, { deep: true })

export function useSectionConfig() {
  return { defaults }
}
