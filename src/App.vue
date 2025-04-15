<template>
 <main class="main columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
  <div class="column is-one-quarter">
    <BarraLateral @ao-tema-alterado="trocarTema" />
  </div>
  <div class="column is-three-quarter conteudo">
    <FormularioComponent @ao-salvar-tarefa="salvarTarefa" />
    <Transition>
      <div v-if="!listaEstaVazia" class="lista">
        <p class="lista__texto">Suas tarefas:</p>
        <TarefaComponent v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
      </div>
      <div v-else-if="listaEstaVazia" class="wrapper">
        <div class="sem-tarefas">
          <p class="sem-tarefas__texto">Sem tarefas!</p>
          <!--   -->
          <!-- <div class="sem-tarefas__interna">sem tarefas</div> -->
          <!-- <img src="../src/assets/sem-tarefas640x640.png" alt="Fundo circular verde com uma imagem de uma prancheta com uma lista de tarefas. Algumas tarefas estão marcadas." class=""> -->
        </div>
      </div>
    </Transition>
  </div>
 </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioComponent from './components/FormularioComponent.vue';
import TarefaComponent from './components/TarefaComponent.vue';
import ITarefa from './interfaces/ITarefa';
// import BoxComponent from './components/BoxComponent.vue';

export default defineComponent({
  name: 'App',
  components: { BarraLateral, FormularioComponent, TarefaComponent },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.tarefas.push(tarefa)
    },
    trocarTema(modoEscuroAtivo: boolean): void {
      this.modoEscuroAtivo = modoEscuroAtivo
    },
  }
});
</script>

<style>
.main {
  display: grid;
  grid-template-rows: minmax(60px, auto) minmax(0, 100%);
  height: 100%;

  --bg-primario: #fff;
  --texto-primario: #000;
}

.main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background-color: var(--bg-primario);
}

.lista {
  position: relative;
  z-index: 1;
  padding: 1.25rem;
  /* transition: all 1s ease-in; */
}

.wrapper {
  height: calc(100vh - 144px);
}

.sem-tarefas {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: end;
  width: 100%;
  height: 100%;
  padding: 15px;
}

.sem-tarefas::before {
  content: "";
  position: absolute;
  top: 0; 
  left: 0;
  z-index: 0;
  width: 100%; 
  height: 100%;
  filter: grayscale(100%);
  background-image: url(../src/assets/sem-tarefas640x640.png);
  background-repeat: no-repeat;
  background-size: 30rem;
  background-position: center center;
  /* transition: all 1s ease-out; */
}

.sem-tarefas__texto, .lista__texto {
  position: relative;
  z-index: 1;
  font: bold 42px sans-serif;
}

.lista__texto {
  margin-bottom: 30px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
