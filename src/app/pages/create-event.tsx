import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Sidebar } from "../components/sidebar";
import { MobileNav } from "../components/mobile-nav";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { mockGroups } from "../lib/mock-data";

export function CreateEvent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const group = mockGroups.find((g) => g.id === id);

  const [type, setType] = useState<string>("class");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [subject, setSubject] = useState("");
  const [notify, setNotify] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    toast.success("Evento criado com sucesso!");
    setTimeout(() => {
      navigate(`/group/${id}`);
    }, 500);
  };

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MobileNav />
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Link to={`/group/${id}`}>
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para o grupo
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Adicionar Novo Evento</h1>
            <p className="text-gray-600">Grupo: {group.name}</p>
          </div>

          {/* Form */}
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tipo de Evento */}
              <div>
                <Label htmlFor="type">Tipo de Evento *</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="type" className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class">Aula</SelectItem>
                    <SelectItem value="exam">Prova</SelectItem>
                    <SelectItem value="assignment">Trabalho</SelectItem>
                    <SelectItem value="event">Evento</SelectItem>
                    <SelectItem value="announcement">Aviso</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Título */}
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Prova de Estrutura de Dados"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1.5"
                  required
                />
              </div>

              {/* Descrição */}
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva os detalhes do evento..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1.5 min-h-24"
                />
              </div>

              {/* Data e Hora */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Data *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1.5"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>

              {/* Disciplina */}
              <div>
                <Label htmlFor="subject">Disciplina</Label>
                <Input
                  id="subject"
                  placeholder="Ex: Estrutura de Dados"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1.5"
                />
              </div>

              {/* Notificação */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label htmlFor="notify" className="text-base">Ativar notificações</Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Os membros receberão notificações sobre este evento
                  </p>
                </div>
                <Switch id="notify" checked={notify} onCheckedChange={setNotify} />
              </div>

              {/* Botões */}
              <div className="flex gap-3 justify-end pt-4 border-t">
                <Link to={`/group/${id}`}>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" className="bg-[#2563EB] hover:bg-[#1e40af]">
                  Criar Evento
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}