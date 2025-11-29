"use client";

import { usePermissions } from "@/src/hooks/usePermissions";
import { ProtectedPage } from "@/src/components/layout/Layout";
import { UserRole } from "@/src/types/roles";
import { RoleBasedContent } from "@/src/components/common/RoleBasedContent";
import {
  Briefcase,
  FileText,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
  Bell,
} from "lucide-react";

function DashboardAluno() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard do Aluno</h2>
        <p className="text-gray-600 mt-1">
          Acompanhe o progresso dos seus estágios
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">
                Estágios Ativos
              </p>
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">
                Relatórios Enviados
              </p>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">
                Horas Cumpridas
              </p>
              <p className="text-2xl font-bold text-gray-800">120h</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Progresso</p>
              <p className="text-2xl font-bold text-gray-800">40%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Próximas Tarefas</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <p className="font-medium">Relatório Mensal</p>
                <p className="text-sm text-gray-600">Vence em 3 dias</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Atividades Recentes</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium">Relatório aprovado</p>
                <p className="text-sm text-gray-600">2 dias atrás</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardProfessor() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard do Professor
        </h2>
        <p className="text-gray-600 mt-1">
          Acompanhe seus orientandos e atividades
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Orientandos</p>
              <p className="text-2xl font-bold text-gray-800">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Aprovados</p>
              <p className="text-2xl font-bold text-gray-800">15</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Relatórios</p>
              <p className="text-2xl font-bold text-gray-800">24</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Ações Pendentes</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <p className="font-medium">Aprovar estágio - João Silva</p>
                <p className="text-sm text-gray-600">Aguardando há 2 dias</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium">Avaliar relatório - Maria Santos</p>
                <p className="text-sm text-gray-600">Recebido hoje</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Orientandos Ativos</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">João Silva</p>
                <p className="text-sm text-gray-600">
                  TechCorp - 60% concluído
                </p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Maria Santos</p>
                <p className="text-sm text-gray-600">
                  InnovateTech - 80% concluído
                </p>
              </div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCoordenador() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard do Coordenador
        </h2>
        <p className="text-gray-600 mt-1">Visão geral do sistema de estágios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">
                Total Estágios
              </p>
              <p className="text-2xl font-bold text-gray-800">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Alunos Ativos</p>
              <p className="text-2xl font-bold text-gray-800">89</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Professores</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-gray-800">23</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Atrasados</p>
              <p className="text-2xl font-bold text-gray-800">7</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Ações Urgentes</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <div>
                <p className="font-medium">Estágios vencidos</p>
                <p className="text-sm text-gray-600">
                  7 estágios precisam de atenção
                </p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <p className="font-medium">Aprovações pendentes</p>
                <p className="text-sm text-gray-600">23 aguardando análise</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Estatísticas do Mês</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Novos estágios:</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Concluídos:</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxa de aprovação:</span>
              <span className="font-medium text-green-600">85%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Notificações</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium">Novo professor cadastrado</p>
                <p className="text-sm text-gray-600">Dr. Ana Silva</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { getUserRole } = usePermissions();
  const userRole = getUserRole();

  const renderRoleBasedDashboard = () => {
    switch (userRole) {
      case UserRole.ALUNO:
        return <DashboardAluno />;
      case UserRole.PROFESSOR:
        return <DashboardProfessor />;
      case UserRole.COORDENADOR:
        return <DashboardCoordenador />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Role não reconhecido
            </h2>
            <p className="text-gray-600">Contate o administrador do sistema.</p>
          </div>
        );
    }
  };

  return (
    <ProtectedPage requiredModule="dashboard" requiredAction="view">
      {renderRoleBasedDashboard()}
    </ProtectedPage>
  );
}
