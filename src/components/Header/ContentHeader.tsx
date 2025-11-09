import { Bell, File, Grip, MessageSquareDot } from "lucide-react";

export const contentHeader = [
  {
    icon: <Grip className="w-5 h-5" />,
    title: "Início",
    href: "/inicio",
  },
  {
    icon: <File className="w-5 h-5" />,
    title: "Meus Estágios",
    href: "/meus-estagios",
  },
  {
    icon: <MessageSquareDot className="w-5 h-5" />,
    title: "Mensagens",
    href: "/mensagens",
  },
  {
    icon: <Bell className="w-5 h-5" />,
    title: "Notificações",
    href: "/notificacoes",
  },
];
