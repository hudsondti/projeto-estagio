"use client";

import { useState } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Lock, AlertCircle } from "lucide-react";

export default function CadastroAlunoPage() {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    matricula: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validação do nome
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    // Validação da matrícula
    if (!formData.matricula.trim()) {
      newErrors.matricula = "Matrícula é obrigatória";
    }

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
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    // Validação da confirmação de senha
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "aluno",
        matricula: formData.matricula,
      });
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : "Erro ao criar conta",
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
    <div className="p-8">
      {/* Erro geral */}
      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="text-red-700 text-sm">{errors.general}</span>
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Nome */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nome completo:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-colors ${
                errors.name
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 focus:border-[#605BFF]"
              }`}
              placeholder="Digite seu nome completo"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Campo Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Institucional:
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

        {/* Campo Matricula */}
        <div>
          <label
            htmlFor="matricula"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Matrícula:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="matricula"
              name="matricula"
              value={formData.matricula}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-colors ${
                errors.matricula
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 focus:border-[#605BFF]"
              }`}
              placeholder="Digite seu número de matrícula"
            />
          </div>
          {errors.matricula && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.matricula}
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

        {/* Campo Confirmar Senha */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirmar senha
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-colors ${
                errors.confirmPassword
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 focus:border-[#605BFF]"
              }`}
              placeholder="Confirme sua senha"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Botão Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#605BFF] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#4F46E5] focus:ring-2 focus:ring-[#605BFF] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Criando conta..." : "Criar conta"}
        </button>
      </form>

      {/* Link para login */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="text-[#605BFF] hover:text-[#4F46E5] font-medium transition-colors"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
