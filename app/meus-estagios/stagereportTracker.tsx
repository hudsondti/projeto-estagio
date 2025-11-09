import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BellRing, CalendarDays, CircleCheck, CircleX } from "lucide-react";
export default function StageReportTracker() {
  return (
    <section className="w-[500px] bg-white rounded-[12px] shadow-md relative">
      <div className="py-5 px-6">
        <h1 className="text-black text-[24px] leading-5">
          Prazos e Relatórios
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] text-gray-500 py-4">
                Relatório
              </TableHead>
              <TableHead className="text-gray-500 py-4">
                Data de Entrega
              </TableHead>
              <TableHead className="text-gray-500 py-4">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="py-5">
              <TableCell className="w-[150px] text-gray-500 py-4">
                Relatório 1
              </TableCell>
              <TableCell className="text-gray-500 flex items-center gap-1 py-4">
                <CalendarDays className=" w-4 h-4 mr-1 text-[#4285F4]" />
                01/01/2023
              </TableCell>
              <TableCell className="text-[#605BFF] bg-green-100 rounded-full text-center text-[14px] leading-4 font-bold py-4">
                <CircleCheck className="w-4 h-4 text-green-600 inline-block mr-1.5" />
                Entregue
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[150px] text-gray-500 py-4">
                Relatório 2
              </TableCell>
              <TableCell className="text-gray-500 flex items-center gap-1 py-4">
                <CalendarDays className=" w-4 h-4 mr-1 text-[#4285F4]" />
                01/02/2023
              </TableCell>
              <TableCell className="text-[#605BFF] bg-yellow-100 rounded-full text-center text-[14px] leading-4 font-bold py-4">
                <BellRing className="w-5 h-5 text-[#FEBC2F] inline-block mr-1.5" />
                15 dias
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[150px] text-gray-500 py-4">
                Relatório 2
              </TableCell>
              <TableCell className="text-gray-500 flex items-center gap-1 py-4">
                <CalendarDays className=" w-4 h-4 mr-1 text-[#4285F4]" />
                01/02/2023
              </TableCell>
              <TableCell className="text-[#605BFF] bg-red-100 rounded-full text-center text-[14px] leading-4 font-bold py-4">
                <CircleX className="w-5 h-5 text-[#E71D36] inline-block mr-1.5" />
                Não Enviado
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
