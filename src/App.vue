<template>
 <main class="main columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
  <div class="column is-one-quarter">
    <BarraLateral @ao-tema-alterado="trocarTema" />
  </div>
  <div class="column is-three-quarter conteudo">
    <NotificacoesComponent />
    <RouterView></RouterView>
  </div>
 </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import NotificacoesComponent from './components/NotificacoesComponent.vue';

export default defineComponent({
  name: 'App',
  components: { BarraLateral, NotificacoesComponent },
  data() {
    return {
      modoEscuroAtivo: false
    }
  },
  methods: {
    trocarTema(modoEscuroAtivo: boolean): void {
      this.modoEscuroAtivo = modoEscuroAtivo
    },
  }
});
</script>

<style>

#app {
  --bg-primario: #fff;
  --texto-primario: #2d2d2d;
  background-color: #0d3b66;
}

#app .modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

#app .temporizador .display,
#app .conteudo,
#app .box,
#app .formulario,
#app .input, 
#app .input::placeholder,
#app .title,
#app .label,
#app .table,
#app .table th
#app .table td,
#app .select select,
#app .button:not(.is-danger) {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}

.input, .button, .table, .select select {
  border-color: var(--texto-primario);
}

.input::placeholder {
  color: var(--texto-primario);
  opacity: 0.5;
}

#app .table {
  --bulma-table-color: #2d2d2d;
  --bulma-table-head-cell-color: #2d2d2d;
  --bulma-table-cell-heading-color: #2d2d2d;
}

#app .modo-escuro .table {
  --bulma-table-color: #ddd;
  --bulma-table-head-cell-color: #ddd;
  --bulma-table-cell-heading-color: #ddd;
}

/* Configuração do Elemento Transition */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* Configuração do Elemento Transition Group */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
