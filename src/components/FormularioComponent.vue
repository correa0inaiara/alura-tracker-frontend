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
import { computed, defineComponent } from 'vue';
import TemporizadorComponent from './TemporizadorComponent.vue';
import { useStore } from 'vuex';
import { key } from '@/store';

export default defineComponent({
  name: 'FormularioComponent',
  components: { TemporizadorComponent },
  emits: ['aoSalvarTarefa'],
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        projeto: this.projetos.find((projeto) => projeto.id == this.idProjeto)
      })
      this.descricao = ''
      this.idProjeto = ''
    },
  },
  computed: {
    projetoSelecionado(): boolean {
      if (!this.idProjeto) return false
      else return true
    }
  },
  data () {
    return {
      descricao: '',
      idProjeto: ''
    }
  },
  setup() {
    const store = useStore(key)
    return {
      store,
      projetos: computed(() => store.state.projetos)
    }
  }
})
</script>

<style scoped>

</style>