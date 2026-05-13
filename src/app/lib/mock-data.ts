export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  code: string;
  members: GroupMember[];
  createdAt: Date;
}

export interface GroupMember {
  userId: string;
  userName: string;
  userEmail: string;
  role: "admin" | "member";
  avatar?: string;
}

export interface Event {
  id: string;
  groupId: string;
  type: "class" | "exam" | "assignment" | "event" | "announcement";
  title: string;
  description: string;
  date: Date;
  time?: string;
  subject?: string;
  attachments?: string[];
  notify: boolean;
}

export const mockUser: User = {
  id: "user-1",
  name: "Maria Silva",
  email: "maria.silva@email.com",
};

export const mockGroups: Group[] = [
  {
    id: "group-1",
    name: "ADS 3º Semestre 2026",
    code: "ADS2026-XY7Z",
    members: [
      {
        userId: "user-1",
        userName: "Maria Silva",
        userEmail: "maria.silva@email.com",
        role: "admin",
      },
      {
        userId: "user-2",
        userName: "João Santos",
        userEmail: "joao.santos@email.com",
        role: "member",
      },
      {
        userId: "user-3",
        userName: "Ana Costa",
        userEmail: "ana.costa@email.com",
        role: "member",
      },
    ],
    createdAt: new Date("2026-02-01"),
  },
  {
    id: "group-2",
    name: "Engenharia de Software",
    code: "ENG-SW-2026",
    members: [
      {
        userId: "user-1",
        userName: "Maria Silva",
        userEmail: "maria.silva@email.com",
        role: "member",
      },
      {
        userId: "user-4",
        userName: "Pedro Lima",
        userEmail: "pedro.lima@email.com",
        role: "admin",
      },
    ],
    createdAt: new Date("2026-01-15"),
  },
];

export const mockEvents: Event[] = [
  {
    id: "event-1",
    groupId: "group-1",
    type: "exam",
    title: "Prova de Estrutura de Dados",
    description: "Conteúdo: Árvores, Grafos e Algoritmos de Ordenação",
    date: new Date("2026-02-25"),
    time: "14:00",
    subject: "Estrutura de Dados",
    notify: true,
  },
  {
    id: "event-2",
    groupId: "group-1",
    type: "assignment",
    title: "Entrega do Projeto Final",
    description: "Projeto em grupo - Sistema Web",
    date: new Date("2026-02-28"),
    time: "23:59",
    subject: "Desenvolvimento Web",
    notify: true,
  },
  {
    id: "event-3",
    groupId: "group-1",
    type: "class",
    title: "Aula de Banco de Dados",
    description: "SQL Avançado e Normalização",
    date: new Date("2026-02-20"),
    time: "19:00",
    subject: "Banco de Dados",
    notify: false,
  },
  {
    id: "event-4",
    groupId: "group-1",
    type: "event",
    title: "Palestra sobre IA",
    description: "Palestra com profissional da área",
    date: new Date("2026-02-22"),
    time: "18:00",
    subject: "Evento Extracurricular",
    notify: true,
  },
  {
    id: "event-5",
    groupId: "group-1",
    type: "announcement",
    title: "Cancelamento de Aula",
    description: "Aula de terça-feira cancelada",
    date: new Date("2026-02-19"),
    notify: true,
  },
  {
    id: "event-6",
    groupId: "group-2",
    type: "exam",
    title: "Prova de Padrões de Projeto",
    description: "Design Patterns e Arquitetura",
    date: new Date("2026-02-26"),
    time: "16:00",
    subject: "Engenharia de Software",
    notify: true,
  },
];

export const eventTypeColors = {
  class: "#10B981", // verde
  exam: "#EF4444", // vermelho
  assignment: "#F59E0B", // laranja
  event: "#8B5CF6", // roxo
  announcement: "#2563EB", // azul
};

export const eventTypeLabels = {
  class: "Aula",
  exam: "Prova",
  assignment: "Trabalho",
  event: "Evento",
  announcement: "Aviso",
};
