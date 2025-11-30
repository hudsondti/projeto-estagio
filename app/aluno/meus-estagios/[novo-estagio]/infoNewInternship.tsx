"use client";
import api from "@/src/services/api";
import { useState, useEffect } from "react";

interface InternshipData {
  alunoId: string;
  orientadorId: string;
  concedente: string;
  supervisor: string;
  formacaoSupervisor?: string;
  dataInicio: string;
  dataTermino: string;
  cargaHoraria: number;
  valorBolsa: number;
  auxilioTransporte: boolean;
  valorAuxilioTransporte: number;
  seguro: boolean;
  dataEntregaTCE: string;
  dataEntregaPlanoAtividade: string;
}

interface Professor {
  id: string;
  nome: string;
}

export default function InfoNewInternshipPage() {
  const [formData, setFormData] = useState<InternshipData>({
    alunoId: "",
    orientadorId: "",
    concedente: "",
    supervisor: "",
    formacaoSupervisor: "",
    dataInicio: "",
    dataTermino: "",
    cargaHoraria: 0,
    valorBolsa: 0,
    auxilioTransporte: false,
    valorAuxilioTransporte: 0,
    seguro: false,
    dataEntregaTCE: "",
    dataEntregaPlanoAtividade: "",
  });

  const [professors, setProfessors] = useState<Professor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingProfessors, setIsFetchingProfessors] = useState(false);

  // Buscar professores quando o componente carrega
  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    setIsFetchingProfessors(true);
    try {
      const token = localStorage.getItem("token") || "";

      if (!token) {
        throw new Error("Token de autenticação não encontrado.");
      }

      const response = await api.get<Professor[]>("/api/professores/listar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const professores = response.data;
      console.log("Professores recebidos da API:", professores);

      setProfessors(professores);
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
    } finally {
      setIsFetchingProfessors(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    console.log("entrou submit");
    e.preventDefault();
    setIsLoading(true);

    const alunoId = localStorage.getItem("userId");

    console.log("Aluno ID:", alunoId);
    const data: InternshipData = {
      alunoId: alunoId || "teste",
      orientadorId: formData.orientadorId,
      concedente: formData.concedente,
      supervisor: formData.supervisor,
      formacaoSupervisor: formData.formacaoSupervisor,
      dataInicio: formData.dataInicio,
      dataTermino: formData.dataTermino,
      cargaHoraria: formData.cargaHoraria,
      valorBolsa: formData.valorBolsa,
      auxilioTransporte: formData.auxilioTransporte,
      valorAuxilioTransporte: formData.valorAuxilioTransporte,
      seguro: formData.seguro,
      dataEntregaTCE: formData.dataEntregaTCE,
      dataEntregaPlanoAtividade: formData.dataEntregaPlanoAtividade,
    };

    try {
      console.log("Dados do estágio:", data);
      console.log("É rascunho:", isDraft);

      // Criar novo estágio
      const response = await api.post("/api/estagios/criar", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      console.log("Estágio criado com sucesso:", response.data);
      alert("Estágio criado com sucesso!");

      // Resetar o formulário após sucesso
      setFormData({
        alunoId: "",
        orientadorId: "",
        concedente: "",
        supervisor: "",
        formacaoSupervisor: "",
        dataInicio: "",
        dataTermino: "",
        cargaHoraria: 0,
        valorBolsa: 0,
        auxilioTransporte: false,
        valorAuxilioTransporte: 0,
        seguro: false,
        dataEntregaTCE: "",
        dataEntregaPlanoAtividade: "",
      });
    } catch (error) {
      console.error("Erro ao processar:", error);
      alert("Erro ao processar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAsDraft = (e: React.FormEvent) => {
    handleSubmit(e, true);
  };

  return (
    <section className="w-[500px] xl1:w-[500px] bg-white rounded-[12px] shadow-md container-dashboard">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 py-5 px-6">
          <h1 className="text-black text-[24px] leading-5">
            Criar novo estágio
          </h1>

          <div className="w-full">
            <h4>Professor Orientador:</h4>
            <select
              name="orientadorId"
              value={formData.orientadorId}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              required
              disabled={isFetchingProfessors}
            >
              <option value="">
                {isFetchingProfessors
                  ? "Carregando..."
                  : "Selecione um professor"}
              </option>
              {professors.map((professor) => (
                <option key={professor.id} value={professor.id}>
                  {professor.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="w-full">
              <h4>Data de Início:</h4>
              <input
                type="date"
                name="dataInicio"
                value={formData.dataInicio}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                required
              />
            </div>
            <div className="w-full">
              <h4>Data de Término:</h4>
              <input
                type="date"
                name="dataTermino"
                value={formData.dataTermino}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                required
              />
            </div>
            <div className="w-full">
              <h4>Empresa Concedente:</h4>
              <input
                type="text"
                name="concedente"
                value={formData.concedente}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                required
              />
            </div>
            <div className="w-full">
              <h4>Supervisor na Empresa:</h4>
              <input
                type="text"
                name="supervisor"
                value={formData.supervisor}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                required
              />
            </div>
            <div className="w-full">
              <h4>Formação do Supervisor:</h4>
              <input
                type="text"
                name="formacaoSupervisor"
                value={formData.formacaoSupervisor}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                placeholder="Ex: Engenheiro de Software"
              />
            </div>
            <div className="w-full">
              <h4>Carga Horária Semanal:</h4>
              <input
                type="number"
                name="cargaHoraria"
                value={formData.cargaHoraria}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                min="1"
                max="44"
                required
              />
            </div>
            <div className="w-full">
              <h4>Valor da Bolsa (R$):</h4>
              <input
                type="number"
                name="valorBolsa"
                value={formData.valorBolsa}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Checkboxes e campos condicionais */}
          <div className="grid grid-cols-2 gap-3">
            <div className="w-full flex items-center gap-3">
              <input
                type="checkbox"
                name="auxilioTransporte"
                checked={formData.auxilioTransporte}
                onChange={handleCheckboxChange}
                className="w-4 h-4"
              />
              <h4>Auxílio Transporte</h4>
            </div>
            <div className="w-full">
              <h4>Valor Auxílio Transporte (R$):</h4>
              <input
                type="number"
                name="valorAuxilioTransporte"
                value={formData.valorAuxilioTransporte}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                disabled={!formData.auxilioTransporte}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 disabled:bg-gray-100"
                placeholder="0.00"
              />
            </div>
            <div className="w-full flex items-center gap-3">
              <input
                type="checkbox"
                name="seguro"
                checked={formData.seguro}
                onChange={handleCheckboxChange}
                className="w-4 h-4"
              />
              <h4>Seguro</h4>
            </div>
            <div className="w-full">
              <h4>Data Entrega TCE:</h4>
              <input
                type="date"
                name="dataEntregaTCE"
                value={formData.dataEntregaTCE}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                required
              />
            </div>
            <div className="w-full col-span-2">
              <h4>Data Entrega Plano de Atividade:</h4>
              <input
                type="date"
                name="dataEntregaPlanoAtividade"
                value={formData.dataEntregaPlanoAtividade}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 py-5 px-6 w-full">
          {/* <button
            type="button"
            onClick={handleSaveAsDraft}
            disabled={isLoading}
            className="text-[#605BFF] text-[16px] leading-5 font-semibold bg-white border border-[#605BFF] px-8 py-2 rounded-md hover:bg-[#605BFF] hover:text-white transition-colors disabled:opacity-50"
          >
            {isLoading ? "Salvando..." : "Salvar como Rascunho"}
          </button> */}
          <button
            type="submit"
            disabled={isLoading}
            className="text-white text-[16px] leading-5 font-semibold bg-[#605BFF] hover:opacity-75 px-8 py-2 rounded-md disabled:opacity-50 transition-opacity"
          >
            {isLoading ? "Criando..." : "Criar Novo Estágio"}
          </button>
        </div>
      </form>
    </section>
  );
}
