"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useAuth } from "@/src/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RoleBasedContent } from "@/src/components/common/RoleBasedContent";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#605BFF] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

interface ProtectedPageProps {
  children: React.ReactNode;
  requiredModule: string;
  requiredAction?: string;
  fallback?: React.ReactNode;
}

export function ProtectedPage({
  children,
  requiredModule,
  requiredAction = "view",
  fallback = (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Acesso Negado</h2>
      <p className="text-gray-600">
        Você não tem permissão para acessar esta página.
      </p>
    </div>
  ),
}: ProtectedPageProps) {
  return (
    <Layout>
      <RoleBasedContent
        module={requiredModule}
        action={requiredAction}
        fallback={fallback}
      >
        {children}
      </RoleBasedContent>
    </Layout>
  );
}
