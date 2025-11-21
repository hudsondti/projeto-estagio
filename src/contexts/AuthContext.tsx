"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user;

  // Verificar se existe token salvo ao inicializar
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("userData");

        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);

      // SIMULAÇÃO para desenvolvimento - remova quando tiver API real
      // Simular delay da requisição
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validação simples para desenvolvimento
      if (!email || !password) {
        throw new Error("Email e senha são obrigatórios");
      }

      // Simulação de dados de resposta
      const simulatedResponse = {
        token: "dev_token_" + Date.now(),
        user: {
          id: Date.now().toString(),
          name: email.split("@")[0], // Usar parte do email como nome
          email: email,
          role: "student",
        },
      };

      // Salvar token e dados do usuário
      localStorage.setItem("authToken", simulatedResponse.token);
      localStorage.setItem("userData", JSON.stringify(simulatedResponse.user));

      setUser(simulatedResponse.user);
      router.push("/inicio");

      /* CÓDIGO REAL DA API - descomente quando implementar o backend
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();

      // Salvar token e dados do usuário
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));

      setUser(data.user);
      router.push("/inicio");
      */
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      setIsLoading(true);

      // SIMULAÇÃO para desenvolvimento - remova quando tiver API real
      // Simular delay da requisição
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulação de dados de resposta
      const simulatedResponse = {
        token: "dev_token_" + Date.now(),
        user: {
          id: Date.now().toString(),
          name: name,
          email: email,
          role: "student",
        },
      };

      // Salvar token e dados do usuário
      localStorage.setItem("authToken", simulatedResponse.token);
      localStorage.setItem("userData", JSON.stringify(simulatedResponse.user));

      setUser(simulatedResponse.user);
      router.push("/inicio");

      /* CÓDIGO REAL DA API - descomente quando implementar o backend
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar conta");
      }

      const data = await response.json();

      // Após registro bem-sucedido, fazer login automático
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));

      setUser(data.user);
      router.push("/inicio");
      */
    } catch (error) {
      console.error("Erro ao registrar:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
    router.push("/login");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
