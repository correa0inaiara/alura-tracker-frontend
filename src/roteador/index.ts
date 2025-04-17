import TarefasView from "@/views/TarefasView.vue"
import ProjetosView from "@/views/ProjetosView.vue"
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import FormularioView from "@/views/Projetos/FormularioView.vue"
import ListaView from "@/views/Projetos/ListaView.vue"

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: TarefasView
  },
  {
    path: '/projetos',
    component: ProjetosView,
    children: [
      {
        path: '',
        name: 'Lista',
        component: ListaView
      },
      {
        path: 'novo',
        name: 'Novo Projeto',
        component: FormularioView
      },
      {
        path: ':id',
        name: 'Editar Projeto',
        component: FormularioView,
        props: true
      },
    ]
  }
]
const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas
})

export default roteador 