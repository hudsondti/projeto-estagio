"use client";

import { usePermissions } from "@/src/hooks/usePermissions";
import { useAuth } from "@/src/contexts/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  FileText,
  Users,
  GraduationCap,
  MessageCircle,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { UserRole } from "@/src/types/roles";

const iconMap = {
  Home,
  Briefcase,
  FileText,
  Users,
  GraduationCap,
  MessageCircle,
  User,
  Settings,
};

export function Sidebar() {
  const { user, logout } = useAuth();
  const { getVisibleMenuItems, getUserRole } = usePermissions();
  const pathname = usePathname();

  const menuItems = getVisibleMenuItems();
  const userRole = getUserRole();

  const getRoleDisplayName = (role: UserRole | null): string => {
    switch (role) {
      case UserRole.ALUNO:
        return "Aluno";
      case UserRole.PROFESSOR:
        return "Professor";
      case UserRole.COORDENADOR:
        return "Coordenador";
      default:
        return "Usuário";
    }
  };

  const getRoleBadgeColor = (role: UserRole | null): string => {
    switch (role) {
      case UserRole.ALUNO:
        return "bg-blue-100 text-blue-800";
      case UserRole.PROFESSOR:
        return "bg-green-100 text-green-800";
      case UserRole.COORDENADOR:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b bg-gradient-to-r from-[#605BFF] to-[#4F46E5]">
        <h2 className="text-xl font-bold text-white">Sistema de Estágios</h2>
        <div className="mt-3">
          <p className="text-white/90 text-sm font-medium">{user?.name}</p>
          <span
            className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(
              userRole
            )}`}
          >
            {getRoleDisplayName(userRole)}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6">
        {menuItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = pathname.startsWith(item.path);

          return (
            <Link
              key={item.id}
              href={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-[#605BFF] hover:text-white transition-colors group ${
                isActive
                  ? "bg-[#605BFF] text-white border-r-4 border-[#4F46E5]"
                  : ""
              }`}
            >
              <Icon
                className={`w-5 h-5 mr-3 ${
                  isActive
                    ? "text-white"
                    : "text-gray-500 group-hover:text-white"
                }`}
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <button
          onClick={() => logout()}
          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
}
