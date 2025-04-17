<template>
  <TransitionGroup name="list" tag="div" class="notificacoes">
    <article class="message" :class="contexto[notificacao.tipo]" v-for="notificacao in notificacoes" :key="notificacao.id">
      <div class="message-header">
        <p>{{notificacao.titulo}}</p>
      </div>
      <div class="message-body">
        {{notificacao.texto}}
      </div>
    </article>
  </TransitionGroup>
</template>

<script lang='ts'>
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { minhaUseStore } from '@/store';
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: "NotificacoesComponent",
  data() {
    return {
      contexto: {
        [TipoNotificacao.SUCESSO]: 'is-success',
        [TipoNotificacao.ATENCAO]: 'is-warning',
        [TipoNotificacao.FALHA]: 'is-danger',
      }
    }
  },
  setup() {
    const store = minhaUseStore()
    return {
      notificacoes: computed(() => store.state.notificacoes)
    }
  }
})
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  top: 0;
  width: 20rem;
  padding: 0.8rem;
  z-index: 1;
}
</style>