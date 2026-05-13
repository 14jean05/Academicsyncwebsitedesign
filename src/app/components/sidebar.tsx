import { Link, useLocation } from "react-router";
import { Calendar, Users, Plus, Settings, Bell, Home, UserPlus } from "lucide-react";
import { cn } from "./ui/utils";
import { mockGroups } from "../lib/mock-data";
import { Button } from "./ui/button";
import { useState } from "react";
import { CreateGroupDialog } from "./create-group-dialog";
import { JoinGroupDialog } from "./join-group-dialog";

export function Sidebar() {
  const location = useLocation();
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [joinGroupOpen, setJoinGroupOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Calendar, label: "Meu Calendário", href: "/calendar" },
    { icon: Bell, label: "Notificações", href: "/notifications" },
    { icon: Settings, label: "Configurações", href: "/dashboard?view=settings" },
  ];

  return (
    <>
      <aside className="w-64 bg-white border-r min-h-screen fixed left-0 top-0 flex-col hidden lg:flex">
        <div className="p-6 border-b">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AcademicSync</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1 mb-6">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>
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

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-sm font-semibold text-gray-500 uppercase">Meus Grupos</span>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  onClick={() => setJoinGroupOpen(true)}
                  title="Entrar em um grupo"
                >
                  <UserPlus className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  onClick={() => setCreateGroupOpen(true)}
                  title="Criar novo grupo"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-1">
              {mockGroups.map((group) => (
                <Link key={group.id} to={`/group/${group.id}`}>
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
        </nav>

        <div className="p-4 border-t">
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
      </aside>

      <CreateGroupDialog open={createGroupOpen} onOpenChange={setCreateGroupOpen} />
      <JoinGroupDialog open={joinGroupOpen} onOpenChange={setJoinGroupOpen} />
    </>
  );
}