import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

interface JoinGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinGroupDialog({ open, onOpenChange }: JoinGroupDialogProps) {
  const [groupCode, setGroupCode] = useState("");

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupCode) {
      toast.success(`Você entrou no grupo com código: ${groupCode}`);
      setGroupCode("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Entrar em um Grupo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <Label htmlFor="groupCode">Código do Grupo</Label>
            <Input
              id="groupCode"
              placeholder="Ex: ADS2026-XY7Z"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
              className="mt-1.5 font-mono"
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Digite o código do grupo que você recebeu do administrador
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#2563EB] hover:bg-[#1e40af]">
              Entrar no Grupo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
