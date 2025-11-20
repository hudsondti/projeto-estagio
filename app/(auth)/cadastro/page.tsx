"use client";

import { useState } from "react";
import CadastroAlunoPage from "./cadastroAluno";
import CadastroProfessorPage from "./cadastroProfessor";

export default function CadastroPage() {
  const [currentView, setCurrentView] = useState<"aluno" | "professor">(
    "aluno"
  );
  return (
    <section>
      <div className="p-8">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentView("aluno")}
            type="submit"
            className={`${
              currentView === "aluno"
                ? "bg-[#605BFF] text-white"
                : "bg-white text-[#605BFF] border-2 border-[#605BFF]"
            } w-full py-2 px-1 rounded-lg font-medium 
                hover:bg-[#4F46E5] hover:text-white
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
          >
            Aluno
          </button>
          <button
            type="submit"
            onClick={() => setCurrentView("professor")}
            className={`${
              currentView === "professor"
                ? "bg-[#605BFF] text-white"
                : "bg-white text-[#605BFF] border-2 border-[#605BFF]"
            } w-full py-2 px-1 rounded-lg font-medium 
                hover:bg-[#4F46E5] hover:text-white
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
          >
            Professor
          </button>
        </div>
        {currentView === "aluno" ? (
          <CadastroAlunoPage />
        ) : (
          <CadastroProfessorPage />
        )}
      </div>
    </section>
  );
}
