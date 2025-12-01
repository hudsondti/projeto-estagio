"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Calendar,
  MessageCircle,
  Bell,
  FileText,
} from "lucide-react";

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: string;
  statusColor: string;
  buttonText?: string;
  buttonColor?: string;
  icon: React.ReactNode;
  hasNotification?: boolean;
}

export default function InformacaoEstagio() {
  const [cards] = useState<CardData[]>([
    {
      id: "1",
      title: "Meus Estágios",
      subtitle: "Estágio Atual",
      description: "Hospital São Lucas — ativo até 10/12/2025",
      status: "Supervisor: João da Silva\nVigência: 01/06/2025 – 12/12/2025",
      statusColor: "text-gray-600",
      buttonText: "Ativo",
      buttonColor: "bg-green-100 text-green-700",
      icon: <FileText className="w-5 h-5 text-blue-600" />,
    },
    {
      id: "2",
      title: "Relatórios",
      subtitle: "Próximo Relatório",
      description: "1º Relatório Parcial — entrega em 15/11/2025",
      status: "Acompanhe seus prazos e mantenha seus envios em dia",
      statusColor: "text-gray-600",
      icon: <Calendar className="w-5 h-5 text-orange-600" />,
    },
    {
      id: "3",
      title: "Mensagens",
      subtitle: "Mensagens do Orientador",
      description: "Você tem novas observações sobre o seu relatório.",
      status:
        "Revise o feedback enviado pelo seu professor antes da entrega final.",
      statusColor: "text-gray-600",
      icon: <MessageCircle className="w-5 h-5 text-green-600" />,
    },
    {
      id: "4",
      title: "Notificações",
      subtitle: "Nova Notificação",
      description: "Alerta de prazo — Relatório próximo do vencimento.",
      status: "Envie o arquivo para manter seu estágio regularizado.",
      statusColor: "text-gray-600",
      buttonText: "Seu 1º Relatório Parcial vence em 7 dias.",
      buttonColor: "bg-red-100 text-red-700",
      icon: <Bell className="w-5 h-5 text-purple-600" />,
      hasNotification: true,
    },
  ]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {card.icon}
                <h3 className="font-semibold text-gray-900">{card.title}</h3>
                {card.hasNotification && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Subtitle */}
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              {card.subtitle}
            </h4>

            {/* Description */}
            <p className="text-sm text-gray-900 mb-3">{card.description}</p>

            {/* Dashboard Preview */}
            <div className="mb-4 bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="bg-blue-900 rounded-md p-2 text-white text-xs">
                <div className="grid grid-cols-6 gap-1 mb-1">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded ${
                        i < 8
                          ? "bg-blue-400"
                          : i < 16
                          ? "bg-blue-300"
                          : "bg-blue-200"
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="text-right text-xs opacity-75">
                  Dashboard Preview
                </div>
              </div>
            </div>

            {/* Status */}
            <p
              className={`text-xs ${card.statusColor} mb-4 whitespace-pre-line`}
            >
              {card.status}
            </p>

            {/* Button */}
            {card.buttonText && (
              <button
                className={`w-full px-3 py-2 rounded-md text-sm font-medium ${card.buttonColor} transition-colors hover:opacity-80`}
              >
                {card.buttonText}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
