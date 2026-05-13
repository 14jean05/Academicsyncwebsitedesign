import { Sidebar } from "../components/sidebar";
import { MobileNav } from "../components/mobile-nav";
import { Card } from "../components/ui/card";
import { FullCalendar } from "../components/full-calendar";
import { mockEvents } from "../lib/mock-data";

export function CalendarView() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <MobileNav />
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Calendário</h1>
            <p className="text-gray-600">Visualize todos os seus eventos acadêmicos</p>
          </div>

          {/* Calendário */}
          <Card className="p-6">
            <FullCalendar events={mockEvents} />
          </Card>
        </div>
      </main>
    </div>
  );
}