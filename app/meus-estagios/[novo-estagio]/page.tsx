import SearchComponent from "@/components/common/SearchComponent";
import DataInternshipPage from "./dataNewInternship";
import InfoNewInternshipPage from "./infoNewInternship";

export default function NewInternshipPage() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h1 className="text-black text-[24px] leading-5">
          Painel de informações
        </h1>
        <SearchComponent />
      </div>
      <div className="flex items-center justify-between">
        <InfoNewInternshipPage />
        <DataInternshipPage />
      </div>
    </section>
  );
}
