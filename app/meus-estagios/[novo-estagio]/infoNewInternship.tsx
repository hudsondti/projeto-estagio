import Link from "next/link";

export default function InfoNewInternshipPage() {
  return (
    <section className="w-[500px] xl1:w-[500px] bg-white rounded-[12px] shadow-md">
      <div className="flex flex-col gap-6 py-5 px-6">
        <h1 className="text-black text-[24px] leading-5">Criar novo estágio</h1>
        <div className="w-full">
          <h4>Nome:</h4>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="w-full">
            <h4>Data de Início:</h4>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div className="w-full">
            <h4>Data de Término:</h4>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              placeholder="dia/mes/ano"
            />
          </div>
          <div className="w-full">
            <h4>Orientador:</h4>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div className="w-full">
            <h4>Concedente:</h4>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div className="w-full">
            <h4>Supervisor:</h4>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div className="w-full">
            <h4>Carga Horária Semanal:</h4>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div className="w-full">
            <h4>Valor da Bolsa:</h4>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            />
          </div>
          <div className="w-full">
            <h4>Auxílio Transporte:</h4>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 py-5 px-6 w-full">
        <Link
          href="/meus-estagios/novo-estagio"
          className="text-[#605BFF] text-[16px] leading-5 font-semibold bg-white border border-[#605BFF] px-8 py-2 rounded-md"
        >
          Salvar como Rascunho
        </Link>
        <Link
          href="/meus-estagios/novo-estagio"
          className="text-white text-[16px] leading-5 font-semibold bg-[#605BFF] hover:opacity-55 px-8 py-2 rounded-md"
        >
          Criar Novo Estágio
        </Link>
      </div>
    </section>
  );
}
