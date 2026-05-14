import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Event, eventTypeColors } from "../lib/mock-data";
import { cn } from "./ui/utils";

interface MiniCalendarProps {
  events: Event[];
}

export function MiniCalendar({ events }: MiniCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { locale: ptBR });
  const calendarEnd = endOfWeek(monthEnd, { locale: ptBR });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(event.date, day));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900">
          {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
        </h4>
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" onClick={previousMonth} className="h-7 w-7 p-0">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={nextMonth} className="h-7 w-7 p-0">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Dias do mês */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={idx}
              className={cn(
                "aspect-square p-1 rounded-lg text-center relative",
                !isCurrentMonth && "text-gray-300",
                isToday && "bg-[#2563EB] text-white font-semibold",
                !isToday && isCurrentMonth && "hover:bg-gray-100"
              )}
            >
              <div className="text-sm">{format(day, "d")}</div>
              {dayEvents.length > 0 && (
                <div className="flex gap-0.5 justify-center mt-0.5">
                  {dayEvents.slice(0, 3).map((event, eventIdx) => (
                    <div
                      key={eventIdx}
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: isToday ? "white" : eventTypeColors[event.type] }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
