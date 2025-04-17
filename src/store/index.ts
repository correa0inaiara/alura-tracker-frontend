import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import { ABRE_MODAL, ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUI_PROJETO, FECHA_MODAL, NOTIFICAR, SALVA_TAREFA } from "./tipo-mutacoes";
import INotificacao, { TipoNotificacao } from "@/interfaces/INotificacao";
import IModal from "@/interfaces/IModal";
import { notificacaoMixin } from "@/mixins/notificar";
import ITarefa from "@/interfaces/ITarefa";

interface Estado {
  tarefas: ITarefa[],
  projetos: IProjeto[],
  notificacoes: INotificacao[],
  modals: IModal[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    tarefas: [],
    projetos: [],
    notificacoes: [],
    modals: []
  },
  mutations: {
    [ADICIONA_PROJETO](state: Estado, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      } as IProjeto
      state.projetos.push(projeto)

      notificacaoMixin.methods.notificar(TipoNotificacao.SUCESSO, 'Seu novo projeto foi salvo', 'Seu projeto já está disponível.')
    },
    [ALTERA_PROJETO](state: Estado, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id == projeto.id)
      state.projetos[index] = projeto

      state.tarefas.forEach((tarefa) => {
        if (tarefa.projeto.id == projeto.id) {
          tarefa.projeto.nome = projeto.nome
        }
      })

      notificacaoMixin.methods.notificar(TipoNotificacao.SUCESSO, 'Sua edição foi salva', 'Seu projeto e todas as tarefas desse projeto foram atualizadas com sucesso.')
    },
    [EXCLUI_PROJETO](state: Estado, projetoId: string) {
      state.projetos = state.projetos.filter((_projeto) => _projeto.id != projetoId)
      state.tarefas = state.tarefas.filter((tarefa) => tarefa.projeto.id != projetoId)

      notificacaoMixin.methods.notificar(TipoNotificacao.SUCESSO, 'Projeto deletado', 'Seu projeto e todas as tarefas vinculadas foram deletadas com sucesso.')
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime(),
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter((notificacao) => notificacao.id != novaNotificacao.id)
      }, 3500)
    },
    [ABRE_MODAL](state, modal: IModal) {
      modal.id = 'modal_' + state.modals.length
      modal.showModal = true
      state.modals.push(modal)
    },
    [FECHA_MODAL](state, modal: IModal) {
      modal.showModal = false
      state.modals = state.modals.filter((_modal) => _modal.id != modal.id)
    },
    [SALVA_TAREFA](state, tarefa: ITarefa) {
      tarefa.id = new Date().toISOString()
      state.tarefas.push(tarefa)
    }
  }
})

export function minhaUseStore(): Store<Estado> {
  return useStore(key)
}