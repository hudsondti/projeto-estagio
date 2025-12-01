"use client";
import Link from "next/link";
import InternshipData from "./internshipdata";
import { useState } from "react";
import RegistrarRelatorioModal from "./RegistrarRelatorioModal";

export default function InternshipListPage() {
  const [shadowModalRelatorio, setShadowModalRelatorio] = useState(false);

  return (
    <section className="flex flex-col gap-10 container-dashboard">
      <div className="flex items-center justify-between">
        <h1 className="text-black text-[24px] leading-5">
          Painel de informações
        </h1>
        {/* <SearchComponent /> */}
      </div>

      <InternshipData />

      <div className="flex items-center gap-4">
        <Link
          href="/aluno/meus-estagios/novo-estagio"
          className="text-white text-[16px] leading-5 font-semibold bg-[#605BFF] px-8 py-2 rounded-md"
        >
          Criar Novo Estágio
        </Link>
        <button
          onClick={() => setShadowModalRelatorio(true)}
          className="cursor-pointer text-white text-[16px] leading-5 font-semibold bg-[#605BFF] px-8 py-2 rounded-md"
        >
          Registrar Relatório
        </button>
        {shadowModalRelatorio && (
          <RegistrarRelatorioModal
            isOpen={shadowModalRelatorio}
            onClose={() => setShadowModalRelatorio(false)}
          />
        )}
      </div>
    </section>
  );
}
