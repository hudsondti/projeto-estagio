"use client";

import { Ellipsis, Edit, Trash2, Save, X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InternshipData {
  nome: string;
  orientador: string;
  concedente: string;
  supervisor: string;
  dataInicio: string;
  dataTermino: string;
  cargaHoraria: string;
  valorBolsa: string;
  auxilioTransporte: string;
  seguro: string;
  tce: string;
}

export default function InternshipData() {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<InternshipData>({
    nome: "Jair Messias Lula da Silva",
    orientador: "Donald Joaquim Nabuco",
    concedente: "Hospital Santa Fé",
    supervisor: "Vladimir Gnar da Silva",
    dataInicio: "15/01/2025",
    dataTermino: "15/01/2027",
    cargaHoraria: "30h",
    valorBolsa: "R$ 700,00",
    auxilioTransporte: "R$ 120,00",
    seguro: "Sim",
    tce: "Enviado",
  });
  const [editedData, setEditedData] = useState<InternshipData>(data);

  // Carregar dados do localStorage ao inicializar
  useEffect(() => {
    const savedData = localStorage.getItem("internshipData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);
        setEditedData(parsedData);
      } catch (error) {
        console.log("Erro ao carregar dados salvos:", error);
      }
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedData({ ...data });
    setShowModal(false);
  };

  const handleSave = () => {
    // Atualizar os dados principais com os dados editados
    setData({ ...editedData });
    setIsEditing(false);

    // Salvar no localStorage para persistência temporária
    localStorage.setItem("internshipData", JSON.stringify(editedData));

    console.log("Dados salvos com sucesso:", editedData);

    // Feedback visual (opcional)
    alert("Dados salvos com sucesso!");
  };

  const handleCancel = () => {
    setEditedData({ ...data });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    console.log("Apagar clicado");
    setShowModal(false);
    // Aqui você pode adicionar a lógica para apagar
  };

  const handleInputChange = (field: keyof InternshipData, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fields = [
    { key: "nome" as keyof InternshipData, label: "Nome:" },
    { key: "orientador" as keyof InternshipData, label: "Orientador:" },
    { key: "concedente" as keyof InternshipData, label: "Concedente:" },
    { key: "supervisor" as keyof InternshipData, label: "Supervisor:" },
    { key: "dataInicio" as keyof InternshipData, label: "Data de Início:" },
    { key: "dataTermino" as keyof InternshipData, label: "Data de Término:" },
    {
      key: "cargaHoraria" as keyof InternshipData,
      label: "Carga horária semanal:",
    },
    { key: "valorBolsa" as keyof InternshipData, label: "Valor da bolsa:" },
    {
      key: "auxilioTransporte" as keyof InternshipData,
      label: "Auxílio transporte:",
    },
    { key: "seguro" as keyof InternshipData, label: "Seguro:" },
    { key: "tce" as keyof InternshipData, label: "TCE:" },
  ];

  return (
    <section className="w-[460px] xl1:w-[500px] bg-white rounded-[12px] shadow-md relative">
      <div className="flex justify-between items-center py-5 px-6">
        <h1 className="text-black text-[24px] leading-5">Dados dos Estágios</h1>

        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              Salvar
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowModal(!showModal)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Ellipsis className="w-5 h-5" />
            </button>

            {showModal && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowModal(false)}
                />

                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  <div className="py-2">
                    <button
                      onClick={handleEditClick}
                      className="cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="w-4 h-4 cursor-pointer" />
                      Editar
                    </button>
                    <button
                      onClick={handleDeleteClick}
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
        )}
      </div>
      <div className="py-5 px-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] text-gray-500">Campo</TableHead>
              <TableHead className="text-gray-500">Informação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field) => (
              <TableRow key={field.key}>
                <TableCell className="font-medium">{field.label}</TableCell>
                <TableCell>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData[field.key]}
                      onChange={(e) =>
                        handleInputChange(field.key, e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    data[field.key]
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
