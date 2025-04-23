import clienteHttp from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { ALTERAR_PROJETO, CADASTRAR_PROJETOS, OBTER_PROJETOS, REMOVER_PROJETO } from "@/store/tipo-acoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUI_PROJETO } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoProjeto {
  projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
  mutations: {
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos
    },
    [ADICIONA_PROJETO](state, projeto: IProjeto) {
      state.projetos.push(projeto)
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id == projeto.id)
      state.projetos[index] = projeto

      // state.tarefas.forEach((tarefa) => {
      //   if (tarefa.projeto.id == projeto.id) {
      //     tarefa.projeto.nome = projeto.nome
      //   }
      // })
    },
    [EXCLUI_PROJETO](state, projetoId: string) {
      state.projetos = state.projetos.filter((_projeto) => _projeto.id != projetoId)
      // state.tarefas = state.tarefas.filter((tarefa) => tarefa.projeto.id != projetoId)
    }
  },
  actions: {
    async [OBTER_PROJETOS]({ commit }) {
      return clienteHttp.get('projetos')
        .then((res) => commit(DEFINIR_PROJETOS, res.data))
    },
    async [CADASTRAR_PROJETOS]({ commit }, nomeDoProjeto: string) {
      return clienteHttp.post('/projetos', {
        nome: nomeDoProjeto
      }).then((res) => commit(ADICIONA_PROJETO, res.data))
    },
    async [ALTERAR_PROJETO]({ commit }, projeto: IProjeto) {
      return clienteHttp.put(`/projetos/${projeto.id}`, projeto)
        .then(() => commit(ALTERA_PROJETO, projeto))
    },
    async [REMOVER_PROJETO]({ commit }, projetoId: string) {
      return clienteHttp.delete(`/projetos/${projetoId}`)
        .then(() => commit(EXCLUI_PROJETO, projetoId))
    }
  },
  getters: {
    projetos (state) {
      return state.projetos
    }
  }
}