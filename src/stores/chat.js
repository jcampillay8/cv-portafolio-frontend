import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([
    { 
      role: 'bot', 
      content: '¡Hola! Soy el asistente virtual de Jaime. Estoy aquí para responder tus dudas sobre su perfil profesional. ¿De qué te gustaría hablar hoy? Puedes seleccionar una de las sugerencias o escribir tu propia pregunta.' 
    },
  ])

  function addMessage(message) {
    messages.value.push(message)
  }

  return { messages, addMessage }
})
