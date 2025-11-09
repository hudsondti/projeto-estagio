import Link from "next/link";
import InternshipData from "./internshipdata";
import StageReportTracker from "./stagereportTracker";
import SearchComponent from "@/components/common/SearchComponent";

export default function InternshipListPage() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h1 className="text-black text-[24px] leading-5">
          Painel de informações
        </h1>
        <SearchComponent />
      </div>
      <div className="flex items-center justify-between xl1:gap-40">
        <InternshipData />
        <StageReportTracker />
      </div>
      <div>
        <Link
          href="/meus-estagios/novo-estagio"
          className="text-white text-[16px] leading-5 font-semibold bg-[#605BFF] px-8 py-2 rounded-md"
        >
          Criar Novo Estágio
        </Link>
      </div>
    </section>
  );
}
