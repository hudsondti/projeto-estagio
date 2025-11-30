"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface Relatorio {
  id: string;
  orientando: string;
  titulo: string;
  tipo: "semanal" | "mensal" | "final" | "parcial";
  dataEntrega: string;
  dataLimite: string;
  status: "pendente" | "entregue" | "revisado" | "aprovado" | "atrasado";
  observacoes?: string;
}

export function RelatoriosCard() {
  const [relatorios] = useState<Relatorio[]>([
    {
      id: "1",
      orientando: "João Silva",
      titulo: "Relatório Semanal - Semana 8",
      tipo: "semanal",
      dataEntrega: "20/11/2024",
      dataLimite: "22/11/2024",
      status: "entregue",
      observacoes: "Entregue no prazo",
    },
    {
      id: "2",
      orientando: "Maria Santos",
      titulo: "Relatório Mensal - Novembro",
      tipo: "mensal",
      dataEntrega: "",
      dataLimite: "25/11/2024",
      status: "atrasado",
      observacoes: "Prazo vencido há 2 dias",
    },
    {
      id: "3",
      orientando: "Pedro Costa",
      titulo: "Relatório Parcial - 1º Bimestre",
      tipo: "parcial",
      dataEntrega: "18/11/2024",
      dataLimite: "20/11/2024",
      status: "aprovado",
      observacoes: "Excelente trabalho",
    },
    {
      id: "4",
      orientando: "Ana Oliveira",
      titulo: "Relatório Semanal - Semana 7",
      tipo: "semanal",
      dataEntrega: "",
      dataLimite: "28/11/2024",
      status: "pendente",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "entregue":
        return "bg-blue-100 text-blue-800";
      case "revisado":
        return "bg-purple-100 text-purple-800";
      case "aprovado":
        return "bg-green-100 text-green-800";
      case "atrasado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return <Clock className="w-4 h-4" />;
      case "entregue":
        return <FileText className="w-4 h-4" />;
      case "revisado":
        return <Eye className="w-4 h-4" />;
      case "aprovado":
        return <CheckCircle className="w-4 h-4" />;
      case "atrasado":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pendente":
        return "Pendente";
      case "entregue":
        return "Entregue";
      case "revisado":
        return "Revisado";
      case "aprovado":
        return "Aprovado";
      case "atrasado":
        return "Atrasado";
      default:
        return "Indefinido";
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "semanal":
        return "bg-blue-500";
      case "mensal":
        return "bg-green-500";
      case "parcial":
        return "bg-purple-500";
      case "final":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "semanal":
        return "Semanal";
      case "mensal":
        return "Mensal";
      case "parcial":
        return "Parcial";
      case "final":
        return "Final";
      default:
        return "Outro";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header do componente */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-800">
            Relatórios Recentes
          </h2>
        </div>

        {/* Filtros rápidos */}
        <div className="flex items-center gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            <option value="">Todos os status</option>
            <option value="pendente">Pendentes</option>
            <option value="entregue">Entregues</option>
            <option value="atrasado">Atrasados</option>
            <option value="aprovado">Aprovados</option>
          </select>
        </div>
      </div>

      {/* Lista de relatórios */}
      <div className="space-y-4">
        {relatorios.map((relatorio) => (
          <div
            key={relatorio.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              {/* Informações do relatório */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`w-3 h-3 rounded-full ${getTipoColor(
                      relatorio.tipo
                    )}`}
                  ></span>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {getTipoLabel(relatorio.tipo)}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-800 mb-1">
                  {relatorio.titulo}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {relatorio.orientando}
                </p>

                {/* Datas */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Prazo:</span>{" "}
                    {relatorio.dataLimite}
                  </div>
                  {relatorio.dataEntrega && (
                    <div>
                      <span className="font-medium">Entrega:</span>{" "}
                      {relatorio.dataEntrega}
                    </div>
                  )}
                </div>

                {/* Observações */}
                {relatorio.observacoes && (
                  <p className="text-sm text-gray-500 mt-2 italic">
                    {relatorio.observacoes}
                  </p>
                )}
              </div>

              {/* Status e ações */}
              <div className="flex flex-col items-end gap-3">
                <div
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    relatorio.status
                  )}`}
                >
                  {getStatusIcon(relatorio.status)}
                  {getStatusLabel(relatorio.status)}
                </div>

                {/* Ações */}
                <div className="flex items-center gap-1">
                  {relatorio.status === "entregue" ||
                  relatorio.status === "aprovado" ? (
                    <>
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Visualizar"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-400 px-2">
                      Aguardando entrega
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Barra de progresso para relatórios pendentes */}
            {relatorio.status === "pendente" && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Tempo restante</span>
                  <span>2 dias</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Estatísticas de relatórios */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-yellow-600">
              {relatorios.filter((r) => r.status === "pendente").length}
            </p>
            <p className="text-xs text-gray-600">Pendentes</p>
          </div>
          <div>
            <p className="text-lg font-bold text-blue-600">
              {relatorios.filter((r) => r.status === "entregue").length}
            </p>
            <p className="text-xs text-gray-600">Entregues</p>
          </div>
          <div>
            <p className="text-lg font-bold text-green-600">
              {relatorios.filter((r) => r.status === "aprovado").length}
            </p>
            <p className="text-xs text-gray-600">Aprovados</p>
          </div>
          <div>
            <p className="text-lg font-bold text-red-600">
              {relatorios.filter((r) => r.status === "atrasado").length}
            </p>
            <p className="text-xs text-gray-600">Atrasados</p>
          </div>
        </div>
      </div>
    </div>
  );
}
