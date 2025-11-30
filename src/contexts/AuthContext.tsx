"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

export type UserRole = "aluno" | "professor" | "coordenador";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // Campos específicos por role
  matricula?: string; // Para alunos
  departamento?: string; // Para professores
  siape?: string; // Para professores/coordenadores
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // Determinar role baseado no email de forma mais inteligente
      let userRole: UserRole = "aluno";
      let userName = "";
      let userMatricula = undefined;
      let userDepartamento = undefined;
      let userSiape = undefined;

      if (
        email.toLowerCase().includes("coord") ||
        email.toLowerCase().includes("coordenador")
      ) {
        userRole = "coordenador";
        userName = "Dr. Hudson Xavier";
        userDepartamento = "Coordenação de Estágios";
        userSiape = "1234567";
      } else if (
        email.toLowerCase().includes("prof") ||
        email.toLowerCase().includes("professor")
      ) {
        userRole = "professor";
        userName = "Prof. Hudson Xavier";
        userDepartamento = "Ciência da Computação";
        userSiape = "7654321";
      } else {
        userRole = "aluno";
        userName = "Hudson Xavier";
        userMatricula = "2021001";
      }

      const mockUser: User = {
        id: Date.now().toString(),
        name: userName,
        email,
        role: userRole,
        matricula: userMatricula,
        departamento: userDepartamento,
        siape: userSiape,
      };

      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);

      // Redirecionamento baseado no role
      redirectBasedOnRole(mockUser.role);
    } catch (error) {
      throw new Error("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    try {
      setIsLoading(true);

      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || "aluno",
        matricula: userData.matricula,
        departamento: userData.departamento,
        siape: userData.siape,
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);

      redirectBasedOnRole(newUser.role);
    } catch (error) {
      throw new Error("Erro ao criar conta");
    } finally {
      setIsLoading(false);
    }
  };

  const redirectBasedOnRole = (role: UserRole) => {
    switch (role) {
      case "aluno":
        router.push("/meus-estagios");
        break;
      case "professor":
        router.push("/professor-inicio");
        break;
      case "coordenador":
        router.push("/relatorios");
        break;
      default:
        router.push("/inicio");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return children;

  // return (
  //   <AuthContext.Provider
  //     value={{
  //       user,
  //       login,
  //       register,
  //       logout,
  //       isAuthenticated: !!user,
  //       isLoading,
  //     }}
  //   >
  //     {children}
  //   </AuthContext.Provider>
  // );
}

export function useAuth() {
  const context = useContext(AuthContext);
  // Durante o SSR/prerendering, retorna um contexto seguro
  if (typeof window === 'undefined') {
    return {
      user: null,
      login: async () => {},
      register: async () => {},
      logout: () => {},
      isAuthenticated: false,
      isLoading: true,
    };
  }
  
  // if (context === undefined) {
  //   throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  // }
  return context;
}
