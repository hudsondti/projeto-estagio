"use client";

import { useState, useEffect } from "react";
import { Calendar, MoreHorizontal, Trash2, Eye, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AlunoEstagioData {
  id: string;
  matricula: string;
  nome: string;
  professorOrientador: string;
  dataInicio: string;
  dataTermino: string;
  status:
    | "Ativo"
    | "Concluído"
    | "Rescindido"
    | "Quase vencendo"
    | "Relatório Atrasado";
}

export default function AlunosDoProfessor() {
  const [alunos, setAlunos] = useState<AlunoEstagioData[]>([
    {
      id: "1",
      matricula: "2024201622",
      nome: "Liz Guilherme Souza",
      professorOrientador: "Eduardo Pelli",
      dataInicio: "12 Dec. 2020",
      dataTermino: "12 Dec. 2020",
      status: "Ativo",
    },
    {
      id: "2",
      matricula: "2024201622",
      nome: "Paulin da Viola",
      professorOrientador: "Eduardo Pelli",
      dataInicio: "12 Dec. 2020",
      dataTermino: "12 Dec. 2020",
      status: "Concluído",
    },
    {
      id: "3",
      matricula: "2024201622",
      nome: "Tiago Nigro Segundo",
      professorOrientador: "Eduardo Pelli",
      dataInicio: "12 Dec. 2020",
      dataTermino: "12 Dec. 2020",
      status: "Rescindido",
    },
    {
      id: "4",
      matricula: "2024201622",
      nome: "Hudson Ferinha",
      professorOrientador: "Eduardo Pelli",
      dataInicio: "12 Dec. 2020",
      dataTermino: "12 Dec. 2020",
      status: "Ativo",
    },
    {
      id: "5",
      matricula: "2024201622",
      nome: "Janja Lula da Silva",
      professorOrientador: "Eduardo Pelli",
      dataInicio: "12 Dec. 2020",
      dataTermino: "12 Dec. 2020",
      status: "Quase vencendo",
    },
    {
      id: "6",
      matricula: "2024201622",
      nome: "Tiago Nigro Segundo",
      professorOrientador: "Eduardo Pelli",
      dataInicio: "12 Dec. 2020",
      dataTermino: "12 Dec. 2020",
      status: "Relatório Atrasado",
    },
    {
      id: "7",
      matricula: "2024201622",
      nome: "Otavio Pe Vermelho",
      professorOrientador: "Eduardo Pelli",
      dataInicio: "12 Dec. 2020",
      dataTermino: "12 Dec. 2020",
      status: "Ativo",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800";
      case "Concluído":
        return "bg-blue-100 text-blue-800";
      case "Rescindido":
        return "bg-red-100 text-red-800";
      case "Quase vencendo":
        return "bg-orange-100 text-orange-800";
      case "Relatório Atrasado":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === alunos.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(alunos.map((aluno) => aluno.id));
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      {/* Header Actions */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center gap-4">
          {selectedItems.length > 0 && (
            <>
              <span className="text-sm text-gray-600">
                {selectedItems.length} item(s) selecionado(s)
              </span>
              <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                <FileText className="w-4 h-4" />
                Detalhes
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                <Eye className="w-4 h-4" />
                Aprovar
              </button>
            </>
          )}
          <div className="ml-auto">
            <button className="p-2 hover:bg-gray-200 rounded-md transition-colors">
              <Trash2 className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-12 px-4">
              <input
                type="checkbox"
                checked={selectedItems.length === alunos.length}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </TableHead>
            <TableHead className="font-medium text-gray-700 px-4">
              Matrícula ▼
            </TableHead>
            <TableHead className="font-medium text-gray-700 px-4">
              Nome ▼
            </TableHead>
            <TableHead className="font-medium text-gray-700 px-4">
              Professor Orientador ▼
            </TableHead>
            <TableHead className="font-medium text-gray-700 px-4">
              Início ▼
            </TableHead>
            <TableHead className="font-medium text-gray-700 px-4">
              Término ▼
            </TableHead>
            <TableHead className="font-medium text-gray-700 px-4">
              Status ▼
            </TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alunos.map((aluno) => (
            <TableRow key={aluno.id} className="hover:bg-gray-50">
              <TableCell className="px-4">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(aluno.id)}
                  onChange={() => handleSelectItem(aluno.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </TableCell>
              <TableCell className="px-4 font-medium text-gray-900">
                {aluno.matricula}
              </TableCell>
              <TableCell className="px-4 text-gray-700">{aluno.nome}</TableCell>
              <TableCell className="px-4 text-gray-700">
                {aluno.professorOrientador}
              </TableCell>
              <TableCell className="px-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Calendar className="w-4 h-4" />
                  <span>{aluno.dataInicio}</span>
                </div>
              </TableCell>
              <TableCell className="px-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Calendar className="w-4 h-4" />
                  <span>{aluno.dataTermino}</span>
                </div>
              </TableCell>
              <TableCell className="px-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    aluno.status
                  )}`}
                >
                  {aluno.status}
                </span>
              </TableCell>
              <TableCell className="px-4">
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-gray-500" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
