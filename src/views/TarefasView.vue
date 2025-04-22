<template>
  <FormularioComponent @ao-salvar-tarefa="salvarTarefa" />
  <Transition>
    <div v-if="!listaEstaVazia" class="lista">
      <p class="lista__texto">Suas tarefas:</p>
      <TarefaComponent v-for="(tarefa, index) in store.state.tarefa.tarefas" :key="index" :tarefa="tarefa" @ao-tarefa-clicada="selecionarTarefa" />
    </div>
    <div v-else-if="listaEstaVazia" class="wrapper">
      <div class="sem-tarefas">
        <p class="sem-tarefas__texto">Sem tarefas!</p>
      </div>
    </div>
  </Transition>
  <div class="modal" :class="{'is-active': tarefaSelecionada}" v-if="tarefaSelecionada">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editando uma tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <label for="descricaoDaTarefa" class="label">Descrição da Tarefa</label>
        <input type="text" class="input" v-model="tarefaSelecionada.descricao" placeholder="Digite uma nova descrição para a tarefa" id="descricaoDaTarefa">
      </section>
      <footer class="modal-card-foot">
        <div class="buttons">
          <button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import FormularioComponent from '../components/FormularioComponent.vue';
import TarefaComponent from '../components/TarefaComponent.vue';
import { minhaUseStore } from '@/store';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
  name: 'TarefasView',
  components: { FormularioComponent, TarefaComponent },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal() {
      this.tarefaSelecionada = null
    },
    alterarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => {
          this.fecharModal()
          this.notificar(TipoNotificacao.SUCESSO, "Tarefa Atualizada", "Sua tarefa foi atualizada")
        })
        .catch((err) => {
          this.notificar(TipoNotificacao.FALHA, "Tarefa Não Atualizada", `Ocorreu um erro e sua tarefa não pode ser atualizada.\nMensagem de Erro: ${err}`)
        })
    }
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  setup() {
    const store = minhaUseStore()
    const { notificar } = useNotificador()
    // dispatch é para actions
    store.dispatch(OBTER_PROJETOS)
      .then(() => {
        notificar(TipoNotificacao.SUCESSO, 'Lista de Projetos Carregada com Sucesso', 'Sua lista de projetos já está pronta para uso.')
      }).catch((err) => {
        notificar(TipoNotificacao.FALHA, 'Lista de Projetos Não Carregada', `Ocorreu um erro ao carregar a sua lista de projetos.\nError Message: ${err}`)
      })
    store.dispatch(OBTER_TAREFAS)
      .then(() => {
        notificar(TipoNotificacao.SUCESSO, 'Lista de Projetos Carregada com Sucesso', 'Sua lista de projetos já está pronta para uso.')
      }).catch((err) => {
        notificar(TipoNotificacao.FALHA, 'Lista de Projetos Não Carregada', `Ocorreu um erro ao carregar a sua lista de projetos.\nError Message: ${err}`)
      })
    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      notificar
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