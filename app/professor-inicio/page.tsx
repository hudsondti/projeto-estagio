"use client";

import { useAuth } from "@/src/contexts/AuthContext";
import { usePermissions } from "@/src/hooks/usePermissions";
import Image from "next/image";
import { OrientadosCard } from "./components/OrientadosCard";

export default function ProfessorInicioPage() {
  const { user } = useAuth();
  const { hasPermission } = usePermissions();

  if (!user || !hasPermission("alunos", "view_orientados")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Acesso Negado
          </h1>
          <p className="text-gray-600">
            Você não tem permissão para acessar esta página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-black text-[32px] font-bold leading-8 mb-2">
            Bem Vindo <span className="text-blue-600">Hudson</span>!
          </h1>
        </div>
        <Image
          src="/assets/bannerprofessor.png"
          alt="Banner Professor"
          width={1200}
          height={300}
          quality={100}
          priority
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>

      {/* Área de conteúdo principal */}
      {/* <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Meus Estágios</h3>
          <p className="text-gray-600">Visualize seus estágios ativos</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Mensagens</h3>
          <p className="text-gray-600">Novas mensagens e comunicados</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Notificações</h3>
          <p className="text-gray-600">Atualizações importantes</p>
        </div>
      </section> */}

      <div className="py-[100px]">
        <OrientadosCard />
      </div>
    </section>
  );
}
