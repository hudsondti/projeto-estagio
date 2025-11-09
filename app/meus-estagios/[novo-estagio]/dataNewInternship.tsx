"use client";
import UploadImage from "./uploadImage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DataInternshipPage() {
  return (
    <section className="w-[500px] xl1:w-[500px] bg-white rounded-[12px] shadow-md">
      <div className="py-5 px-6">
        <div className="flex flex-col gap-6 ">
          <h1 className="text-black text-[24px] leading-5">
            Adicione sua foto:
          </h1>
          <UploadImage />
        </div>
        <div className="mt-3">
          <h1 className="text-black text-[24px] leading-5">
            Documentos Enviados:
          </h1>
          <Table className="mt-5">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] text-gray-500 py-4">
                  Documentos:
                </TableHead>
                <TableHead className="text-gray-500 py-4">Situação:</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="py-5">
                <TableCell className="w-[150px] text-[#0068DD] py-4">
                  Seguro (retirar)
                </TableCell>
                <TableCell className="text-black flex items-center gap-1 py-4">
                  Enviado: <span className="text-gray-500">Ainda não</span>
                </TableCell>
              </TableRow>
              <TableRow className="py-5">
                <TableCell className="w-[150px] text-[#0068DD] py-4">
                  TCE
                </TableCell>
                <TableCell className="text-black flex items-center gap-1 py-4">
                  Enviado: {""}
                  <span className="text-gray-500">Ainda não</span>
                </TableCell>
              </TableRow>
              <TableRow className="py-5">
                <TableCell className="w-[150px] text-[#0068DD] py-4">
                  Plano de Atividade
                </TableCell>
                <TableCell className="text-black flex items-center gap-1 py-4">
                  Enviado: <span className="text-gray-500">Ainda não</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
