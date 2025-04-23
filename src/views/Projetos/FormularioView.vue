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
import { defineComponent, ref } from 'vue';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETOS } from '@/store/tipo-acoes';
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FormularioView',
  props: {
    id: { type: String }
  },
  setup(props) {
    const router = useRouter()

    const store = minhaUseStore()
    const { notificar } = useNotificador()

    const nomeDoProjeto = ref("")

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (projeto) => projeto.id == props.id
      )
      nomeDoProjeto.value = projeto?.nome || ''
    }

    const lidarComSucesso = (isUpdate: boolean) => {
      nomeDoProjeto.value = ''
      const titulo = isUpdate ? 'Sua edição foi salva.' : 'Seu novo projeto foi salvo'
      const texto = isUpdate ? 'Seu projeto e todas as tarefas desse projeto foram atualizadas com sucesso.' : 'Seu projeto já está disponível'
      notificar(TipoNotificacao.SUCESSO, titulo, texto)
      router.push('/projetos')
    }

    const lidarComFalha = (err: Error) => {
      const titulo = 'Projeto não criado/editado'
      const texto = 'Seu projeto não pode ser criado/editado, pois ocorreu uma falhar.\n\nMensagem de Erro: ' + err
      notificar(TipoNotificacao.FALHA, titulo, texto)
    }

    const salvar = () => {
      if (props.id) {
        store.dispatch(ALTERAR_PROJETO, { id: props.id, nome: nomeDoProjeto.value })
          .then(() => lidarComSucesso(true) ).catch((err) => lidarComFalha(err) )
      } else {
        store.dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
          .then(() => lidarComSucesso(false) ).catch((err) => lidarComFalha(err) )
      }

    }

    return {
      nomeDoProjeto,
      salvar
    }
  }
})
</script>

<style scoped>


</style>