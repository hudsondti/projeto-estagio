"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { RoleBasedContent } from "@/src/components/common/RoleBasedContent";
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Filter,
  Search,
} from "lucide-react";

interface Estagio {
  id: string;
  alunoNome: string;
  alunoMatricula: string;
  empresa: string;
  cargo: string;
  dataInicio: string;
  dataFim: string;
  status: "pendente" | "aprovado" | "rejeitado" | "em_andamento";
  orientadorId: string;
}

export function EstagiosProfessor() {
  const { user } = useAuth();
  const [estagios, setEstagios] = useState<Estagio[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [busca, setBusca] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados - substituir pela API real
    const carregarEstagios = async () => {
      setIsLoading(true);
      // Aqui você faria a chamada para a API
      // const response = await api.get(`/estagios/professor/${user?.id}`);

      // Dados simulados
      const estagiosSimulados: Estagio[] = [
        {
          id: "1",
          alunoNome: "João Silva",
          alunoMatricula: "2021001",
          empresa: "TechCorp",
          cargo: "Desenvolvedor Jr",
          dataInicio: "2024-01-15",
          dataFim: "2024-07-15",
          status: "pendente",
          orientadorId: user?.id || "",
        },
        {
          id: "2",
          alunoNome: "Maria Santos",
          alunoMatricula: "2021002",
          empresa: "InnovateTech",
          cargo: "Analista de Sistemas",
          dataInicio: "2024-02-01",
          dataFim: "2024-08-01",
          status: "aprovado",
          orientadorId: user?.id || "",
        },
      ];

      setTimeout(() => {
        setEstagios(estagiosSimulados);
        setIsLoading(false);
      }, 1000);
    };

    if (user?.id) {
      carregarEstagios();
    }
  }, [user]);

  const handleAprovar = async (estagioId: string) => {
    try {
      // Chamada para API
      // await api.put(`/estagios/${estagioId}/aprovar`);

      setEstagios((prev) =>
        prev.map((estagio) =>
          estagio.id === estagioId
            ? { ...estagio, status: "aprovado" as const }
            : estagio
        )
      );
    } catch (error) {
      console.error("Erro ao aprovar estágio:", error);
    }
  };

  const handleRejeitar = async (estagioId: string) => {
    try {
      // Chamada para API
      // await api.put(`/estagios/${estagioId}/rejeitar`);

      setEstagios((prev) =>
        prev.map((estagio) =>
          estagio.id === estagioId
            ? { ...estagio, status: "rejeitado" as const }
            : estagio
        )
      );
    } catch (error) {
      console.error("Erro ao rejeitar estágio:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pendente: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Pendente",
        icon: Clock,
      },
      aprovado: {
        color: "bg-green-100 text-green-800",
        label: "Aprovado",
        icon: CheckCircle,
      },
      rejeitado: {
        color: "bg-red-100 text-red-800",
        label: "Rejeitado",
        icon: XCircle,
      },
      em_andamento: {
        color: "bg-blue-100 text-blue-800",
        label: "Em Andamento",
        icon: Clock,
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const estagiosFiltrados = estagios.filter((estagio) => {
    const matchStatus =
      filtroStatus === "todos" || estagio.status === filtroStatus;
    const matchBusca =
      busca === "" ||
      estagio.alunoNome.toLowerCase().includes(busca.toLowerCase()) ||
      estagio.alunoMatricula.includes(busca) ||
      estagio.empresa.toLowerCase().includes(busca.toLowerCase());

    return matchStatus && matchBusca;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#605BFF]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Estágios dos Orientandos
          </h2>
          <p className="text-gray-600 mt-1">
            Gerencie os estágios dos seus alunos
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por aluno, matrícula ou empresa..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#605BFF] focus:border-transparent"
            >
              <option value="todos">Todos os Status</option>
              <option value="pendente">Pendente</option>
              <option value="aprovado">Aprovado</option>
              <option value="rejeitado">Rejeitado</option>
              <option value="em_andamento">Em Andamento</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Estágios */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {estagiosFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              {estagios.length === 0
                ? "Nenhum estágio encontrado"
                : "Nenhum estágio corresponde aos filtros"}
            </h3>
            <p className="text-gray-600">
              {estagios.length === 0
                ? "Você ainda não possui alunos orientandos com estágios."
                : "Tente ajustar os filtros para encontrar os estágios desejados."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aluno
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Empresa/Cargo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Período
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {estagiosFiltrados.map((estagio) => (
                  <tr key={estagio.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {estagio.alunoNome}
                        </div>
                        <div className="text-sm text-gray-500">
                          Mat: {estagio.alunoMatricula}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {estagio.empresa}
                        </div>
                        <div className="text-sm text-gray-500">
                          {estagio.cargo}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>
                          {new Date(estagio.dataInicio).toLocaleDateString(
                            "pt-BR"
                          )}
                        </div>
                        <div className="text-gray-500">
                          até{" "}
                          {new Date(estagio.dataFim).toLocaleDateString(
                            "pt-BR"
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(estagio.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-[#605BFF] hover:text-[#4F46E5] transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>

                      <RoleBasedContent module="estagios" action="approve">
                        {estagio.status === "pendente" && (
                          <>
                            <button
                              onClick={() => handleAprovar(estagio.id)}
                              className="text-green-600 hover:text-green-800 transition-colors ml-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRejeitar(estagio.id)}
                              className="text-red-600 hover:text-red-800 transition-colors ml-2"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </RoleBasedContent>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
