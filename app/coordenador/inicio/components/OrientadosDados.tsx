import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Relatorio {
  id: string;
  titulo: string;
  dataEntregaPrevista: string;
  dataEntregaEfetiva: string | null;
  statusTexto: string;
  statusCor: string;
}

interface EstagioData {
  id: string;
  matricula: string;
  statusEstagio: string;
  alunoNomeCompleto: string;
  orientadorNomeCompleto: string;
  concedente: string;
  supervisor: string;
  formacaoSupervisor: string | null;
  dataInicio: string;
  dataTermino: string;
  cargaHorariaSemanal: number;
  valorBolsa: number;
  auxilioTransporte: boolean;
  valorAuxilioTransporte: number;
  seguro: boolean;
  dataEntregaTCE: string;
  dataEntregaPlanoDeAtividades: string;
  relatorios: Relatorio[];
  aditivos: any[];
}

interface OrientadosDadosProps {
  estagio: EstagioData;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatStatus(status: string) {
  switch (status.toUpperCase()) {
    case "EM_ANALISE":
      return "Em Análise";
    case "CONCLUIDO":
      return "Concluído";
    case "ATIVO":
      return "Ativo";
    case "REPROVADO":
      return "Reprovado";
    case "CANCELADO":
      return "Cancelado";
    default:
      return status;
  }
}

export default function OrientadosDados({ estagio }: OrientadosDadosProps) {
  const fields = [
    {
      key: "id",
      label: "Matrícula:",
      value: estagio.matricula,
      type: "text",
    },
    {
      key: "alunoNomeCompleto",
      label: "Aluno:",
      value: estagio.alunoNomeCompleto,
      type: "text",
    },
    {
      key: "orientadorNomeCompleto",
      label: "Orientador:",
      value: estagio.orientadorNomeCompleto,
      type: "text",
    },
    {
      key: "concedente",
      label: "Concedente:",
      value: estagio.concedente,
      type: "text",
    },
    {
      key: "supervisor",
      label: "Supervisor:",
      value: estagio.supervisor,
      type: "text",
    },
    {
      key: "formacaoSupervisor",
      label: "Formação do Supervisor:",
      value: estagio.formacaoSupervisor || "Não informado",
      type: "text",
    },
    {
      key: "dataInicio",
      label: "Data de Início:",
      value: formatDate(estagio.dataInicio),
      type: "date",
    },
    {
      key: "dataTermino",
      label: "Data de Término:",
      value: formatDate(estagio.dataTermino),
      type: "date",
    },
    {
      key: "cargaHorariaSemanal",
      label: "Carga Horária Semanal:",
      value: `${estagio.cargaHorariaSemanal} horas`,
      type: "number",
    },
    {
      key: "valorBolsa",
      label: "Valor da Bolsa:",
      value: formatCurrency(estagio.valorBolsa),
      type: "currency",
    },
    {
      key: "auxilioTransporte",
      label: "Auxílio Transporte:",
      value: estagio.auxilioTransporte ? "Sim" : "Não",
      type: "boolean",
    },
    {
      key: "valorAuxilioTransporte",
      label: "Valor Auxílio Transporte:",
      value: formatCurrency(estagio.valorAuxilioTransporte),
      type: "currency",
    },
    {
      key: "seguro",
      label: "Seguro:",
      value: estagio.seguro ? "Sim" : "Não",
      type: "boolean",
    },
    {
      key: "dataEntregaTCE",
      label: "Data Entrega TCE:",
      value: formatDate(estagio.dataEntregaTCE),
      type: "date",
    },
    {
      key: "dataEntregaPlanoDeAtividades",
      label: "Data Entrega Plano de Atividades:",
      value: formatDate(estagio.dataEntregaPlanoDeAtividades),
      type: "date",
    },
    {
      key: "statusEstagio",
      label: "Status do Estágio:",
      value: formatStatus(estagio.statusEstagio),
      type: "status",
    },
  ];

  return (
    <section>
      <div className="py-5 px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Detalhes do Estágio
          </h2>
          <p className="text-gray-600">
            Informações completas do estágio de {estagio.alunoNomeCompleto}
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] text-gray-500">Campo</TableHead>
              <TableHead className="text-gray-500">Informação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field) => (
              <TableRow key={field.key}>
                <TableCell className="font-medium">{field.label}</TableCell>
                <TableCell className="text-gray-900">{field.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Seção de Relatórios */}
        {estagio.relatorios && estagio.relatorios.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Relatórios ({estagio.relatorios.length})
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-500">Título</TableHead>
                  <TableHead className="text-gray-500">Data Prevista</TableHead>
                  <TableHead className="text-gray-500">Data Entrega</TableHead>
                  <TableHead className="text-gray-500">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {estagio.relatorios.map((relatorio) => (
                  <TableRow key={relatorio.id}>
                    <TableCell className="font-medium">
                      {relatorio.titulo}
                    </TableCell>
                    <TableCell>
                      {formatDate(relatorio.dataEntregaPrevista)}
                    </TableCell>
                    <TableCell>
                      {relatorio.dataEntregaEfetiva
                        ? formatDate(relatorio.dataEntregaEfetiva)
                        : "Não entregue"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          relatorio.dataEntregaEfetiva
                            ? "text-green-700 bg-green-100"
                            : "text-yellow-700 bg-yellow-100"
                        }`}
                      >
                        {relatorio.statusTexto}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Seção de Aditivos (se houver) */}
        {estagio.aditivos && estagio.aditivos.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Aditivos ({estagio.aditivos.length})
            </h3>
            <p className="text-gray-600">
              Informações dos aditivos serão exibidas aqui.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
