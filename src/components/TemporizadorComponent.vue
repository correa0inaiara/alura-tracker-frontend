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

export default defineComponent({
  name: 'TemporizadorComponent',
  emits: ['aoTemporizadorFinalizado'],
  components: { CronometroComponent, ControleTemporizador },
  data () {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false
    }
  },
  methods: {
    handleTemporizador(controle: string): void {
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