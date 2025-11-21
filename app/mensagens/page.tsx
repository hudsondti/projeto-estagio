import CardsMensagens from "./cardsMensagens";

export default function MenssagensPage() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <h1 className="text-black text-[24px] leading-5">Mensagens</h1>
        <div>
          <button className="py-5 px-3 bg-[#605BFF] text-white rounded-tl-sm rounded-bl-sm cursor-pointer hover:opacity-90 transition-opacity">
            Tudo
          </button>
          <button className="py-5 px-3 bg-white text-black cursor-pointer hover:opacity-90 transition-opacity">
            Pendencias
          </button>
          <button className="py-5 px-3 bg-white text-black rounded-tr-sm rounded-br-sm cursor-pointer hover:opacity-90 transition-opacity">
            Comunicados
          </button>
        </div>
      </div>
      <CardsMensagens />
    </section>
  );
}
