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
            <button id="botaoExcluir" class="button is-danger ml-2" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { minhaUseStore } from '@/store';
import { EXCLUI_PROJETO } from '@/store/tipo-mutacoes';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ListaView',
  methods: {
    excluir(id: string) {
      this.store.commit(EXCLUI_PROJETO, id)
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
