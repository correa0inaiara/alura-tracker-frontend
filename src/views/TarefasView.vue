<template>
  <FormularioComponent @ao-salvar-tarefa="salvarTarefa" />
  <Transition>
    <div v-if="!semTarefas" class="lista">
      <p class="lista__texto">Suas tarefas:</p>

      <div class="field mb-5">
        <p class="control has-icons-left">
          <input class="input" type="email" placeholder="Digite para filtrar" v-model="filtro" />
          <span class="icon is-small is-left">
            <i class="fa-solid fa-filter"></i>
          </span>
        </p>
      </div>

      <TarefaComponent v-for="(tarefa, index) in tarefasFiltradas" :key="index" :tarefa="tarefa"
        @ao-tarefa-clicada="selecionarTarefa" />
    </div>
    <div v-else-if="semTarefas" class="wrapper">
      <div class="sem-tarefas">
        <p class="sem-tarefas__texto">Sem tarefas!</p>
      </div>
    </div>
  </Transition>
  <ModalComponent :mostrar="tarefaSelecionada != null">
    <template v-slot:cabecalho>
      <p class="modal-card-title">Editando uma tarefa</p>
      <button @click="fecharModal" class="delete" aria-label="close"></button>
    </template>
    <template v-slot:corpo>
      <label for="descricaoDaTarefa" class="label">Descrição da Tarefa</label>
      <input type="text" class="input" v-model="tarefaSelecionada.descricao"
        placeholder="Digite uma nova descrição para a tarefa" id="descricaoDaTarefa">
    </template>
    <template v-slot:rodape>
      <div class="buttons">
        <button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
        <button @click="fecharModal" class="button">Cancelar</button>
      </div>
    </template>
  </ModalComponent>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import FormularioComponent from '../components/FormularioComponent.vue';
import TarefaComponent from '../components/TarefaComponent.vue';
import { minhaUseStore } from '@/store';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, FILTRAR_TAREFAS, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import ITarefa from '@/interfaces/ITarefa';
import ModalComponent from '@/components/ModalComponent.vue';

export default defineComponent({
  name: 'TarefasView',
  components: { FormularioComponent, TarefaComponent, ModalComponent },
  setup() {
    const store = minhaUseStore()
    const { notificar } = useNotificador()

    const tarefaSelecionada = ref()

    const lidarComSucesso = (isTarefas: boolean) => {
      const titulo = isTarefas ? 'Lista de Tarefas Carregada' : 'Lista de Projetos Carregada'
      const texto = isTarefas ? 'Sua lista de tarefas já está pronta para uso.' : 'Sua lista de projetos já está pronta para uso.'
      notificar(TipoNotificacao.SUCESSO, titulo, texto)
    }

    const lidarComFalha = (isTarefas: boolean, err: Error) => {
      const titulo = isTarefas ? 'Lista de Tarefas Não Pode Ser Carregada' : 'Lista de Projetos Não Pode Ser Carregada'
      const texto = 'Ocorreu um erro ao carregar a sua lista.\n\nError Message: ' + err
      notificar(TipoNotificacao.FALHA, titulo, texto)
    }

    // dispatch é para actions
    store.dispatch(OBTER_PROJETOS)
      .then(() => lidarComSucesso(false)).catch((err) => lidarComFalha(false, err))
    store.dispatch(OBTER_TAREFAS)
      .then(() => lidarComSucesso(true)).catch((err) => lidarComFalha(true, err))

    // const tarefasFiltradas = computed(() => {
    //   return store.state.tarefa?.tarefas?.filter(
    //     (tarefa) => {
    //       const _filtro = filtro.value.toLowerCase()
    //       const _tarefa = tarefa.descricao.toLowerCase()
    //       const _projeto = tarefa.projeto.nome.toLowerCase()
    //       return !filtro.value || _tarefa.includes(_filtro) || _projeto.includes(_filtro)
    //     }
    //   ) || []
    // })

    const semTarefas = computed(() => {
      return store.state.tarefa?.tarefas?.length === 0 || false
    })

    const filtro = ref("")

    const salvarTarefa = async (tarefa: ITarefa): Promise<void> => {
      await store.dispatch(CADASTRAR_TAREFA, tarefa)
    }

    const selecionarTarefa = (tarefa: ITarefa) => {
      tarefaSelecionada.value = tarefa
    }

    const fecharModal = () => {
      tarefaSelecionada.value = null
    }

    const alterarTarefa = () => {
      store.dispatch(ALTERAR_TAREFA, tarefaSelecionada.value)
        .then(() => {
          fecharModal()
          notificar(TipoNotificacao.SUCESSO, "Tarefa Atualizada", "Sua tarefa foi atualizada")
        })
        .catch((err) => {
          notificar(TipoNotificacao.FALHA, "Tarefa Não Atualizada", `Ocorreu um erro e sua tarefa não pode ser atualizada.\nMensagem de Erro: ${err}`)
        })
    }

    watchEffect(() => {
      store.dispatch(FILTRAR_TAREFAS, filtro.value)
    })

    return {
      tarefasFiltradas: computed(() => store.state.tarefa.tarefasFiltradas || []),
      tarefaSelecionada,
      semTarefas,
      filtro,
      salvarTarefa,
      selecionarTarefa,
      alterarTarefa,
      fecharModal
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