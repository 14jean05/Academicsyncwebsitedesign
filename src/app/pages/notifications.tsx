import { Sidebar } from "../components/sidebar";
import { MobileNav } from "../components/mobile-nav";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Bell, AlertCircle, Info, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Notification {
  id: string;
  type: "alert" | "info" | "success";
  title: string;
  message: string;
  date: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "alert",
    title: "Prova Amanhã!",
    message: "Lembrete: Prova de Estrutura de Dados amanhã às 14:00",
    date: new Date("2026-02-24"),
    read: false,
  },
  {
    id: "2",
    type: "alert",
    title: "Entrega Próxima",
    message: "O Projeto Final deve ser entregue em 3 dias (28/02 às 23:59)",
    date: new Date("2026-02-25"),
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Novo Aviso",
    message: "Cancelamento de Aula - Aula de terça-feira cancelada",
    date: new Date("2026-02-18"),
    read: false,
  },
  {
    id: "4",
    type: "success",
    title: "Novo Membro",
    message: "Ana Costa entrou no grupo ADS 3º Semestre 2026",
    date: new Date("2026-02-17"),
    read: true,
  },
  {
    id: "5",
    type: "info",
    title: "Evento Adicionado",
    message: "Palestra sobre IA foi adicionada ao calendário (22/02 às 18:00)",
    date: new Date("2026-02-16"),
    read: true,
  },
];

export function Notifications() {
  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "alert":
        return "bg-red-100";
      case "info":
        return "bg-blue-100";
      case "success":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MobileNav />
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Notificações</h1>
              {unreadCount > 0 && (
                <Badge className="bg-[#2563EB]">{unreadCount} novas</Badge>
              )}
            </div>
            <p className="text-gray-600">Fique por dentro de todas as atualizações</p>
          </div>

          {/* Lista de Notificações */}
          <div className="space-y-3">
            {mockNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-5 transition-all ${
                  !notification.read ? "border-l-4 border-l-[#2563EB] bg-blue-50/30" : ""
                }`}
              >
                <div className="flex gap-4">
                  <div className={`w-10 h-10 ${getBgColor(notification.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      {!notification.read && (
                        <Badge variant="secondary" className="bg-[#2563EB] text-white">
                          Nova
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-700 mb-2">{notification.message}</p>
                    <p className="text-sm text-gray-500">
                      {format(notification.date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {mockNotifications.length === 0 && (
            <Card className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhuma notificação
              </h3>
              <p className="text-gray-600">
                Você está em dia! Não há notificações no momento.
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}