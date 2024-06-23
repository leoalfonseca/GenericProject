const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();

export interface EventType {
  title?: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
  color?: string;
}

const Events: EventType[] = [
  {
    title: "Calibração Equipamento 3333-x",
    allDay: true,
    start: new Date(y, m, 3),
    end: new Date(y, m, 3),
    color: "default",
  },
  {
    title: "Verificação Equipamento 2323-x",
    start: new Date(y, m, d + 3, 10, 30),
    end: new Date(y, m, d + 3, 11, 30),
    allDay: false,
    color: "green",
  },
  {
    title: "Análise Amostra 0003-23",
    start: new Date(y, m, d + 7, 12, 0),
    end: new Date(y, m, d + 7, 14, 0),
    allDay: false,
    color: "red",
  },
  {
    title: "Coleta Amostra 0001-22",
    start: new Date(y, m, d - 2),
    end: new Date(y, m, d - 2),
    allDay: true,
    color: "azure",
  },
  {
    title: "Transferência Contentor TG23323",
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    allDay: false,
    color: "azure",
  },
  {
    title: "Calibração Equipamento 2323-x",
    start: new Date(y, m, 23),
    end: new Date(y, m, 25),
    color: "warning",
  },
];

export default Events;
