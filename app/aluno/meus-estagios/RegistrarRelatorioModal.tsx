"use client";

import { useState } from "react";
import { X, ChevronDown, Calendar } from "lucide-react";

interface RegistrarRelatorioModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (data: { relatorio: string; dataEnvio: string }) => void;
}

interface RelatorioOption {
  id: string;
  titulo: string;
}

export default function RegistrarRelatorioModal({
  isOpen,
  onClose,
  onSave,
}: RegistrarRelatorioModalProps) {
  const [selectedRelatorio, setSelectedRelatorio] = useState<string>("");
  const [dataEnvio, setDataEnvio] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const relatoriosOptions: RelatorioOption[] = [
    { id: "1", titulo: "Relatório Semestral 1" },
    { id: "2", titulo: "Relatório Semestral 2" },
    { id: "3", titulo: "Relatório Semestral 3" },
    { id: "4", titulo: "Relatório Semestral 4" },
  ];

  const handleSelectRelatorio = (relatorio: RelatorioOption) => {
    setSelectedRelatorio(relatorio.titulo);
    setDropdownOpen(false);
  };

  const handleSalvar = () => {
    if (!selectedRelatorio || !dataEnvio) {
      alert("Por favor, selecione um relatório e informe a data de envio.");
      return;
    }

    // Chama o callback se fornecido
    onSave?.({ relatorio: selectedRelatorio, dataEnvio: dataEnvio });

    // Reset form
    setSelectedRelatorio("");
    setDataEnvio("");
    onClose();
  };

  const handleCancelar = () => {
    // Reset form
    setSelectedRelatorio("");
    setDataEnvio("");
    setDropdownOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.6)",
      }}
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Relatórios:</h2>
          <button
            onClick={handleCancelar}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Dropdown de Relatórios */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relatório:
            </label>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <span
                  className={
                    selectedRelatorio ? "text-gray-900" : "text-gray-500"
                  }
                >
                  {selectedRelatorio || "ESCOLHA DO RELATÓRIO:"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <>
                  {/* Backdrop para fechar dropdown */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                    {relatoriosOptions.map((relatorio) => (
                      <button
                        key={relatorio.id}
                        onClick={() => handleSelectRelatorio(relatorio)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-700 border-b border-gray-100 last:border-b-0"
                      >
                        {relatorio.titulo}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Campo de Data */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data de Envio:
            </label>
            <div className="relative">
              <input
                type="date"
                value={dataEnvio}
                onChange={(e) => setDataEnvio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-[#605BFF]"
                placeholder="dd/mm/aaaa"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t">
          <button
            onClick={handleCancelar}
            className="cursor-pointer flex-1 px-4 py-2 text-[#605BFF] bg-white border border-[#605BFF] rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            className="cursor-pointer flex-1 px-4 py-2 bg-[#605BFF] text-white rounded-lg hover:bg-[#504EDD] transition-colors font-medium"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
