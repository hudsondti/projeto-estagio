import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BellRing, CalendarDays, CircleCheck, CircleX } from "lucide-react";

interface Relatorio {
  id: string;
  titulo: string;
  dataEntregaPrevista: string;
  dataEntregaEfetiva: string | null;
  statusTexto: string;
  statusCor: string;
}

interface StageReportTrackerProps {
  relatorios?: Relatorio[];
  loading?: boolean;
}

function getStatusIcon(statusTexto: string, dataEntregaEfetiva: string | null) {
  if (dataEntregaEfetiva) {
    return (
      <CircleCheck className="w-4 h-4 text-green-600 inline-block mr-1.5" />
    );
  }

  switch (statusTexto.toLowerCase()) {
    case "entregue":
    case "entregado":
      return (
        <CircleCheck className="w-4 h-4 text-green-600 inline-block mr-1.5" />
      );
    case "pendente":
      return (
        <BellRing className="w-5 h-5 text-[#FEBC2F] inline-block mr-1.5" />
      );
    case "atrasado":
    case "não enviado":
      return <CircleX className="w-5 h-5 text-[#E71D36] inline-block mr-1.5" />;
    default:
      return <BellRing className="w-5 h-5 text-gray-400 inline-block mr-1.5" />;
  }
}

function getStatusColor(
  statusTexto: string,
  dataEntregaEfetiva: string | null
) {
  if (dataEntregaEfetiva) {
    return "bg-green-100 text-green-800";
  }

  switch (statusTexto.toLowerCase()) {
    case "entregue":
    case "entregado":
      return "bg-green-100 text-green-800";
    case "pendente":
      return "bg-yellow-100 text-yellow-800";
    case "atrasado":
    case "não enviado":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}

function calculateDaysRemaining(dataEntregaPrevista: string) {
  const today = new Date();
  const dueDate = new Date(dataEntregaPrevista);
  const timeDiff = dueDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysDiff < 0) {
    return `${Math.abs(daysDiff)} dias atraso`;
  } else if (daysDiff === 0) {
    return "Hoje";
  } else {
    return `${daysDiff} dias`;
  }
}

export default function StageReportTracker({
  relatorios = [],
  loading = false,
}: StageReportTrackerProps) {
  return (
    <section className="w-[500px] bg-white rounded-[12px] shadow-md relative">
      <div className="py-5 px-6">
        <h1 className="text-black text-[24px] leading-5">
          Prazos e Relatórios
        </h1>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando relatórios...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] text-gray-500 py-4">
                  Relatório
                </TableHead>
                <TableHead className="text-gray-500 py-4">
                  Data de Entrega
                </TableHead>
                <TableHead className="text-gray-500 py-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relatorios.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-8 text-gray-500"
                  >
                    Nenhum relatório encontrado
                  </TableCell>
                </TableRow>
              ) : (
                relatorios.map((relatorio) => {
                  const isEntregue = !!relatorio.dataEntregaEfetiva;
                  const statusColor = getStatusColor(
                    relatorio.statusTexto,
                    relatorio.dataEntregaEfetiva
                  );
                  const statusIcon = getStatusIcon(
                    relatorio.statusTexto,
                    relatorio.dataEntregaEfetiva
                  );
                  const displayStatus = isEntregue
                    ? "Entregue"
                    : relatorio.statusTexto === "Pendente"
                    ? calculateDaysRemaining(relatorio.dataEntregaPrevista)
                    : relatorio.statusTexto;

                  return (
                    <TableRow key={relatorio.id} className="py-5">
                      <TableCell className="w-[150px] text-gray-500 py-4">
                        {relatorio.titulo}
                      </TableCell>
                      <TableCell className="text-gray-500 flex items-center gap-1 py-4">
                        <CalendarDays className="w-4 h-4 mr-1 text-[#4285F4]" />
                        {isEntregue
                          ? formatDate(relatorio.dataEntregaEfetiva!)
                          : formatDate(relatorio.dataEntregaPrevista)}
                      </TableCell>
                      <TableCell
                        className={`${statusColor} rounded-full text-center text-[14px] leading-4 font-bold py-4`}
                      >
                        {statusIcon}
                        {displayStatus}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
}
