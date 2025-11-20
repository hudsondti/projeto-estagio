"use client";

import { useAuth } from "@/src/contexts/AuthContext";
import { usePathname } from "next/navigation";
import Header from "@/src/components/Header/Header";
import ProtectedRoute from "@/src/components/ProtectedRoute";

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  // Páginas que não precisam de autenticação (e não devem mostrar header/sidebar)
  const authPages = ["/login", "/cadastro", "/recuperar-senha"];
  const isAuthPage = authPages.includes(pathname);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      {/* Se for página de autenticação, renderizar sem layout */}
      {isAuthPage || !isAuthenticated ? (
        <>{children}</>
      ) : (
        /* Usuário autenticado - mostrar layout completo com sidebar e header */
        <div className="flex min-h-screen">
          {/* Sidebar com Header */}
          <aside className="w-[280px] bg-white shadow-lg border-r border-gray-200 fixed h-full z-10">
            <div className="p-6">
              <Header />
            </div>
          </aside>

          {/* Conteúdo principal - sempre à direita */}
          <main className="flex-1 ml-[280px] bg-gray-200 min-h-screen p-8">
            {children}
          </main>
        </div>
      )}
    </ProtectedRoute>
  );
}
