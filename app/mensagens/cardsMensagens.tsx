import { CalendarDays, Flag } from "lucide-react";

const infoData = [
  {
    id: 1,
    title: "Estágio Aprovado",
    description:
      "Seu estágio foi aprovado pelo Professor Donald Joaquim Nabuco.",
    situation: "Aprovado",
    bgButton: "bg-[#34C759]",
    date: "12/07/25",
    time: "22:24",
  },
  {
    id: 2,
    title: "Documentação Pendente",
    description: "Você precisa enviar os documentos pendentes para o estágio.",
    situation: "Pendente",
    bgButton: "bg-[#FF8D28]",
    date: "10/07/25",
    time: "14:30",
  },
  {
    id: 3,
    title: "Reunião Agendada",
    description: "Reunião marcada com o orientador para discussão do projeto.",
    situation: "Agendado",
    bgButton: "bg-[#605BFF]",
    date: "08/07/25",
    time: "09:15",
  },
  {
    id: 4,
    title: "Prazo Vencido",
    description: "O prazo para entrega do relatório foi ultrapassado.",
    situation: "Vencido",
    bgButton: "bg-[#FF383C]",
    date: "05/07/25",
    time: "16:45",
  },
  {
    id: 1,
    title: "Estágio Aprovado",
    description:
      "Seu estágio foi aprovado pelo Professor Donald Joaquim Nabuco.",
    situation: "Aprovado",
    bgButton: "bg-[#34C759]",
    date: "12/07/25",
    time: "22:24",
  },
  {
    id: 2,
    title: "Documentação Pendente",
    description: "Você precisa enviar os documentos pendentes para o estágio.",
    situation: "Pendente",
    bgButton: "bg-[#FF8D28]",
    date: "10/07/25",
    time: "14:30",
  },
  {
    id: 3,
    title: "Reunião Agendada",
    description: "Reunião marcada com o orientador para discussão do projeto.",
    situation: "Agendado",
    bgButton: "bg-[#605BFF]",
    date: "08/07/25",
    time: "09:15",
  },
  {
    id: 4,
    title: "Prazo Vencido",
    description: "O prazo para entrega do relatório foi ultrapassado.",
    situation: "Vencido",
    bgButton: "bg-[#FF383C]",
    date: "05/07/25",
    time: "16:45",
  },
];

export default function CardsMensagens() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {infoData.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-[8px] p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow min-h-[200px]"
          >
            <div className="flex flex-col gap-3 h-full">
              <div className="flex items-start gap-2">
                <Flag className="w-5 h-5 text-[#605BFF] flex-shrink-0 mt-0.5" />
                <h3 className="text-[#030229] text-[14px] font-semibold leading-5">
                  {card.title}
                </h3>
              </div>
              <p className="text-black text-[12px] font-normal leading-4 flex-1">
                {card.description}
              </p>
              <div className="flex flex-col gap-6 mt-auto">
                <div className="flex items-center gap-1">
                  <CalendarDays className={`w-5 h-5 text-[#605BFF]`} />
                  <span className="text-[12px] text-gray-600">
                    {card.date} - {card.time}
                  </span>
                </div>

                <button
                  className={`rounded-full ${card.bgButton} text-white px-3 py-1 text-[12px] font-medium w-[93px] items-center mx-auto`}
                >
                  {card.situation}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
