<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">{{ projeto.nome }}</option>
          </select>
        </div>
      </div>
      <div class="column">
        <TemporizadorComponent :projetoSelecionado="projetoSelecionado" @ao-temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import TemporizadorComponent from './TemporizadorComponent.vue';
import { useStore } from 'vuex';
import { key } from '@/store';

export default defineComponent({
  name: 'FormularioComponent',
  components: { TemporizadorComponent },
  emits: ['aoSalvarTarefa'],
  setup(props, contexto) {
    const store = useStore(key)

    const idProjeto = ref("")
    const descricao = ref("")

    const projetos = computed(() => store.state.projeto.projetos)
    const projetoSelecionado = computed(() => {
      return !idProjeto.value ? false : true
    })

    const finalizarTarefa = (tempoDecorrido: number): void => {
      const tarefa = {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find((projeto) => projeto.id == idProjeto.value)
      }
      contexto.emit('aoSalvarTarefa', tarefa)
      descricao.value = ''
      idProjeto.value = ''
    }

    return {
      descricao,
      idProjeto,
      projetos,
      finalizarTarefa,
      projetoSelecionado
    }
  }
})
</script>

<style scoped>

</style>