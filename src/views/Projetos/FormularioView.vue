<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input type="text" class="input" v-model="nomeDoProjeto" placeholder="Digite o nome do seu projeto" id="nomeDoProjeto">
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
        <RouterLink to="/projetos">
          <button class="button ml-3" type="button">Voltar</button>
        </RouterLink>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { notificacaoMixin } from '@/mixins/notificar';
import { minhaUseStore } from '@/store';
import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/tipo-mutacoes';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormularioView',
  props: {
    id: { type: String }
  },
  mixins: [notificacaoMixin],
  mounted() {
    const _id = this.id || this.$route.params?.id
    if (_id) {
      const projeto = this.store.state.projetos.find((projeto) => projeto.id == _id)
      this.nomeDoProjeto = projeto?.nome || ''
    }
  },
  data() {
    return {
      nomeDoProjeto: ""
    }
  },
  methods: {
    salvar() {
      const _id = this.id || this.$route.params?.id
      if (_id) {
        this.store.commit(ALTERA_PROJETO, {
          id: _id,
          nome: this.nomeDoProjeto
        })
        this.notificar(
          'Sua edição foi salva',
          'Seu projeto foi atualizado',
          TipoNotificacao.SUCESSO
        )
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
        this.notificar(
          'Seu novo projeto foi salvo',
          'Seu projeto já está disponível',
          TipoNotificacao.SUCESSO
        )
      }

      this.nomeDoProjeto = ''
      this.$router.push('/projetos')
    }
  },
  setup() {
    const store = minhaUseStore()
    return {
      store
    }
  }
})
</script>

<style scoped>


</style>