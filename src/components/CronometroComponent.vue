<template>
  <section>
    <span class="display">
      <i class="fa-regular fa-clock"></i>
      {{ tempoDecorrido }}
    </span>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CronometroComponent',
  props: {
    tempoEmSegundos: { type: Number, default: 0 }
  },
  computed: {
    tempoDecorrido (): string {
      return new Date(this.tempoEmSegundos * 1000).toISOString().substring(11, 19)
    }
  }
})
</script>

<style scoped>
.display {
  color: var(--texto-primario);
  background-color: transparent;
}
</style>