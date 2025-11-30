"use client";

import { useState } from "react";
import { Calendar, Clock, Users, MapPin, Video, Plus } from "lucide-react";

interface Reuniao {
  id: string;
  titulo: string;
  orientando: string;
  data: string;
  horario: string;
  tipo: "presencial" | "online" | "pendente";
  local?: string;
  linkMeet?: string;
  status: "agendada" | "em-andamento" | "concluida" | "cancelada";
}

export function ReuniaoCard() {
  const [reunioes] = useState<Reuniao[]>([
    {
      id: "1",
      titulo: "Acompanhamento Semanal",
      orientando: "João Silva",
      data: "25/11/2024",
      horario: "14:00",
      tipo: "online",
      linkMeet: "https://meet.google.com/abc-defg-hij",
      status: "agendada",
    },
    {
      id: "2",
      titulo: "Revisão de Relatório",
      orientando: "Maria Santos",
      data: "26/11/2024",
      horario: "15:30",
      tipo: "presencial",
      local: "Sala 205 - Bloco A",
      status: "agendada",
    },
    {
      id: "3",
      titulo: "Entrega Final",
      orientando: "Pedro Costa",
      data: "28/11/2024",
      horario: "10:00",
      tipo: "presencial",
      local: "Sala 301 - Bloco B",
      status: "agendada",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "agendada":
        return "bg-blue-100 text-blue-800";
      case "em-andamento":
        return "bg-green-100 text-green-800";
      case "concluida":
        return "bg-gray-100 text-gray-800";
      case "cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "agendada":
        return "Agendada";
      case "em-andamento":
        return "Em andamento";
      case "concluida":
        return "Concluída";
      case "cancelada":
        return "Cancelada";
      default:
        return "Indefinido";
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "online":
        return <Video className="w-4 h-4" />;
      case "presencial":
        return <MapPin className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header do componente */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-800">Próximas Reuniões</h2>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Plus className="w-4 h-4" />
          Nova Reunião
        </button>
      </div>

      {/* Lista de reuniões */}
      <div className="space-y-4">
        {reunioes.map((reuniao) => (
          <div
            key={reuniao.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              {/* Informações da reunião */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {reuniao.titulo}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  {reuniao.orientando}
                </p>

                {/* Data e horário */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {reuniao.data}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {reuniao.horario}
                  </div>
                </div>

                {/* Local/Link */}
                <div className="flex items-center gap-2 text-sm">
                  {getTipoIcon(reuniao.tipo)}
                  <span className="text-gray-600">
                    {reuniao.tipo === "online"
                      ? reuniao.linkMeet
                      : reuniao.local}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    reuniao.status
                  )}`}
                >
                  {getStatusLabel(reuniao.status)}
                </span>

                {reuniao.tipo === "online" && reuniao.status === "agendada" && (
                  <a
                    href={reuniao.linkMeet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Video className="w-4 h-4" />
                    Entrar
                  </a>
                )}
              </div>
            </div>

            {/* Ações da reunião */}
            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors">
                Editar
              </button>
              <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors">
                Cancelar
              </button>
              <button className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas de reuniões */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {reunioes.length}
            </p>
            <p className="text-sm text-gray-600">Esta Semana</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {reunioes.filter((r) => r.tipo === "online").length}
            </p>
            <p className="text-sm text-gray-600">Online</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {reunioes.filter((r) => r.tipo === "presencial").length}
            </p>
            <p className="text-sm text-gray-600">Presencial</p>
          </div>
        </div>
      </div>
    </div>
  );
}
