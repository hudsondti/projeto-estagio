"use client";

import { useState } from "react";
import { X } from "lucide-react";
import api from "@/src/services/api";

interface ConcluirEstagioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  estagioId: string;
}

interface ConclusaoPropostaDTO {
  efetivado: boolean;
  motivo: string;
}

export default function ConcluirEstagioModal({
  isOpen,
  onClose,
  estagioId,
}: ConcluirEstagioModalProps) {
  const [motivo, setMotivo] = useState("");
  const [efetivado, setEfetivado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirm = async () => {
    if (!motivo.trim()) return;

    setIsLoading(true);
    setErrorMessage(""); // Limpar erro anterior

    try {
      const response = await api.patch(`/api/estagios/${estagioId}/concluir`, {
        efetivado,
        motivo: motivo.trim(),
      });

      console.log("Estágio concluído com sucesso:", response);
      handleCancel(); // Fechar modal em caso de sucesso
    } catch (error: any) {
      console.error("Erro ao concluir estágio:", error);

      // Tratar diferentes tipos de erro
      if (
        error?.response?.status === 400 ||
        error?.message?.includes("ativo")
      ) {
        setErrorMessage(
          "Este estágio não pode ser concluído. Verifique se ele está com status ativo."
        );
      } else if (error?.response?.status === 403) {
        setErrorMessage("Você não tem permissão para concluir este estágio.");
      } else if (error?.response?.status === 404) {
        setErrorMessage("Estágio não encontrado.");
      } else {
        setErrorMessage("Erro ao concluir estágio. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setMotivo("");
    setEfetivado(false);
    setErrorMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.6)",
      }}
      className="fixed inset-0  flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Conclusão de Estágio:
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors hover:bg-red-200 rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Mensagem de erro */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{errorMessage}</p>
            </div>
          )}

          <div className="mb-4">
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={efetivado}
                onChange={(e) => setEfetivado(e.target.checked)}
                className="w-4 h-4 text-[#605BFF] border-gray-300 rounded focus:ring-[#605BFF] focus:ring-2"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Estágio foi efetivado
              </span>
            </label>

            <label
              htmlFor="motivo"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Motivo:
            </label>
            <textarea
              id="motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Descreva o motivo da conclusão do estágio"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={handleCancel}
            className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!motivo.trim() || isLoading}
            className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-[#605BFF] rounded-md hover:bg-[#504EDD] focus:outline-none focus:ring-2 focus:ring-[#605BFF] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Concluindo...
              </>
            ) : (
              "Confirmar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
