"use client";

import { useState } from "react";
import {
  Eye,
  Check,
  X,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Estagio {
  id: string;
  nome: string;
  dataInicio: string;
  concedente: string;
  professor: string;
  status: string;
}

export default function ConfirmacoesCard() {
  // Estados de paginação
  const [currentPageNovos, setCurrentPageNovos] = useState(1);
  const [currentPageAndamento, setCurrentPageAndamento] = useState(1);
  const [currentPageConcluir, setCurrentPageConcluir] = useState(1);
  const itemsPerPage = 3;

  const [novosEstagios] = useState<Estagio[]>([
    {
      id: "1",
      nome: "Luiz Otavio Sales",
      dataInicio: "03/12/2021",
      concedente: "Casa Bom Jesus",
      professor: "Eduardo Pelli",
      status: "Aguardando Confirmação",
    },
    {
      id: "1",
      nome: "Luiz Otavio Sales",
      dataInicio: "03/12/2021",
      concedente: "Casa Bom Jesus",
      professor: "Eduardo Pelli",
      status: "Aguardando Confirmação",
    },
    {
      id: "2",
      nome: "Luiz Guilherme Couto",
      dataInicio: "03/12/2021",
      concedente: "Hospital Santa Casa",
      professor: "Eduardo Pelli",
      status: "Aguardando Confirmação",
    },
    {
      id: "3",
      nome: "Hudson Bahia",
      dataInicio: "03/12/2021",
      concedente: "Oficina de Redes LTDA",
      professor: "Eduardo Pelli",
      status: "Aguardando Confirmação",
    },
  ]);

  const [estagiosAndamento] = useState<Estagio[]>([
    {
      id: "4",
      nome: "Patrick Souza Teles",
      dataInicio: "03/12/2021",
      concedente: "Casa Bom Jesus",
      professor: "Eduardo Pelli",
      status: "Aditivo pendente de aprovação",
    },
    {
      id: "4",
      nome: "Patrick Souza Teles",
      dataInicio: "03/12/2021",
      concedente: "Casa Bom Jesus",
      professor: "Eduardo Pelli",
      status: "Aditivo pendente de aprovação",
    },
    {
      id: "5",
      nome: "Luiz Guilherme Couto",
      dataInicio: "03/12/2021",
      concedente: "Hospital Santa Casa",
      professor: "Eduardo Pelli",
      status: "Rescisão de vínculo pendente",
    },
    {
      id: "6",
      nome: "Hudson Bahia",
      dataInicio: "03/12/2021",
      concedente: "Oficina de Redes LTDA",
      professor: "Eduardo Pelli",
      status: "Relatório semestral pendente",
    },
  ]);

  const [estagiosConcluir] = useState<Estagio[]>([
    {
      id: "7",
      nome: "Patrick Souza Teles",
      dataInicio: "03/12/2021",
      concedente: "Casa Bom Jesus",
      professor: "Eduardo Pelli",
      status: "Conclusão Pendente",
    },
    {
      id: "7",
      nome: "Danilo Pereira Silva",
      dataInicio: "03/12/2021",
      concedente: "Casa Bom Jesus",
      professor: "Eduardo Pelli",
      status: "Conclusão Pendente",
    },
    {
      id: "8",
      nome: "Luiz Guilherme Couto",
      dataInicio: "03/12/2021",
      concedente: "Hospital Santa Casa",
      professor: "Eduardo Pelli",
      status: "Conclusão Pendente",
    },
    {
      id: "9",
      nome: "Hudson Bahia",
      dataInicio: "03/12/2021",
      concedente: "Oficina de Redes LTDA",
      professor: "Eduardo Pelli",
      status: "Conclusão Pendente",
    },
  ]);

  const getStatusColor = (status: string) => {
    if (status.includes("Aguardando")) return "text-orange-600 bg-orange-50";
    if (
      status.includes("Aditivo") ||
      status.includes("Rescisão") ||
      status.includes("Relatório")
    ) {
      return "text-blue-600 bg-blue-50";
    }
    if (status.includes("Conclusão")) return "text-green-600 bg-green-50";
    return "text-gray-600 bg-gray-50";
  };

  const renderTable = (
    data: Estagio[],
    title: string,
    currentPage: number,
    setCurrentPage: (page: number) => void
  ) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Nome:
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Data Início
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Concedente:
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Professor:
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((estagio) => (
                <tr key={estagio.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      {estagio.nome}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-700">
                        {estagio.dataInicio}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {estagio.concedente}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {estagio.professor}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        estagio.status
                      )}`}
                    >
                      {estagio.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Visualizar"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Aprovar"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Rejeitar"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação - só mostra se houver mais de 3 itens */}
        {data.length > 3 && (
          <div className="mt-4 flex justify-center">
            <nav className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Anterior</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10 ${
                      currentPage === page
                        ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5"
              >
                <span>Próximo</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {renderTable(
          novosEstagios,
          "Novos Estágios:",
          currentPageNovos,
          setCurrentPageNovos
        )}
        {renderTable(
          estagiosAndamento,
          "Estágios em Andamento:",
          currentPageAndamento,
          setCurrentPageAndamento
        )}
        {renderTable(
          estagiosConcluir,
          "Estágios a Concluir:",
          currentPageConcluir,
          setCurrentPageConcluir
        )}
      </div>
    </div>
  );
}
