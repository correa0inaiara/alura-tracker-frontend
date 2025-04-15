<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
      </div>
      <div class="column">
        <TemporizadorComponent @ao-temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TemporizadorComponent from './TemporizadorComponent.vue';

export default defineComponent({
  name: 'FormularioComponent',
  components: { TemporizadorComponent },
  emits: ['aoSalvarTarefa'],
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      console.log('tempo da tarefa', tempoDecorrido)
      console.log('descrição da tarefa', this.descricao)
      this.$emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao
      })
      this.descricao = ''
    },
  },
  data () {
    return {
      descricao: ''
    }
  }
})
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>