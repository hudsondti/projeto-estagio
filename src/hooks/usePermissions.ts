"use client";

import { useAuth } from "@/src/contexts/AuthContext";
import { UserRole, MenuItemConfig } from "@/src/types/roles";

export const usePermissions = () => {
  const { user } = useAuth();

  const permissions = {
    [UserRole.ALUNO]: {
      dashboard: ["view"],
      estagios: ["view", "create", "edit", "view_own"],
      relatorios: ["view", "create", "edit", "view_own"],
      mensagens: ["view", "send", "receive"],
      professores: ["view_list"],
    },
    [UserRole.PROFESSOR]: {
      dashboard: ["view"],
      estagios: ["view", "approve", "reject", "view_orientados"],
      relatorios: ["view", "approve", "reject", "view_orientados"],
      mensagens: ["view", "send", "receive"],
      alunos: ["view_orientados"],
    },
    [UserRole.COORDENADOR]: {
      dashboard: ["view_all"],
      estagios: ["view_all", "approve", "reject", "manage"],
      relatorios: ["view_all", "approve", "reject", "manage"],
      mensagens: ["view_all", "send", "receive"],
      professores: ["view", "create", "edit", "delete", "manage"],
      alunos: ["view_all", "manage"],
    },
  };

  const hasPermission = (module: string, action: string): boolean => {
    if (!user?.role) return false;
    const userPermissions = permissions[user.role as UserRole];
    return userPermissions[module]?.includes(action) || false;
  };

  const getVisibleMenuItems = (): MenuItemConfig[] => {
    if (!user?.role) return [];

    const baseMenuItems: MenuItemConfig[] = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "Home",
        path: "/dashboard",
        permissions: { module: "dashboard", action: "view" },
      },
      {
        id: "estagios",
        label: "Estágios",
        icon: "Briefcase",
        path: "/estagios",
        permissions: { module: "estagios", action: "view" },
      },
      {
        id: "relatorios",
        label: "Relatórios",
        icon: "FileText",
        path: "/relatorios",
        permissions: { module: "relatorios", action: "view" },
      },
      {
        id: "mensagens",
        label: "Mensagens",
        icon: "MessageCircle",
        path: "/mensagens",
        permissions: { module: "mensagens", action: "view" },
      },
    ];

    // Adiciona menu específico para alunos
    if (user.role === UserRole.ALUNO) {
      baseMenuItems.push({
        id: "meus-estagios",
        label: "Meus Estágios",
        icon: "User",
        path: "/meus-estagios",
        permissions: { module: "estagios", action: "view_own" },
      });
    }

    // Adiciona menu de professores para coordenadores
    if (
      hasPermission("professores", "view") ||
      hasPermission("professores", "create")
    ) {
      baseMenuItems.push({
        id: "professores",
        label: "Professores",
        icon: "Users",
        path: "/professores",
        permissions: { module: "professores", action: "view" },
      });
    }

    // Adiciona menu de alunos para professores e coordenadores
    if (
      hasPermission("alunos", "view_all") ||
      hasPermission("alunos", "view_orientados")
    ) {
      baseMenuItems.push({
        id: "alunos",
        label: "Alunos",
        icon: "GraduationCap",
        path: "/alunos",
        permissions: { module: "alunos", action: "view_orientados" },
      });
    }

    // Filtra itens baseado nas permissões
    return baseMenuItems.filter((item) => {
      if (!item.permissions) return true;
      return hasPermission(item.permissions.module, item.permissions.action);
    });
  };

  const canAccessPage = (module: string, action: string = "view"): boolean => {
    return hasPermission(module, action);
  };

  const getUserRole = (): UserRole | null => {
    return (user?.role as UserRole) || null;
  };

  const isRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  return {
    hasPermission,
    getVisibleMenuItems,
    canAccessPage,
    getUserRole,
    isRole,
    permissions,
  };
};
