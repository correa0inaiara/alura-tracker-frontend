<template>
  <header class="header p-4 pt-5 pb-5">
    <h1>
      <img src="../assets/logo.png" alt="Logo da Alura Tracker">
    </h1>
    <button class="button mt-5" @click="alterarTema">
      {{ textoBotao }}
    </button>
    <nav class="nav mt-5 p-2">
      <ul>
        <li>
          <RouterLink to="/" class="link">
            <i class="fas fa-tasks"></i>
            tarefas
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/projetos" class="link">
            <i class="fas fa-project-diagram"></i>
            projetos
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BarraLateral',
  emits: ['aoTemaAlterado'],
  data() {
    return {
      modoEscuroAtivo: false
    }
  },
  computed: {
    textoBotao() {
      if (this.modoEscuroAtivo) {
        return 'Desativar modo escuro'
      } else {
        return 'Ativar modo escuro'
      }
    }
  },
  methods: {
    alterarTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo
      this.$emit('aoTemaAlterado', this.modoEscuroAtivo)
    },
  }
})
</script>

<style scoped>
.header {
  width: 100%;
  height: 100vh;
  text-align: center;
  background-color: #0d3b66;
}

.nav {
  border-radius: 0.5rem;
  background-color: #0d3b66;
}

.nav ul {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.nav li {
  margin: 8px 0;
  display: flex;
  justify-content: start;
}

.link {
  color: #fff;
}

.link:hover {
  color: #fcc34f;
}

.link.router-link-active {
  color: #fcc34f;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>