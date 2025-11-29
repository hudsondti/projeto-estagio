"use client";

import { useState } from "react";
import { Users, Search, Eye, MessageCircle, Calendar } from "lucide-react";

interface Orientando {
  id: string;
  nome: string;
  matricula: string;
  empresa: string;
  cargo: string;
  statusEstagio: "ativo" | "pendente" | "concluido";
  proximoReuniao: string;
  ultimoRelatorio: string;
}

export function OrientandosCar2() {
  const [orientandos] = useState<Orientando[]>([
    {
      id: "1",
      nome: "João Silva",
      matricula: "2021001",
      empresa: "TechCorp",
      cargo: "Desenvolvedor Jr",
      statusEstagio: "ativo",
      proximoReuniao: "25/11/2024",
      ultimoRelatorio: "20/11/2024",
    },
    {
      id: "2",
      nome: "Maria Santos",
      matricula: "2021002",
      empresa: "InnovaTech",
      cargo: "Analista de Sistemas",
      statusEstagio: "ativo",
      proximoReuniao: "26/11/2024",
      ultimoRelatorio: "18/11/2024",
    },
    {
      id: "3",
      nome: "Pedro Costa",
      matricula: "2021003",
      empresa: "DataSoft",
      cargo: "Estagiário TI",
      statusEstagio: "pendente",
      proximoReuniao: "28/11/2024",
      ultimoRelatorio: "15/11/2024",
    },
  ]);

  const [filtro, setFiltro] = useState("");

  const orientandosFiltrados = orientandos.filter(
    (orientando) =>
      orientando.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      orientando.empresa.toLowerCase().includes(filtro.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "concluido":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ativo":
        return "Ativo";
      case "pendente":
        return "Pendente";
      case "concluido":
        return "Concluído";
      default:
        return "Indefinido";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header do componente */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Meus Orientandos</h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Campo de busca */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar orientando..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Lista de orientandos */}
      <div className="space-y-4">
        {orientandosFiltrados.map((orientando) => (
          <div
            key={orientando.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              {/* Informações do orientando */}
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {orientando.nome.charAt(0)}
                </div>

                {/* Dados do orientando */}
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-800">
                    {orientando.nome}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Mat: {orientando.matricula}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {orientando.empresa}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">
                      {orientando.cargo}
                    </span>
                  </div>

                  {/* Status */}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      orientando.statusEstagio
                    )}`}
                  >
                    {getStatusLabel(orientando.statusEstagio)}
                  </span>
                </div>
              </div>

              {/* Ações */}
              <div className="flex items-center gap-2">
                <button
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Ver detalhes"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Enviar mensagem"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>

                <button
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Agendar reunião"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Próxima reunião:</span>
                  <span className="ml-2 font-medium text-gray-800">
                    {orientando.proximoReuniao}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Último relatório:</span>
                  <span className="ml-2 font-medium text-gray-800">
                    {orientando.ultimoRelatorio}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer com estatísticas */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {orientandos.length}
            </p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {orientandos.filter((o) => o.statusEstagio === "ativo").length}
            </p>
            <p className="text-sm text-gray-600">Ativos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">
              {orientandos.filter((o) => o.statusEstagio === "pendente").length}
            </p>
            <p className="text-sm text-gray-600">Pendentes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
