<template>
<!-- <button class="button" @click="iniciar" :disabled="cronometroRodando">
  <span class="icon">
    <i class="fas fa-play"></i>
  </span>
  <span>play</span>
</button>
<button class="button" @click="finalizar" :disabled="!cronometroRodando">
  <span class="icon">
    <i class="fas fa-stop"></i>
  </span>
  <span>stop</span>
</button> -->
<button class="button" @click="handleControle" :disabled="estadoCronometro">
  <span class="icon">
    <i :class="icone"></i>
  </span>
  <span>{{ texto }}</span>
</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ControleTemporizador',
  props: {
    icone: { type: String, default: '' },
    texto: { type: String, default: '' },
    cronometroRodando: { type: Boolean, default: false}
  },
  computed: {
    estadoCronometro(): boolean {
      if (this.texto == 'play') {
        return this.cronometroRodando
      } else {
        return !this.cronometroRodando
      }
    }
  },
  methods: {
    handleControle() {
      this.$emit('botaoTemporizador', this.texto)
    },
  },
  emits: ['botaoTemporizador']
})
</script>

<style scoped>

</style>