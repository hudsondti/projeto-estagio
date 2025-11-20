"use client";

import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Páginas que não precisam de autenticação
  const publicPages = ["/login", "/cadastro", "/recuperar-senha"];
  const isPublicPage = publicPages.includes(pathname);

  useEffect(() => {
    // Se não está carregando e não está autenticado e não é página pública
    if (!isLoading && !isAuthenticated && !isPublicPage) {
      router.replace("/login");
    }

    // Se está autenticado e está em página pública (exceto recuperar senha)
    if (
      !isLoading &&
      isAuthenticated &&
      (pathname === "/login" || pathname === "/cadastro")
    ) {
      router.replace("/inicio");
    }
  }, [isAuthenticated, isLoading, isPublicPage, router, pathname]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se for página pública, sempre renderizar
  if (isPublicPage) {
    return <>{children}</>;
  }

  // Se não está autenticado em página protegida, não renderizar (redirecionamento já ocorreu)
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Redirecionando...</p>
        </div>
      </div>
    );
  }

  // Usuário autenticado em página protegida - renderizar conteúdo
  return <>{children}</>;
}
