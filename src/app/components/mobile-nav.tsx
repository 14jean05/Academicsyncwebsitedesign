import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Calendar, Users, Plus, Settings, Bell, Home, UserPlus, Menu, X } from "lucide-react";
import { cn } from "./ui/utils";
import { mockGroups } from "../lib/mock-data";
import { Button } from "./ui/button";
import { CreateGroupDialog } from "./create-group-dialog";
import { JoinGroupDialog } from "./join-group-dialog";

export function MobileNav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [joinGroupOpen, setJoinGroupOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Calendar, label: "Meu Calendário", href: "/calendar" },
    { icon: Bell, label: "Notificações", href: "/notifications" },
    { icon: Settings, label: "Configurações", href: "/dashboard?view=settings" },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Header Mobile */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="flex items-center justify-between p-4">
          <Link to="/dashboard" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">AcademicSync</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="h-10 w-10 p-0"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </header>

      {/* Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 top-[65px]"
          onClick={closeMenu}
        />
      )}

      {/* Menu Lateral Mobile */}
      <aside
        className={cn(
          "lg:hidden fixed top-[65px] left-0 bottom-0 w-64 bg-white border-r z-40 transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="p-4 flex flex-col h-full">
          <div className="space-y-1 mb-6">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href} onClick={closeMenu}>
                <button
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                    location.pathname === item.href || location.pathname + location.search === item.href
                      ? "bg-[#2563EB] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </Link>
            ))}
          </div>

          <div className="border-t pt-4 flex-1">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-sm font-semibold text-gray-500 uppercase">Meus Grupos</span>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  onClick={() => {
                    setJoinGroupOpen(true);
                    closeMenu();
                  }}
                  title="Entrar em um grupo"
                >
                  <UserPlus className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  onClick={() => {
                    setCreateGroupOpen(true);
                    closeMenu();
                  }}
                  title="Criar novo grupo"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-1">
              {mockGroups.map((group) => (
                <Link key={group.id} to={`/group/${group.id}`} onClick={closeMenu}>
                  <button
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left",
                      location.pathname === `/group/${group.id}`
                        ? "bg-blue-50 text-[#2563EB]"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Users className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium truncate">{group.name}</span>
                  </button>
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-semibold">
                MS
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">Maria Silva</p>
                <p className="text-sm text-gray-500 truncate">maria.silva@email.com</p>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      <CreateGroupDialog open={createGroupOpen} onOpenChange={setCreateGroupOpen} />
      <JoinGroupDialog open={joinGroupOpen} onOpenChange={setJoinGroupOpen} />
    </>
  );
}
