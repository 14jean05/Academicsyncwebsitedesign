import { useParams, Link } from "react-router";
import { Sidebar } from "../components/sidebar";
import { MobileNav } from "../components/mobile-nav";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Users, Copy, Plus, Calendar, Filter } from "lucide-react";
import { mockGroups, mockEvents, eventTypeColors, eventTypeLabels } from "../lib/mock-data";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { MiniCalendar } from "../components/mini-calendar";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export function GroupView() {
  const { id } = useParams<{ id: string }>();
  const group = mockGroups.find((g) => g.id === id);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterSubject, setFilterSubject] = useState<string>("all");

  if (!group) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Grupo não encontrado</h1>
          </div>
        </main>
      </div>
    );
  }

  const groupEvents = mockEvents.filter((e) => e.groupId === id);
  
  // Filtrar eventos
  let filteredEvents = groupEvents;
  if (filterType !== "all") {
    filteredEvents = filteredEvents.filter((e) => e.type === filterType);
  }
  if (filterSubject !== "all") {
    filteredEvents = filteredEvents.filter((e) => e.subject === filterSubject);
  }

  // Obter todas as disciplinas únicas
  const subjects = Array.from(new Set(groupEvents.map((e) => e.subject).filter(Boolean)));

  const copyGroupCode = () => {
    navigator.clipboard.writeText(group.code);
    toast.success("Código copiado para a área de transferência!");
  };

  const isAdmin = group.members.find((m) => m.userId === "user-1")?.role === "admin";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MobileNav />
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-6xl mx-auto">
          {/* Header do Grupo */}
          <Card className="p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{group.name}</h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{group.members.length} membros</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-mono">
                      {group.code}
                    </code>
                    <Button size="sm" variant="ghost" onClick={copyGroupCode} className="h-8">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              {isAdmin && (
                <Badge variant="secondary" className="bg-[#2563EB]/10 text-[#2563EB]">
                  Administrador
                </Badge>
              )}
            </div>

            {/* Membros */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Membros do Grupo</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.members.map((member) => (
                  <div
                    key={member.userId}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-semibold">
                      {member.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{member.userName}</p>
                      <p className="text-xs text-gray-500">
                        {member.role === "admin" ? "Administrador" : "Membro"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Calendário e Eventos */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendário */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Calendário</h3>
              </div>
              <MiniCalendar events={groupEvents} />
            </Card>

            {/* Lista de Eventos */}
            <Card className="p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Eventos do Grupo</h3>
                <Link to={`/group/${id}/create-event`}>
                  <Button size="sm" className="bg-[#2563EB] hover:bg-[#1e40af]">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Evento
                  </Button>
                </Link>
              </div>

              {/* Filtros */}
              <div className="flex gap-3 mb-4">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Tipo de evento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="class">Aulas</SelectItem>
                    <SelectItem value="exam">Provas</SelectItem>
                    <SelectItem value="assignment">Trabalhos</SelectItem>
                    <SelectItem value="event">Eventos</SelectItem>
                    <SelectItem value="announcement">Avisos</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterSubject} onValueChange={setFilterSubject}>
                  <SelectTrigger className="w-48">
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as disciplinas</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject!}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Eventos */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {filteredEvents.length > 0 ? (
                  filteredEvents
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start gap-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
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
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {format(event.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                              {event.time && ` às ${event.time}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Nenhum evento encontrado com os filtros selecionados.
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}