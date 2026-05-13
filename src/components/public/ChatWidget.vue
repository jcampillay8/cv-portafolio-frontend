<template>
  <div class="chat-widget">
    <button class="chat-toggle" @click="open = !open" :title="open ? 'Cerrar chat' : 'Abrir chat IA'">
      <span v-if="!open">IA</span>
      <span v-else>&times;</span>
    </button>
    <Transition name="chat">
      <div v-if="open" class="chat-panel">
        <div class="chat-header">
          <h4>Asistente IA</h4>
          <span class="chat-badge">Próximamente</span>
        </div>
        <div class="chat-body">
          <div class="chat-message bot">
            ¡Hola! Soy el asistente virtual de Jaime. Estoy en desarrollo y pronto podré responderte sobre su trayectoria profesional.
          </div>
        </div>
        <div class="chat-footer">
          <input type="text" class="chat-input" placeholder="Escribe un mensaje..." disabled />
          <button class="chat-send" disabled>Enviar</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
}

.chat-toggle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--color-primary);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: transform 0.15s ease;
}

.chat-toggle:hover {
  transform: scale(1.1);
}

.chat-panel {
  position: absolute;
  bottom: 56px;
  right: 0;
  width: 340px;
  height: 420px;
  background: #fff;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-gray-200);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  padding: 1rem;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h4 {
  font-size: 0.9375rem;
  font-weight: 600;
}

.chat-badge {
  font-size: 0.6875rem;
  padding: 0.125rem 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
}

.chat-body {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.chat-message {
  padding: 0.75rem;
  border-radius: var(--radius-md);
  font-size: 0.8125rem;
  line-height: 1.5;
  max-width: 85%;
}

.chat-message.bot {
  background: var(--color-gray-100);
  color: var(--color-gray-700);
  margin-bottom: 0.5rem;
}

.chat-footer {
  padding: 0.75rem;
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  gap: 0.5rem;
}

.chat-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 0.8125rem;
}

.chat-input:disabled {
  background: var(--color-gray-100);
  cursor: not-allowed;
}

.chat-send {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--radius-sm);
  background: var(--color-gray-300);
  color: var(--color-gray-500);
  font-size: 0.8125rem;
  cursor: not-allowed;
}

.chat-enter-active,
.chat-leave-active {
  transition: all 0.2s ease;
}

.chat-enter-from,
.chat-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
