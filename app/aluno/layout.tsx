"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SideBar from "@/src/components/Header/SideBar";
import { logout } from "@/src/services/auth";

interface AlunoLayoutProps {
  children: React.ReactNode;
}

export default function AlunoLayout({ children }: AlunoLayoutProps) {
  // const { user } = useAuth();
  // const { hasPermission } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "ROLE_ALUNO") {
      logout();
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="flex h-screen shadow-lg">
      {/* Sidebar Inteligente - Detecta automaticamente as rotas /aluno/* */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
