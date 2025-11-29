export enum UserRole {
  ALUNO = "aluno",
  PROFESSOR = "professor",
  COORDENADOR = "coordenador",
}

export interface Permission {
  module: string;
  actions: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  matricula?: string; // Para alunos
  departamento?: string; // Para professores e coordenadores
}

export interface MenuItemConfig {
  id: string;
  label: string;
  icon: string;
  path: string;
  roles?: UserRole[];
  permissions?: {
    module: string;
    action: string;
  };
}

export interface RolePermissions {
  [key: string]: {
    [module: string]: string[];
  };
}
