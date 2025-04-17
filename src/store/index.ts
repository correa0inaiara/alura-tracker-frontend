import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUI_PROJETO } from "./tipo-mutacoes";

interface Estado {
  projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: []
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
    }
  }
})

export function minhaUseStore(): Store<Estado> {
  return useStore(key)
}