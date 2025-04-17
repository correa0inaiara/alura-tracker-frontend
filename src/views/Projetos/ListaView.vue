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
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <RouterLink :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </RouterLink>
            <button class="button is-danger ml-2" :data-target="modal.id" @click="abrirModal">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
            <ModalComponent  
              :modal="modal" 
              @ao-confirmar-acao-modal="excluir(projeto.id)" 
              @ao-cancelar-acao-modal="fecharModal" />
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import ModalComponent from '@/components/ModalComponent.vue';
import IModal from '@/interfaces/IModal';
import { minhaUseStore } from '@/store';
import { ABRE_MODAL, EXCLUI_PROJETO, FECHA_MODAL } from '@/store/tipo-mutacoes';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ListaView',
  components: { ModalComponent },
  emits: ['aoConfirmarAcaoModal', 'aoCancelarAcaoModal'],
  methods: {
    abrirModal() {
      this.store.commit(ABRE_MODAL, this.modal)
    },
    fecharModal() {
      this.store.commit(FECHA_MODAL, this.modal)
    },
    excluir(id: string) {
      this.store.commit(EXCLUI_PROJETO, id)
    }
  },
  data() {
    return {
      modal: {
        titulo: 'Excluir Projeto',
        texto: 'Você tem certeza que deseja excluir esse projeto?',
        labelBotaoConfirma: 'Sim',
        labelBotaoCancela: 'Não',
      } as IModal
    }
  },
  setup() {
    const store = minhaUseStore()
    return {
      projetos: computed(() => store.state.projetos),
      store
    }
  }
})
</script>

<style scoped>
</style>
