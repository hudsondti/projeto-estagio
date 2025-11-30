import { CalendarDays, Flag } from "lucide-react";

interface Notificacao {
  id: string;
  titulo: string;
  descricao: string;
  dataCriacao: string;
  tipo: string;
  lida?: boolean;
}

interface CardsMensagensProps {
  notificacoes: Notificacao[];
  loading: boolean;
  error: string | null;
}

function getStatusColor(tipo: string) {
  switch (tipo.toLowerCase()) {
    case "aprovado":
      return "bg-[#34C759]"; // Verde
    case "pendente":
      return "bg-[#FF8D28]"; // Laranja
    case "agendado":
      return "bg-[#605BFF]"; // Roxo
    case "vencido":
      return "bg-[#FF383C]"; // Vermelho
    default:
      return "bg-gray-500"; // Cinza padrão
  }
}

function getStatusText(tipo: string) {
  switch (tipo.toLowerCase()) {
    case "aprovado":
      return "Aprovado";
    case "pendente":
      return "Pendente";
    case "agendado":
      return "Agendado";
    case "vencido":
      return "Vencido";
    default:
      return tipo;
  }
}

function formatDateTime(dataCriacao: string) {
  const date = new Date(dataCriacao);
  const dateStr = date.toLocaleDateString("pt-BR");
  const timeStr = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date: dateStr, time: timeStr };
}

export default function CardsMensagens({
  notificacoes,
  loading,
  error,
}: CardsMensagensProps) {
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-500">Carregando notificações...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-16">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (!notificacoes || notificacoes.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <p className="text-gray-500 text-lg">Nenhuma notificação encontrada</p>
      </div>
    );
  }

  console.log("notificacoes:", notificacoes);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {notificacoes.map((notificacao) => {
          const { date, time } = formatDateTime(notificacao.dataCriacao);
          const statusColor = getStatusColor(notificacao.tipo);
          const statusText = getStatusText(notificacao.tipo);

          return (
            <div
              key={notificacao.id}
              className={`bg-white rounded-[8px] p-7 shadow-sm border transition-all duration-200 min-h-[200px] hover:shadow-md ${
                !notificacao.lida
                  ? "border-red-200 shadow-red-50"
                  : "border-gray-100"
              }`}
            >
              <div className="flex flex-col gap-3 h-full">
                <div className="flex items-start gap-2">
                  <div className="relative">
                    <Flag className="w-5 h-5 text-[#605BFF] flex-shrink-0 mt-0.5" />
                    {!notificacao.lida && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                  <h3 className="text-[#030229] text-[14px] font-semibold leading-5">
                    {notificacao.titulo}
                  </h3>
                </div>
                <p className="text-black text-[12px] font-normal leading-4 flex-1">
                  {notificacao.descricao}
                </p>
                <div className="flex flex-col gap-6 mt-auto">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-5 h-5 text-[#605BFF]" />
                    <span className="text-[12px] text-gray-600">
                      {date} - {time}
                    </span>
                  </div>

                  <button
                    className={`rounded-full ${statusColor} text-white px-3 py-1 text-[12px] font-medium w-fit min-w-[93px] items-center mx-auto`}
                  >
                    {statusText}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
