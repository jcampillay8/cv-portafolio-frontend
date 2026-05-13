<template>
  <div class="filter-bar">
    <div class="filter-tags">
      <button
        v-for="tag in allTags"
        :key="tag"
        :class="['filter-tag', { active: selectedTags.includes(tag) }]"
        @click="toggleTag(tag)"
      >
        {{ tag }}
      </button>
    </div>
    <button v-if="selectedTags.length" class="btn btn-outline btn-sm" @click="$emit('clear')">
      Limpiar filtros
    </button>
  </div>
</template>

<script setup>
defineProps({
  allTags: { type: Array, default: () => [] },
  selectedTags: { type: Array, default: () => [] },
})

const emit = defineEmits(['toggle', 'clear'])

function toggleTag(tag) {
  emit('toggle', tag)
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-tag {
  padding: 0.375rem 1rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border: 1px solid var(--color-gray-300);
  border-radius: 999px;
  background: #fff;
  color: var(--color-gray-600);
  cursor: pointer;
  transition: all 0.15s ease;
}

.filter-tag:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.filter-tag.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
}
</style>
