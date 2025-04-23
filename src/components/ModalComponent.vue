<template>
<div class="modal" :class="{'is-active': mostrar}" v-if="mostrar">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <slot name="cabecalho"></slot>
    </header>
    <section class="modal-card-body">
      <slot name="corpo"></slot>
    </section>
    <footer class="modal-card-foot">
      <slot name="rodape"></slot>
    </footer>
  </div>
</div>
</template>

<!-- <template>
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
</template> -->

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "ModalComponent",
  props: {
    mostrar: { type: Boolean, required: true },
    // projetoId: { type: String, required: true }
  },
  // emits: ['aoConfirmarAcaoModal', 'aoCancelarAcaoModal'],
  // methods: {
  //   modalConfirmaClicado() {
  //     this.$emit('aoConfirmarAcaoModal', this.projetoId)
  //   },
  //   modalCancelaClicado() {
  //     this.$emit('aoCancelarAcaoModal', this.projetoId)
  //   },
  // },
  // computed: {
  //   exibirModal() {
  //     if (this.modal.showModal) return { display: 'block' }
  //     else return { display: 'none' }
  //   }
  // }
})
</script>

<style scoped>

</style>