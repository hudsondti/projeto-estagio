"use client";

import { useAuth } from "@/src/contexts/AuthContext";
import { usePermissions } from "@/src/hooks/usePermissions";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import SideBar from "@/src/components/Header/SideBar";
import { logout } from "@/src/services/auth";

interface ProfessorLayoutProps {
  children: React.ReactNode;
}

export default function ProfessorLayout({ children }: ProfessorLayoutProps) {
  // const user = useAuth();
  // const { hasPermission } = usePermissions();
  // const router = useRouter();

  // useEffect(() => {
  //   if (user && !hasPermission("alunos", "view_orientados")) {
  //     router.push("/dashboard");
  //   }
  // }, [user, hasPermission, router]);

  // if (!user || !hasPermission("alunos", "view_orientados")) {
  //   return null;
  // }

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "ROLE_PROFESSOR") {
      logout();
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Inteligente - Detecta automaticamente as rotas /professor/* */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
