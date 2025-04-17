<template>
  <div class="temporizador is-flex is-align-items-center is-justify-content-space-between">
    <CronometroComponent :tempoEmSegundos="tempoEmSegundos" />
    <ControleTemporizador :icone="'fas fa-play'" :texto="'play'" :cronometroRodando="cronometroRodando" @botaoTemporizador="handleTemporizador" />
    <ControleTemporizador :icone="'fas fa-stop'" :texto="'stop'" :cronometroRodando="cronometroRodando" @botaoTemporizador="handleTemporizador" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CronometroComponent from './CronometroComponent.vue';
import ControleTemporizador from './ControleTemporizador.vue';
import { minhaUseStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { notificacaoMixin } from '@/mixins/notificar';

export default defineComponent({
  name: 'TemporizadorComponent',
  emits: ['aoTemporizadorFinalizado'],
  props: {
    projetoSelecionado: { type: Boolean, default: false }
  },
  components: { CronometroComponent, ControleTemporizador },
  data () {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false
    }
  },
  setup() {
    const store = minhaUseStore()
    return {
      store
    }
  },
  mixins: [notificacaoMixin],
  methods: {
    handleTemporizador(controle: string): void {
      if (!this.projetoSelecionado) {
        this.notificar(
          'Atenção! Tarefa Sem Projeto',
          'Sua tarefa precisa estar atrelada a um projeto.',
          TipoNotificacao.ATENCAO
        )
        return
      }

      if (controle == 'play') {
        this.iniciar()
      } else {
        this.finalizar()
      }
    },
    iniciar (): void {
      this.cronometroRodando = true
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1
      }, 1000)
    },
    finalizar (): void {
      this.cronometroRodando = false
      this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
      clearInterval(this.cronometro)
      this.tempoEmSegundos = 0
    }
  },
})
</script>

<style>
</style>