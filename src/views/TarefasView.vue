<template>
  <FormularioComponent @ao-salvar-tarefa="salvarTarefa" />
  <Transition>
    <div v-if="!listaEstaVazia" class="lista">
      <p class="lista__texto">Suas tarefas:</p>
      <TarefaComponent v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    </div>
    <div v-else-if="listaEstaVazia" class="wrapper">
      <div class="sem-tarefas">
        <p class="sem-tarefas__texto">Sem tarefas!</p>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormularioComponent from '../components/FormularioComponent.vue';
import TarefaComponent from '../components/TarefaComponent.vue';
import ITarefa from '../interfaces/ITarefa';

export default defineComponent({
  name: 'TarefasView',
  components: { FormularioComponent, TarefaComponent },
  data() {
    return {
      tarefas: [] as ITarefa[]
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
    }
  }
});
</script>

<style>
.lista {
  position: relative;
  z-index: 1;
  padding: 1.25rem;
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
  background-image: url(../assets/sem-tarefas640x640.png);
  background-repeat: no-repeat;
  background-size: 30rem;
  background-position: center center;
}

.sem-tarefas__texto,
.lista__texto {
  color: var(--texto-primario);
  opacity: 0.5;
  position: relative;
  z-index: 1;
  font: bold 42px sans-serif;
}

.lista__texto {
  margin-bottom: 30px;
}
</style>