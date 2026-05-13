import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Calendar, Users, Bell, BookOpen } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">AcademicSync</span>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-[#2563EB] hover:bg-[#1e40af]">Começar Grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Organize sua vida acadêmica
            <br />
            <span className="text-[#2563EB]">em grupo</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Crie grupos privados com seus colegas e mantenha todos sincronizados
            com horários, provas, trabalhos e eventos importantes.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/signup">
              <Button size="lg" className="bg-[#2563EB] hover:bg-[#1e40af] text-lg px-8 py-6 rounded-xl">
                Criar Grupo
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl border-2">
                Entrar em um Grupo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Como funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2563EB]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-[#2563EB]" />
              </div>
              <div className="w-12 h-12 bg-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Crie um grupo</h3>
              <p className="text-gray-600">
                Crie um grupo acadêmico privado e gere um código para compartilhar
                com seus colegas de turma.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#2563EB]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-[#2563EB]" />
              </div>
              <div className="w-12 h-12 bg-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Adicione eventos</h3>
              <p className="text-gray-600">
                Organize horários de aulas, datas de provas, entregas de trabalhos
                e eventos importantes em um calendário compartilhado.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#2563EB]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bell className="w-8 h-8 text-[#2563EB]" />
              </div>
              <div className="w-12 h-12 bg-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Fique atualizado</h3>
              <p className="text-gray-600">
                Todos os membros do grupo recebem notificações e veem as atualizações
                em tempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Por que usar o AcademicSync?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Calendário Compartilhado</h3>
              <p className="text-gray-600">
                Todos os membros visualizam os mesmos eventos e datas importantes
                em um único lugar.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Organização por Disciplina</h3>
              <p className="text-gray-600">
                Filtre eventos por matéria e tipo para encontrar rapidamente o que precisa.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Notificações Inteligentes</h3>
              <p className="text-gray-600">
                Receba lembretes antes de provas e prazos de entrega de trabalhos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Grupos Privados</h3>
              <p className="text-gray-600">
                Controle quem pode acessar seu grupo com códigos de convite e
                sistema de permissões.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-[#2563EB]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Crie seu primeiro grupo acadêmico agora e mantenha sua turma sempre
            organizada.
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-white text-[#2563EB] hover:bg-gray-100 text-lg px-8 py-6 rounded-xl"
            >
              Começar Gratuitamente
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">AcademicSync</span>
          </div>
          <p className="text-gray-400 mb-6">
            Organize sua vida acadêmica em grupo
          </p>
          <div className="flex gap-6 justify-center text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Contato</a>
            <a href="#" className="hover:text-white transition-colors">Sobre</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            © 2026 AcademicSync. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
