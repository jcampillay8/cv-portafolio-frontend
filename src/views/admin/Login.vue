<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-title">Acceso Administrativo</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Usuario</label>
          <input v-model="username" type="text" class="form-input" placeholder="admin" required />
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input v-model="password" type="password" class="form-input" placeholder="••••••" required />
        </div>
        <p v-if="error" class="login-error">{{ error }}</p>
        <button type="submit" class="btn btn-primary btn-block" :disabled="authStore.loading">
          {{ authStore.loading ? 'Ingresando...' : 'Ingresar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  error.value = ''
  try {
    await authStore.login(username.value, password.value)
    router.push('/admin')
  } catch (e) {
    error.value = e.message || 'Error al iniciar sesión'
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.login-card {
  background: #fff;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: var(--shadow-md);
}

.login-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 1.5rem;
  text-align: center;
}

.login-error {
  color: var(--color-danger);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.btn-block {
  width: 100%;
  justify-content: center;
}
</style>
