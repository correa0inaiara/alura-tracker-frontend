import clienteHttp from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA, REMOVER_TAREFA } from "@/store/tipo-acoes";
import { SALVA_TAREFA, DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA, EXCLUI_TAREFA } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
  tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  mutations: {
    [SALVA_TAREFA](state, tarefa: ITarefa) {
      tarefa.id = new Date().toISOString()
      state.tarefas.push(tarefa)
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((_tarefa) => _tarefa.id == tarefa.id)
      state.tarefas[index] = tarefa
    },
    [EXCLUI_TAREFA](state, tarefaId: string) {
      state.tarefas = state.tarefas.filter((_tarefa) => _tarefa.id != tarefaId)
    }
  },
  actions: {
    [OBTER_TAREFAS]({ commit }) {
      return clienteHttp.get('tarefas')
        .then((res) => commit(DEFINIR_TAREFAS, res.data))
    },
    [CADASTRAR_TAREFA]({commit}, tarefa: ITarefa) {
      return clienteHttp.post('/tarefas', tarefa)
        .then((res) => commit(ADICIONA_TAREFA, res.data))
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: IProjeto) {
      return clienteHttp.put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa))
    },
    [REMOVER_TAREFA]({ commit }, tarefaId: string) {
      return clienteHttp.delete(`/tarefas/${tarefaId}`)
        .then(() => commit(EXCLUI_TAREFA, tarefaId))
    }
  }
}