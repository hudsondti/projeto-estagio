"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import UpdateModal from "../meus-estagios/upadateModal";
import { useEffect, useState } from "react";

export default function StartPage() {
  const [userName, setUserName] = useState<string>("Usuário");

  // Função para obter o primeiro nome do usuário e capitalizar
  const getFirstName = (fullName: string): string => {
    if (!fullName) return "Usuário";

    const firstName = fullName.trim().split(" ")[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  };

  // Carregar dados do usuário do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const firstName = getFirstName(storedUser);
      setUserName(firstName);
    }
  }, []);

  return (
    <section className="">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-black text-[32px] font-bold leading-8 mb-2">
            Bem Vindo <span className="text-[#605BFF]">{userName}</span>
          </h1>
          {/* <div className="flex items-center justify-between relative">
            <input
              type="text"
              placeholder="Buscar"
              className="w-[230px] p-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10" />
          </div> */}
        </div>
        <Image
          src="/assets/banneraluno.png"
          alt="Banner Aluno"
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
        <UpdateModal />
      </div>
    </section>
  );
}
