import { Sidebar } from "../components/sidebar";
import { MobileNav } from "../components/mobile-nav";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Calendar as CalendarIcon, AlertCircle, FileText, BookOpen, Plus } from "lucide-react";
import { mockEvents, eventTypeColors, eventTypeLabels } from "../lib/mock-data";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router";
import { MiniCalendar } from "../components/mini-calendar";

export function Dashboard() {
  // Filtrar eventos próximos (próximos 7 dias)
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const upcomingExams = mockEvents
    .filter((e) => e.type === "exam" && e.date >= today && e.date <= nextWeek)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const upcomingAssignments = mockEvents
    .filter((e) => e.type === "assignment" && e.date >= today && e.date <= nextWeek)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const upcomingClasses = mockEvents
    .filter((e) => e.type === "class" && e.date >= today && e.date <= nextWeek)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MobileNav />
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Bem-vinda de volta, Maria! Aqui está sua visão geral.</p>
          </div>

          {/* Grid Principal */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Próximas Provas */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Próximas Provas</h3>
                  <p className="text-sm text-gray-500">Próximos 7 dias</p>
                </div>
              </div>
              <div className="space-y-3">
                {upcomingExams.length > 0 ? (
                  upcomingExams.map((event) => (
                    <div key={event.id} className="border-l-4 border-red-500 pl-3 py-2 bg-red-50 rounded">
                      <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {format(event.date, "dd 'de' MMMM", { locale: ptBR })} às {event.time}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Nenhuma prova próxima</p>
                )}
              </div>
            </Card>

            {/* Próximas Entregas */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Próximas Entregas</h3>
                  <p className="text-sm text-gray-500">Próximos 7 dias</p>
                </div>
              </div>
              <div className="space-y-3">
                {upcomingAssignments.length > 0 ? (
                  upcomingAssignments.map((event) => (
                    <div key={event.id} className="border-l-4 border-orange-500 pl-3 py-2 bg-orange-50 rounded">
                      <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {format(event.date, "dd 'de' MMMM", { locale: ptBR })} às {event.time}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Nenhuma entrega próxima</p>
                )}
              </div>
            </Card>

            {/* Próximas Aulas */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Próximas Aulas</h3>
                  <p className="text-sm text-gray-500">Próximos 7 dias</p>
                </div>
              </div>
              <div className="space-y-3">
                {upcomingClasses.length > 0 ? (
                  upcomingClasses.map((event) => (
                    <div key={event.id} className="border-l-4 border-green-500 pl-3 py-2 bg-green-50 rounded">
                      <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {format(event.date, "dd 'de' MMMM", { locale: ptBR })} às {event.time}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Nenhuma aula próxima</p>
                )}
              </div>
            </Card>
          </div>

          {/* Calendário e Todos os Eventos */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Mini Calendário */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Calendário</h3>
              <MiniCalendar events={mockEvents} />
            </Card>

            {/* Todos os Eventos */}
            <Card className="p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Todos os Eventos</h3>
                <Link to="/group/group-1/create-event">
                  <Button size="sm" className="bg-[#2563EB] hover:bg-[#1e40af]">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Evento
                  </Button>
                </Link>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {mockEvents
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: eventTypeColors[event.type] }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="secondary"
                            style={{
                              backgroundColor: `${eventTypeColors[event.type]}20`,
                              color: eventTypeColors[event.type],
                            }}
                          >
                            {eventTypeLabels[event.type]}
                          </Badge>
                          {event.subject && (
                            <span className="text-xs text-gray-500">{event.subject}</span>
                          )}
                        </div>
                        <p className="font-medium text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-600 mt-0.5">{event.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          <span>
                            {format(event.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            {event.time && ` às ${event.time}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}