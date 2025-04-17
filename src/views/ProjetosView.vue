<template>
  <div class="projetos">
    <h1 class="title">Projetos</h1>
    <RouterView></RouterView>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjetosView'
})
</script>

<style scoped>
.projetos {
  color: var(--texto-primario);
  padding: 1.25rem;
}
</style>