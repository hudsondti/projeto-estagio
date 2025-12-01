"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  AlertCircle,
  RectangleEllipsis,
} from "lucide-react";
import api from "@/src/services/api";

export default function CadastroAlunoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    emailInstitucional: "",
    matricula: "",
    senha: "",
    confirmSenha: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validação do nome
    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = "Nome deve ter pelo menos 2 caracteres";
    }

    // Validação da matrícula
    if (!formData.matricula.trim()) {
      newErrors.matricula = "Matrícula é obrigatória";
    } else if (formData.matricula.trim().length > 11) {
      newErrors.matricula = "Matrícula deve ter no máximo 11 caracteres";
    } else if (formData.matricula.trim().length < 6) {
      newErrors.matricula = "Matrícula deve ter pelo menos 6 caracteres";
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.emailInstitucional.trim()) {
      newErrors.emailInstitucional = "Email é obrigatório";
    } else if (!emailRegex.test(formData.emailInstitucional)) {
      newErrors.emailInstitucional = "Email inválido";
    }

    // Validação da senha
    if (!formData.senha) {
      newErrors.senha = "Senha é obrigatória";
    } else if (formData.senha.length < 6) {
      newErrors.senha = "Senha deve ter pelo menos 6 caracteres";
    }

    // Validação da confirmação de senha
    if (!formData.confirmSenha) {
      newErrors.confirmSenha = "Confirmação de senha é obrigatória";
    } else if (formData.senha !== formData.confirmSenha) {
      newErrors.confirmSenha = "Senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Limitar matrícula a 11 caracteres
    if (name === "matricula" && value.length > 11) {
      return; // Não atualizar se exceder 11 caracteres
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpar erro específico quando o usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Cadastrando aluno", formData);
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/auth/register/aluno", {
        nome: formData.nome,
        emailInstitucional: formData.emailInstitucional,
        matricula: formData.matricula,
        senha: formData.senha,
      });

      console.log("Cadastro realizado com sucesso:", response.data);
      alert("Cadastro realizado com sucesso! Faça login para continuar.");
      window.location.href = "/login";
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      setErrors({
        general: error?.response?.data?.message || "Erro ao criar conta",
      });
    } finally {
      setIsLoading(false);
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
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-colors ${
                errors.nome
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 focus:border-[#605BFF]"
              }`}
              placeholder="Digite seu nome completo"
            />
          </div>
          {errors.nome && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.nome}
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
              name="emailInstitucional"
              value={formData.emailInstitucional}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-colors ${
                errors.emailInstitucional
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 focus:border-[#605BFF]"
              }`}
              placeholder="Digite seu email"
            />
          </div>
          {errors.emailInstitucional && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.emailInstitucional}
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
              <RectangleEllipsis className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="matricula"
              name="matricula"
              value={formData.matricula}
              onChange={handleInputChange}
              maxLength={11}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-colors ${
                errors.matricula
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 focus:border-[#605BFF]"
              }`}
              placeholder="Número da Matrícula (máx. 11 caracteres)"
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
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-colors ${
                errors.senha
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
          {errors.senha && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.senha}
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
              name="confirmSenha"
              value={formData.confirmSenha}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#605BFF] focus:border-transparent transition-colors ${
                errors.confirmSenha
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
          {errors.confirmSenha && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.confirmSenha}
            </p>
          )}
        </div>

        {/* Botão Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer w-full bg-[#605BFF] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#4F46E5] focus:ring-2 focus:ring-[#605BFF] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
