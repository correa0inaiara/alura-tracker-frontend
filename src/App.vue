<template>
 <main class="main columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
  <div class="column is-one-quarter">
    <BarraLateral @ao-tema-alterado="trocarTema" />
  </div>
  <div class="column is-three-quarter conteudo">
    <RouterView></RouterView>
  </div>
 </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';

export default defineComponent({
  name: 'App',
  components: { BarraLateral },
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

/* 
@media(prefers-color-scheme: light) {
  :root {
    --bg-primario: #fff;
    --texto-primario: #2d2d2d;
  }
} */

/* :root {
  --bulma-body-background-color: #0d3b66;
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
} */

/* :not(#app #botaoExcluir.button.is-danger, .header, .nav, .nav ul, .nav li, .nav a, .nav i), */
/* #app .conteudo,
#app .box,
#app .formulario, 
#app .input, 
#app .input::placeholder, 
#app .button,
#app .title,
#app .label,
#app .table,
#app .table th
#app .table td,
#app .select select,
:not(#app .button.is-danger) {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}

.input, .button, .table, .select select {
  border-color: var(--texto-primario);
}

.input::placeholder {
  color: var(--texto-primario);
  opacity: 0.5;
} */
</style>
