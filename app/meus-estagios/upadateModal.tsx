import { ThumbsUp } from "lucide-react";
import Link from "next/link";

export default function UpdateModal() {
  return (
    <div className="w-[400px] h-[300px] bg-white rounded-[12px] shadow-md ">
      <div className="flex flex-col gap-6 justify-center items-center py-8">
        <div className="bg-blue-100 rounded-full p-4">
          <ThumbsUp className="w-10 h-10 text-[#605BFF] bg-blue-100 " />
        </div>
        <h1 className="text-black text-[24px] leading-5 w-[200px] text-center">
          Dados atualizados com sucesso!
        </h1>
        <Link
          href="/internshiplist"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Inicio
        </Link>
      </div>
    </div>
  );
}
