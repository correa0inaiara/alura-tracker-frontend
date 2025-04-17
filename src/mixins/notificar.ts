import { TipoNotificacao } from "@/interfaces/INotificacao"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipo-mutacoes"

export const notificacaoMixin = {
  methods: {
    notificar(titulo: string, texto: string, tipo: TipoNotificacao) {
      store.commit(NOTIFICAR, {
        titulo,
        texto,
        tipo
      })
    }
  }
}