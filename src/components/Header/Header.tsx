"use client";
import Link from "next/link";
import { contentHeader } from "./ContentHeader";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Função para extrair e formatar o primeiro nome
  const getFormattedFirstName = () => {
    if (!user?.name.split(" ")[0]) return "Estudante";
    const firstName = user.name.trim().split(" ")[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  };

  return (
    <section className="relative w-[196px] h-screen">
      <header className="pl-[30px] py-[50px] flex flex-col gap-[36px]">
        <div className="flex items-center gap-4">
          <Link href="/inicio" className="flex items-center flex-shrink-0">
            <Image
              src="/assets/logo.svg"
              alt="EngWeb Logo"
              width={80}
              height={40}
              className=""
            />
          </Link>
          <h1 className="text-[#030229] text-[24px] leading-[32px] font-semibold">
            Aluno
          </h1>
        </div>
        <div className="flex flex-col gap-[30px]">
          {contentHeader.map((header, index) => {
            const isActive = pathname === header.href;

            return (
              <div
                className="flex items-center gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:transform group p-2"
                key={index}
              >
                <div
                  className={`transition-all duration-300 ease-in-out group-hover:text-[#0059FF] group-hover:scale-110 ${
                    isActive ? "text-blue-600" : "text-[#030229]"
                  }`}
                >
                  {header.icon}
                </div>
                <Link
                  href={header.href}
                  className={`text-[16px] leading-[24px] group-hover:text-[#0059FF] transition-all duration-300 ease-in-out ${
                    isActive
                      ? "text-blue-600 font-bold"
                      : "text-[#030229] font-semibold"
                  }`}
                >
                  {header.title}
                </Link>
              </div>
            );
          })}
        </div>
      </header>
      <div className="flex items-center gap-5 absolute bottom-[60px] left-[30px]">
        <Image
          src="/assets/aluno.jpeg"
          alt="Foto do usuário"
          width={45}
          height={40}
          quality={100}
          priority
          className="rounded-[12px] object-cover"
        />
        <div className="flex items-center gap-[30px] ">
          <div className="flex flex-col gap-1">
            <h4 className="text-[#000000] text-[24px] leading-5 font-semibold">
              {getFormattedFirstName()}
            </h4>
            <p className="text-[#00000052] text-[16px] leading-5 font-normal">
              Aluno
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="hover:bg-gray-100 p-2 rounded-full transition-colors"
            title="Sair"
          >
            <LogOut className="w-6 h-6 text-[#030229]" />
          </button>
        </div>
      </div>
    </section>
  );
}
