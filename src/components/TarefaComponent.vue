<template>
  <BoxComponent>
    <div class="tarefas columns">
      <div class="column is-7">
        <span class="display">
          <i class="fa-solid fa-list-check"></i> 
          {{ tarefa.descricao || 'Tarefa sem descrição' }}
        </span>
      </div>
      <div class="column">
        <span><i class="fa-solid fa-diagram-project"></i></span>
        <span class="ml-1">{{ tarefa.projeto.nome }}</span>
      </div>
      <div class="column">
        <CronometroComponent :tempo-em-segundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </BoxComponent>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CronometroComponent from './CronometroComponent.vue';
import ITarefa from '@/interfaces/ITarefa';
import BoxComponent from './BoxComponent.vue';

export default defineComponent({
  name: 'TarefaComponent',
  components: { CronometroComponent, BoxComponent },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  }
})

</script>

<style>
#app .tarefas .display,
#app .modo-escuro .tarefas .display {
  color: #2d2d2d;
  background-color: transparent;
}
</style>