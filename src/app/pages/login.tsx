import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login
    if (email && password) {
      toast.success("Login realizado com sucesso!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } else {
      toast.error("Preencha todos os campos");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2563EB] to-[#1e40af] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold">AcademicSync</span>
          </Link>
          <p className="text-blue-100 mt-2">Bem-vindo de volta!</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Entrar na sua conta
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 rounded-lg"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 rounded-lg"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-[#2563EB] hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#2563EB] hover:bg-[#1e40af] rounded-lg py-6"
              size="lg"
            >
              Entrar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{" "}
              <Link to="/signup" className="text-[#2563EB] font-semibold hover:underline">
                Criar conta
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-white/80 hover:text-white text-sm">
            ← Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
