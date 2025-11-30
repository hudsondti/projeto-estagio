"use client";

import { useState, useEffect } from "react";
import api from "@/src/services/api";
import Image from "next/image";
import { OrientadosCard } from "../inicio/components/OrientadosCard";
import ProfessorPage from "./components/ProfessorPage";
import Link from "next/link";

interface Relatorio {
  id: string;
  titulo: string;
  dataEntregaPrevista: string;
  dataEntregaEfetiva: string | null;
  statusTexto: string;
  statusCor: string;
}

export interface EstagioData {
  id: string;
  matricula: string;
  statusEstagio: string;
  alunoNomeCompleto: string;
  orientadorNomeCompleto: string;
  concedente: string;
  supervisor: string;
  formacaoSupervisor: string | null;
  dataInicio: string;
  dataTermino: string;
  cargaHorariaSemanal: number;
  valorBolsa: number;
  auxilioTransporte: boolean;
  valorAuxilioTransporte: number;
  seguro: boolean;
  dataEntregaTCE: string;
  dataEntregaPlanoDeAtividades: string;
  relatorios: Relatorio[];
  aditivos: any[];
}

export default function ProfessorInicioPage() {
  const user = true;
  const [estagios, setEstagios] = useState<EstagioData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar dados da API
  useEffect(() => {
    const fetchEstagios = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/api/professores", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });

        if (response.data && Array.isArray(response.data)) {
          setEstagios(response.data);
        } else {
          setEstagios([]);
        }
      } catch (error) {
        console.error("Erro ao carregar estágios:", error);
        setError("Erro ao carregar estágios dos orientandos");
      } finally {
        setLoading(false);
      }
    };

    fetchEstagios();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Acesso Negado
          </h1>
          <p className="text-gray-600">
            Você não tem permissão para acessar esta página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-10 container-dashboard">
      <div className="flex items-center justify-between">
        {/* <SearchComponent /> */}
      </div>

      <ProfessorPage />
    </section>
  );
}
