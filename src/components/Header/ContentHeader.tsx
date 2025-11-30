import {
  Bell,
  File,
  Grip,
  MessageSquareDot,
  Users,
  BarChart3,
  Settings,
  GraduationCap,
  UserCheck,
} from "lucide-react";

export const navigationByRole = {
  aluno: [
    {
      icon: <Grip className="w-5 h-5" />,
      title: "Início",
      href: "/aluno/inicio",
    },
    {
      icon: <File className="w-5 h-5" />,
      title: "Meus Estágios",
      href: "/aluno/meus-estagios",
    },
    {
      icon: <MessageSquareDot className="w-5 h-5" />,
      title: "Mensagens",
      href: "/aluno/mensagens",
    },
  ],
  professor: [
    {
      icon: <Grip className="w-5 h-5" />,
      title: "Início",
      href: "/professor/inicio",
    },
    {
      icon: <File className="w-5 h-5" />,
      title: "Meus Estágios",
      href: "/professor/meus-estagios",
    },
    {
      icon: <UserCheck className="w-5 h-5" />,
      title: "Orientandos",
      href: "/professor/orientandos",
    },
    {
      icon: <MessageSquareDot className="w-5 h-5" />,
      title: "Mensagens",
      href: "/professor/mensagens",
    },
  ],
  coordenador: [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Dashboard",
      href: "/cordenador/dashboard",
    },
    {
      icon: <File className="w-5 h-5" />,
      title: "Estágios",
      href: "/cordenador/estagios",
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Professores",
      href: "/cordenador/professores",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Alunos",
      href: "/cordenador/alunos",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Relatórios",
      href: "/cordenador/relatorios",
    },
    {
      icon: <MessageSquareDot className="w-5 h-5" />,
      title: "Mensagens",
      href: "/cordenador/mensagens",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Configurações",
      href: "/cordenador/configuracoes",
    },
  ],
};

// Manter compatibilidade com código existente
export const contentHeader = navigationByRole.aluno;
