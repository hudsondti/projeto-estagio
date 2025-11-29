"use client";

import { useAuth } from "@/src/contexts/AuthContext";
import { usePermissions } from "@/src/hooks/usePermissions";
import { Bell, Search, Settings } from "lucide-react";
import { UserRole } from "@/src/types/roles";

export function Header() {
  const { user } = useAuth();
  const { getUserRole } = usePermissions();

  const userRole = getUserRole();

  const getWelcomeMessage = (): string => {
    const hour = new Date().getHours();
    let greeting = "Bom dia";

    if (hour >= 12 && hour < 18) greeting = "Boa tarde";
    else if (hour >= 18) greeting = "Boa noite";

    switch (userRole) {
      case UserRole.PROFESSOR:
        return `${greeting}, Professor(a) ${user?.name?.split(" ")[0]}`;
      case UserRole.COORDENADOR:
        return `${greeting}, Coordenador(a) ${user?.name?.split(" ")[0]}`;
      case UserRole.ALUNO:
      default:
        return `${greeting}, ${user?.name?.split(" ")[0]}`;
    }
  };

  return (
    <header className="bg-white shadow-sm border-b h-16 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          {getWelcomeMessage()}
        </h1>
        <p className="text-sm text-gray-600">
          Gerencie seus estágios de forma eficiente
        </p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent w-64"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-[#605BFF] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Settings */}
        <button className="p-2 text-gray-600 hover:text-[#605BFF] transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 bg-[#605BFF] rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  );
}
