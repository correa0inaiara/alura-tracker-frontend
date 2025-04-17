import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import { ABRE_MODAL, ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUI_PROJETO, FECHA_MODAL, NOTIFICAR } from "./tipo-mutacoes";
import INotificacao, { TipoNotificacao } from "@/interfaces/INotificacao";
import IModal from "@/interfaces/IModal";
import { notificacaoMixin } from "@/mixins/notificar";

interface Estado {
  projetos: IProjeto[],
  notificacoes: INotificacao[],
  modals: IModal[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
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
    },
    [ALTERA_PROJETO](state: Estado, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id == projeto.id)
      state.projetos[index] = projeto
    },
    [EXCLUI_PROJETO](state: Estado, id: string) {
      state.projetos = state.projetos.filter((projeto) => projeto.id != id)
      notificacaoMixin.methods.notificar('Projeto deletado', 'Seu projeto foi deletado com sucesso', TipoNotificacao.SUCESSO)
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime(),
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter((notificacao) => notificacao.id != novaNotificacao.id)
      }, 5000)
    },
    [ABRE_MODAL](state, modal: IModal) {
      modal.id = 'modal_' + state.modals.length
      modal.showModal = true
      state.modals.push(modal)
    },
    [FECHA_MODAL](state, modal: IModal) {
      modal.showModal = false
      state.modals = state.modals.filter((_modal) => _modal.id != modal.id)
    }
  }
})

export function minhaUseStore(): Store<Estado> {
  return useStore(key)
}