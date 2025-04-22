<template>
  <section>
    <RouterLink to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo projeto</span>
    </RouterLink>
    <table class="table is-fullwidth mt-5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in store.state.projeto.projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <RouterLink :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </RouterLink>
            <button class="button is-danger ml-2" :data-target="modal.id" @click="abrirModal(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ModalComponent  
      :modal="modal"
      :projetoId="projetoId"
      @ao-confirmar-acao-modal="excluir" 
      @ao-cancelar-acao-modal="fecharModal" />
  </section>
</template>

<script lang="ts">
import ModalComponent from '@/components/ModalComponent.vue';
import IModal from '@/interfaces/IModal';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { minhaUseStore } from '@/store';
import { REMOVER_PROJETO } from '@/store/tipo-acoes';
import { ABRE_MODAL, FECHA_MODAL } from '@/store/tipo-mutacoes';
import { computed, defineComponent } from 'vue';
import useNotificador from '@/hooks/notificador'

export default defineComponent({
  name: 'ListaView',
  components: { ModalComponent },
  emits: ['aoConfirmarAcaoModal', 'aoCancelarAcaoModal'],
  methods: {
    abrirModal(projetoId: string) {
      this.projetoId = projetoId
      this.store.commit(ABRE_MODAL, this.modal)
    },
    fecharModal() {
      // commit é para mutations
      this.store.commit(FECHA_MODAL, this.modal)
    },
    excluir(projetoId: string) {
      this.store.dispatch(REMOVER_PROJETO, projetoId)
        .then(() => {
            this.notificar(TipoNotificacao.SUCESSO, 'Projeto deletado', 'Seu projeto e todas as tarefas vinculadas foram deletadas com sucesso.')
        })
        .catch((err) => {
          this.notificar(TipoNotificacao.FALHA, 'Projeto não foi deletado', `Ocorreu um erro e seu projeto não pode ser deletado. \nMensagem de Erro: ${err}`)
        })
      this.fecharModal()
    }
  },
  data() {
    return {
      modal: {
        titulo: 'Excluir Projeto',
        texto: `
          Você tem certeza que deseja excluir esse projeto?
          \n\nObs.: Todas as tarefas atribuídas a esse projeto também serão removidas
        `,
        labelBotaoConfirma: 'Sim',
        labelBotaoCancela: 'Não',
      } as IModal,
      projetoId: ''
    }
  },
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
  },
  setup() {
    const store = minhaUseStore()
    const { notificar } = useNotificador()
    return {
      projetos: computed(() => store.state.projeto.projetos),
      store,
      notificar
    }
  }
})
</script>

<style scoped>
</style>
