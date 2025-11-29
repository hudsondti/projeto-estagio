"use client";

import { useEffect } from "react";
import { useAuth } from "@/src/contexts/AuthContext";

export function useDevShortcuts() {
  const { user } = useAuth();

  useEffect(() => {
    // Só ativar atalhos em desenvolvimento
    if (process.env.NODE_ENV !== "development") return;

    const handleKeyPress = (event: KeyboardEvent) => {
      // Ctrl + Alt + 1/2/3 para trocar roles
      if (event.ctrlKey && event.altKey && user) {
        event.preventDefault();

        let newRole: "aluno" | "professor" | "coordenador" = user.role;
        let newName = user.name;
        let newMatricula = user.matricula;
        let newDepartamento = user.departamento;
        let newSiape = user.siape;

        switch (event.key) {
          case "1":
            // Trocar para Aluno
            newRole = "aluno";
            newName = "Hudson Xavier";
            newMatricula = "2021001";
            newDepartamento = undefined;
            newSiape = undefined;
            break;
          case "2":
            // Trocar para Professor
            newRole = "professor";
            newName = "Prof. Hudson Xavier";
            newMatricula = undefined;
            newDepartamento = "Ciência da Computação";
            newSiape = "7654321";
            break;
          case "3":
            // Trocar para Coordenador
            newRole = "coordenador";
            newName = "Dr. Hudson Xavier";
            newMatricula = undefined;
            newDepartamento = "Coordenação de Estágios";
            newSiape = "1234567";
            break;
          default:
            return;
        }

        const updatedUser = {
          ...user,
          role: newRole,
          name: newName,
          matricula: newMatricula,
          departamento: newDepartamento,
          siape: newSiape,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Usando window.location para forçar refresh e aplicar mudanças
        window.location.reload();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [user]);

  // Console log apenas em desenvolvimento para mostrar atalhos disponíveis
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("🔧 Atalhos de Desenvolvimento Disponíveis:");
      console.log("Ctrl + Alt + 1 = Trocar para Aluno");
      console.log("Ctrl + Alt + 2 = Trocar para Professor");
      console.log("Ctrl + Alt + 3 = Trocar para Coordenador");
    }
  }, []);
}
