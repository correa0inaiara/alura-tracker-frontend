<template>
  <div :id="modal.id" class="modal" :style="exibirModal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modal.titulo }}</p>
        <button @click="modalCancelaClicado" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <p>{{ modal.texto }}</p>
      </section>
      <footer class="modal-card-foot">
        <div class="buttons">
          <button class="button" @click="modalConfirmaClicado">{{ modal.labelBotaoConfirma }}</button>
          <button class="button" @click="modalCancelaClicado">{{ modal.labelBotaoCancela }}</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import IModal from '@/interfaces/IModal'

export default defineComponent({
  name: "ModalComponent",
  props: {
    modal: { type: Object as PropType<IModal>, required: true },
      projetoId: { type: String, required: true },
  },
  emits: ['aoConfirmarAcaoModal', 'aoCancelarAcaoModal'],
  methods: {
    modalConfirmaClicado() {
      this.$emit('aoConfirmarAcaoModal', this.projetoId)
    },
    modalCancelaClicado() {
      console.log('this.projeto', this.projetoId)
      this.$emit('aoCancelarAcaoModal', this.projetoId)
    },
  },
  computed: {
    exibirModal() {
      if (this.modal.showModal) return { display: 'block' }
      else return { display: 'none' }
    }
  }
})
</script>

<style scoped>

</style>