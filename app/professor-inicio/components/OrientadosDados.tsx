import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InternshipData {
  nome: string;
  orientador: string;
  concedente: string;
  supervisor: string;
  dataInicio: string;
  dataTermino: string;
  cargaHoraria: string;
  valorBolsa: string;
  auxilioTransporte: string;
  seguro: string;
  tce: string;
}

export default function OrientadosDados() {
  const fields = [
    { key: "nome" as keyof InternshipData, label: "Nome:" },
    { key: "orientador" as keyof InternshipData, label: "Orientador:" },
    { key: "concedente" as keyof InternshipData, label: "Concedente:" },
    { key: "supervisor" as keyof InternshipData, label: "Supervisor:" },
    { key: "dataInicio" as keyof InternshipData, label: "Data de Início:" },
    { key: "dataTermino" as keyof InternshipData, label: "Data de Término:" },
    {
      key: "cargaHoraria" as keyof InternshipData,
      label: "Carga horária semanal:",
    },
    { key: "valorBolsa" as keyof InternshipData, label: "Valor da bolsa:" },
    {
      key: "auxilioTransporte" as keyof InternshipData,
      label: "Auxílio transporte:",
    },
    { key: "seguro" as keyof InternshipData, label: "Seguro:" },
    { key: "tce" as keyof InternshipData, label: "TCE:" },
  ];
  return (
    <section>
      <div className="py-5 px-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] text-gray-500">Campo</TableHead>
              <TableHead className="text-gray-500">Informação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field) => (
              <TableRow key={field.key}>
                <TableCell className="font-medium">{field.label}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
