// import { CSSProperties } from "vue";

export default interface IModal {
  id: string;
  titulo: string;
  texto: string;
  labelBotaoConfirma: string;
  labelBotaoCancela: string;
  showModal: boolean;
  projetoId: string;
}