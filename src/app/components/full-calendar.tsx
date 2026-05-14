import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  startOfDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Event, eventTypeColors, eventTypeLabels } from "../lib/mock-data";
import { cn } from "./ui/utils";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface FullCalendarProps {
  events: Event[];
}

export function FullCalendar({ events }: FullCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<"month" | "week">("month");

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { locale: ptBR });
  const calendarEnd = endOfWeek(monthEnd, { locale: ptBR });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const today = () => {
    setCurrentMonth(new Date());
  };

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(event.date, day));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900">
            {format(currentMonth, "MMMM 'de' yyyy", { locale: ptBR })}
          </h2>
          <Button size="sm" variant="outline" onClick={today}>
            Hoje
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={previousMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week")}>
        <TabsList>
          <TabsTrigger value="month">Mensal</TabsTrigger>
          <TabsTrigger value="week">Semanal</TabsTrigger>
        </TabsList>

        <TabsContent value="month" className="mt-6">
          {/* Dias da semana */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-700 py-3">
                {day}
              </div>
            ))}
          </div>

          {/* Grid do calendário */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              const dayEvents = getEventsForDay(day);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isToday = isSameDay(day, new Date());

              return (
                <div
                  key={idx}
                  className={cn(
                    "min-h-32 p-2 rounded-lg border transition-all",
                    !isCurrentMonth && "bg-gray-50/50 text-gray-400",
                    isCurrentMonth && "bg-white hover:bg-gray-50",
                    isToday && "border-[#2563EB] border-2 bg-blue-50/30"
                  )}
                >
                  <div
                    className={cn(
                      "font-semibold mb-2",
                      isToday && "text-[#2563EB]",
                      !isCurrentMonth && "text-gray-400"
                    )}
                  >
                    {format(day, "d")}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className="text-xs p-1.5 rounded truncate"
                        style={{
                          backgroundColor: `${eventTypeColors[event.type]}20`,
                          color: eventTypeColors[event.type],
                          borderLeft: `3px solid ${eventTypeColors[event.type]}`,
                        }}
                        title={event.title}
                      >
                        {event.time && <span className="font-semibold">{event.time} </span>}
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500 px-1.5">
                        +{dayEvents.length - 3} mais
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="week" className="mt-6">
          <div className="text-center text-gray-500 py-12">
            <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>Visualização semanal em desenvolvimento</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Legenda */}
      <div className="flex flex-wrap gap-4 pt-4 border-t">
        <div className="text-sm font-semibold text-gray-700">Legenda:</div>
        {Object.entries(eventTypeLabels).map(([type, label]) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: eventTypeColors[type as keyof typeof eventTypeColors] }}
            />
            <span className="text-sm text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
