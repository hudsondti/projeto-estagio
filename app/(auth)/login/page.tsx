"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import api from "@/src/services/api";

export default function LoginPage() {
  // const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Validação da senha
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Tentando fazer login com:", formData);
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        emailInstitucional: formData.email,
        password: formData.password,
      });

      console.log("response", response.data);

      const { name, token, role, profileId } = response.data;
      console.log("Login bem-sucedido:", response.data);

      // Armazenar token e dados do usuário no localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", name);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", profileId);

      if (role && role === "ROLE_ALUNO")
        return (window.location.href = "/aluno/inicio");
      if (role && role === "ROLE_PROFESSOR")
        return (window.location.href = "/professor/inicio");
      if (role && role === "ROLE_COORDENADOR")
        return (window.location.href = "/coordenador/inicio");
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : "Erro ao fazer login",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpar erro específico quando o usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="p-8 items-center justify-center max-w-md mx-auto">
      {/* Erro geral */}
      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="text-red-700 text-sm">{errors.general}</span>
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-colors ${
                errors.email
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 focus:border-[#605BFF]"
              }`}
              placeholder="Digite seu email"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Campo Senha */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Senha
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-colors ${
                errors.password
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 focus:border-[#605BFF]"
              }`}
              placeholder="Digite sua senha"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Link "Esqueci minha senha" */}
        {/* <div className="text-right">
          <Link
            href="/recuperar-senha"
            className="text-sm text-[#605BFF] hover:text-[#4F46E5] transition-colors"
          >
            Esqueci minha senha
          </Link>
        </div> */}

        {/* Botão Submit */}
        <button
          type="submit"
          // disabled={isLoading}
          className="cursor-pointer w-full bg-[#605BFF] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#4F46E5] focus:ring-2 focus:ring-[#605BFF] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Entrar
        </button>
      </form>

      {/* Link para cadastro */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Não tem uma conta?{" "}
          <Link
            href="/cadastro"
            className="text-[#605BFF] hover:text-[#4F46E5] font-medium transition-colors"
          >
            Criar conta
          </Link>
        </p>
      </div>

      {/* <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500 bg-white">ou</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Login de demonstração (opcional) 
      <button
        type="button"
        onClick={() => {
          setFormData({
            email: "demo@exemplo.com",
            password: "123456",
          });
        }}
        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
      >
        Usar conta de demonstração
      </button> */}
    </div>
  );
}
