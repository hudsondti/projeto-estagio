"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/contexts/AuthContext";

export function DevToolsIndicator() {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Só mostrar em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      setIsVisible(true);

      // Auto-hide após 5 segundos
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Não renderizar em produção ou se não há usuário
  if (process.env.NODE_ENV !== "development" || !user || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-3 rounded-lg shadow-lg z-50 max-w-xs">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        <strong>Dev Mode</strong>
      </div>
      <div className="space-y-1">
        <div>
          📝 <strong>Teste de Roles:</strong>
        </div>
        <div>Ctrl + Alt + 1 → Aluno</div>
        <div>Ctrl + Alt + 2 → Professor</div>
        <div>Ctrl + Alt + 3 → Coordenador</div>
        <div className="text-green-400 mt-2">
          Atual: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </div>
      </div>
    </div>
  );
}
