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
import { minhaUseStore } from '@/store';
import { defineComponent } from 'vue';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETOS } from '@/store/tipo-acoes';
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: 'FormularioView',
  props: {
    id: { type: String }
  },
  mounted() {
    const _id = this.id || this.$route.params?.id
    if (_id) {
      const projeto = this.store.state.projeto.projetos.find((projeto) => projeto.id == _id)
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
        this.store.dispatch(ALTERAR_PROJETO, {
          id: _id,
          nome: this.nomeDoProjeto
        }).then(() => {
          this.notificar(TipoNotificacao.SUCESSO, 'Sua edição foi salva', 'Seu projeto e todas as tarefas desse projeto foram atualizadas com sucesso.')
          this.$router.push('/projetos')
        }).catch((err) => {
          this.notificar(TipoNotificacao.FALHA, 'Sua edição não ocorreu', `Ocorreu um erro na edição do seu projeto.\nMensagem de Erro: ${err}`)
        })
      } else {
        this.store.dispatch(CADASTRAR_PROJETOS, this.nomeDoProjeto)
          .then(() => {
            this.nomeDoProjeto = ''
            this.notificar(TipoNotificacao.SUCESSO, 'Seu novo projeto foi salvo', 'Seu projeto já está disponível.')
            this.$router.push('/projetos')
          }).catch((err) => {
            this.notificar(TipoNotificacao.FALHA, 'Seu novo projeto não pode ser criado', `Ocorreu um erro ao salvar seu novo projeto.\nMensagem de Erro: ${err}`)
          })
      }

    }
  },
  setup() {
    const store = minhaUseStore()
    const { notificar } = useNotificador()
    return {
      store,
      notificar
    }
  }
})
</script>

<style scoped>


</style>