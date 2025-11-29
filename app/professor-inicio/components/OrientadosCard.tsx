import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarDays,
  Ellipsis,
  ListCollapse,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import OrientadosDados from "./OrientadosDados";

const orientadosData = [
  {
    matricula: "202401622",
    nome: "Liz Guilherme Sousa",
    professorOrientador: "Atila Banco de Dados",
    inicio: "12 Dez, 2020",
    termino: "12 Dez, 2020",
    status: "Reprovado",
  },
  {
    matricula: "202401622",
    nome: "Liz Guilherme Sousa",
    professorOrientador: "Atila Banco de Dados",
    inicio: "12 Dez, 2020",
    termino: "12 Dez, 2020",
    status: "Ativo",
  },
  {
    matricula: "202401622",
    nome: "Liz Guilherme Sousa",
    professorOrientador: "Atila Banco de Dados",
    inicio: "12 Dez, 2020",
    termino: "12 Dez, 2020",
    status: "Concluído",
  },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Reprovado":
      return "text-red-600 bg-red-50 border border-red-200";
    case "Ativo":
      return "text-green-600 bg-green-50 border border-green-200";
    case "Concluído":
      return "text-blue-600 bg-blue-50 border border-blue-200";
    default:
      return "text-gray-600 bg-gray-50 border border-gray-200";
  }
};

export function OrientadosCard() {
  const [showModal, setShowModal] = useState<{ [key: string]: boolean }>({});
  const [showModalDetails, setShowModalDetails] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleModal = (index: number) => {
    setShowModal((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const closeModal = (index: number) => {
    setShowModal((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const openDetailsModal = (index: number) => {
    // Fecha o dropdown modal
    closeModal(index);
    // Abre o modal de detalhes
    setShowModalDetails((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const closeDetailsModal = (index: number) => {
    setShowModalDetails((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const handleDeleteClick = (index: number) => {
    console.log(`Apagar linha ${index} clicado`);
    closeModal(index);
    //adicionar a lógica para apagar
  };

  // Função para determinar a posição do modal baseado no índice da linha
  const getModalPosition = (index: number) => {
    if (index === 0) {
      return "absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-20";
    }
    return "absolute bottom-full right-0 mb-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-20";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <Table>
        <TableHeader>
          <TableRow className="border-b">
            <TableHead className="font-medium text-gray-700">
              Matrícula
            </TableHead>
            <TableHead className="font-medium text-gray-700">Nome</TableHead>
            <TableHead className="font-medium text-gray-700">
              Professor Orientador
            </TableHead>
            <TableHead className="font-medium text-gray-700">Início</TableHead>
            <TableHead className="font-medium text-gray-700">Término</TableHead>
            <TableHead className="font-medium text-gray-700 text-center">
              Status
            </TableHead>
            <TableHead className="font-medium text-gray-700 text-center">
              <Trash className="text-[#030229] w-4 h-4" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orientadosData.map((orientado, index) => (
            <TableRow
              key={`${orientado.matricula}-${index}`}
              className="border-b hover:bg-gray-50"
            >
              <TableCell className="font-medium text-gray-900">
                {orientado.matricula}
              </TableCell>
              <TableCell className="text-gray-900">{orientado.nome}</TableCell>
              <TableCell className="text-gray-700">
                {orientado.professorOrientador}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-700">{orientado.inicio}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-700">{orientado.termino}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
                    orientado.status
                  )}`}
                >
                  {orientado.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="relative">
                  <button
                    onClick={() => toggleModal(index)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Ellipsis className="w-5 h-5" />
                  </button>

                  {showModal[index] && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => closeModal(index)}
                      />

                      <div className={getModalPosition(index)}>
                        <div className="py-2">
                          <button
                            onClick={() => openDetailsModal(index)}
                            className="cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <ListCollapse className="w-4 h-4" />
                            Detalhes
                          </button>
                          <button
                            onClick={() => handleDeleteClick(index)}
                            className="cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Apagar
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de Detalhes Completo */}
      {Object.entries(showModalDetails).map(
        ([index, isOpen]) =>
          isOpen && (
            <div
              key={`details-${index}`}
              className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 bg-blend-hard-light bg-opacity-10"
            >
              <div className="bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-y-auto m-4 relative">
                <button
                  onClick={() => closeDetailsModal(parseInt(index))}
                  className="absolute top-0.5 right-1 p-2 hover:bg-gray-100 rounded-full transition-colors z-10 cursor-pointer"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
                <OrientadosDados />
              </div>
            </div>
          )
      )}
    </div>
  );
}
