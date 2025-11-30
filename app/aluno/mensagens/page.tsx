"use client";

import { useState, useEffect } from "react";
import CardsMensagens from "./cardsMensagens";
import api from "@/src/services/api";

interface Notificacao {
  id: string;
  titulo: string;
  descricao: string;
  dataCriacao: string;
  tipo: string;
  lida: boolean;
}

export default function MenssagensPage() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [filteredNotificacoes, setFilteredNotificacoes] = useState<
    Notificacao[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    "todas" | "pendentes" | "comunicados"
  >("todas");

  // Carregar notificações da API
  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(
          "/api/notificacoes/minhas-notificacoes",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );

        if (response.data && Array.isArray(response.data)) {
          setNotificacoes(response.data);
          setFilteredNotificacoes(response.data);
        } else {
          setNotificacoes([]);
          setFilteredNotificacoes([]);
        }
      } catch (error) {
        console.error("Erro ao carregar notificações:", error);
        setError("Erro ao carregar notificações");
      } finally {
        setLoading(false);
      }
    };

    fetchNotificacoes();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...notificacoes];

    switch (activeFilter) {
      case "pendentes":
        filtered = notificacoes.filter(
          (n) => !n.lida || n.tipo.toLowerCase().includes("pendente")
        );
        break;
      case "comunicados":
        filtered = notificacoes.filter(
          (n) =>
            n.tipo.toLowerCase().includes("comunicado") ||
            n.tipo.toLowerCase().includes("aprovado") ||
            n.tipo.toLowerCase().includes("agendado")
        );
        break;
      case "todas":
      default:
        filtered = notificacoes;
        break;
    }

    setFilteredNotificacoes(filtered);
  }, [notificacoes, activeFilter]);

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-black text-[24px] leading-5">Mensagens</h1>
          {!loading && (
            <div className="text-sm text-gray-500">
              {filteredNotificacoes.length} de {notificacoes.length}{" "}
              notificações
            </div>
          )}
        </div>
        {/* <div className="flex shadow-sm rounded-sm overflow-hidden">
          <button
            onClick={() => handleFilterClick("todas")}
            className={getButtonStyles("todas")}
          >
            Tudo
          </button>
          <button
            onClick={() => handleFilterClick("pendentes")}
            className={getButtonStyles("pendentes")}
          >
            Pendências
          </button>
          <button
            onClick={() => handleFilterClick("comunicados")}
            className={getButtonStyles("comunicados")}
          >
            Comunicados
          </button>
        </div> */}
      </div>
      <CardsMensagens
        notificacoes={filteredNotificacoes}
        loading={loading}
        error={error}
      />
    </section>
  );
}
