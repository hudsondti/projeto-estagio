"use client";

import { usePermissions } from "@/src/hooks/usePermissions";
import { ProtectedPage } from "@/src/components/layout/Layout";
import { UserRole } from "@/src/types/roles";
import { RoleBasedContent } from "@/src/components/common/RoleBasedContent";
import {
  FileText,
  Plus,
  Filter,
  Search,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

function RelatoriosAluno() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Meus Relatórios</h2>
          <p className="text-gray-600 mt-1">
            Acompanhe e gerencie seus relatórios de estágio
          </p>
        </div>

        <RoleBasedContent module="relatorios" action="create">
          <button className="bg-[#605BFF] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#4F46E5] transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Novo Relatório
          </button>
        </RoleBasedContent>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <p className="text-gray-600">
          Aqui serão integrados os componentes existentes de relatórios para
          alunos.
        </p>
      </div>
    </div>
  );
}

function RelatoriosProfessor() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Relatórios dos Orientandos
          </h2>
          <p className="text-gray-600 mt-1">
            Avalie os relatórios dos seus alunos
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Relatórios Pendentes
          </h3>
          <p className="text-gray-600 mb-4">
            Você tem relatórios aguardando avaliação
          </p>

          <div className="space-y-4 max-w-md mx-auto">
            <div className="border rounded-lg p-4 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">João Silva - Relatório Mensal</p>
                  <p className="text-sm text-gray-600">Enviado há 2 dias</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-[#605BFF] hover:bg-[#605BFF] hover:text-white rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RelatoriosCoordenador() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Gestão de Relatórios
          </h2>
          <p className="text-gray-600 mt-1">
            Visão completa de todos os relatórios
          </p>
        </div>

        <RoleBasedContent module="relatorios" action="manage">
          <button className="bg-[#605BFF] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#4F46E5] transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Relatório Geral
          </button>
        </RoleBasedContent>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">
                Total de Relatórios
              </p>
              <p className="text-2xl font-bold text-gray-800">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-600">23</p>
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
              <p className="text-2xl font-bold text-green-600">133</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <p className="text-gray-600">
          Dashboard detalhado com todos os relatórios do sistema será
          implementado aqui.
        </p>
      </div>
    </div>
  );
}

export default function RelatoriosPage() {
  const { getUserRole } = usePermissions();
  const userRole = getUserRole();

  const renderRoleBasedContent = () => {
    switch (userRole) {
      case UserRole.ALUNO:
        return <RelatoriosAluno />;
      case UserRole.PROFESSOR:
        return <RelatoriosProfessor />;
      case UserRole.COORDENADOR:
        return <RelatoriosCoordenador />;
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
    <ProtectedPage requiredModule="relatorios" requiredAction="view">
      {renderRoleBasedContent()}
    </ProtectedPage>
  );
}
