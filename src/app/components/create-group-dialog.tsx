import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGroupDialog({ open, onOpenChange }: CreateGroupDialogProps) {
  const [groupName, setGroupName] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName) {
      toast.success(`Grupo "${groupName}" criado com sucesso!`);
      setGroupName("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Novo Grupo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <Label htmlFor="groupName">Nome do Grupo</Label>
            <Input
              id="groupName"
              placeholder="Ex: ADS 3º Semestre 2026"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="mt-1.5"
              required
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#2563EB] hover:bg-[#1e40af]">
              Criar Grupo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
