import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import { ABRE_MODAL, FECHA_MODAL, NOTIFICAR } from "./tipo-mutacoes";
import INotificacao from "@/interfaces/INotificacao";
import IModal from "@/interfaces/IModal";
import { EstadoProjeto, projeto } from "./modules/projeto";
import { EstadoTarefa, tarefa } from "./modules/tarefa";

export interface Estado {
  notificacoes: INotificacao[],
  modals: IModal[],
  projeto: EstadoProjeto,
  tarefa: EstadoTarefa,
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    notificacoes: [],
    modals: [],
    projeto: {
      projetos: []
    },
    tarefa: {
      tarefas: []
    }
  },
  mutations: {
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
    }
  },
  actions: {
  },
  modules: {
    projeto,
    tarefa
  }
})

export function minhaUseStore(): Store<Estado> {
  return useStore(key)
}