import api from "./api";

// Interfaces para tipagem
export interface Internship {
  id?: number;
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "ACTIVE" | "COMPLETED" | "PENDING";
}

export interface InternshipResponse {
  content: Internship[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Serviços da API de estágios
export const internshipService = {
  // Buscar todos os estágios
  getAll: async (
    page: number = 0,
    size: number = 10
  ): Promise<InternshipResponse> => {
    try {
      const response = await api.get(`/internships?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar estágios:", error);
      throw error;
    }
  },

  // Buscar estágio por ID
  getById: async (id: number): Promise<Internship> => {
    try {
      const response = await api.get(`/internships/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar estágio ${id}:`, error);
      throw error;
    }
  },

  // Criar novo estágio
  create: async (internship: Omit<Internship, "id">): Promise<Internship> => {
    try {
      const response = await api.post("/internships", internship);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar estágio:", error);
      throw error;
    }
  },

  // Atualizar estágio
  update: async (
    id: number,
    internship: Partial<Internship>
  ): Promise<Internship> => {
    try {
      const response = await api.put(`/internships/${id}`, internship);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar estágio ${id}:`, error);
      throw error;
    }
  },

  // Deletar estágio
  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/internships/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar estágio ${id}:`, error);
      throw error;
    }
  },

  // Buscar estágios por status
  getByStatus: async (status: string): Promise<Internship[]> => {
    try {
      const response = await api.get(`/internships/status/${status}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar estágios com status ${status}:`, error);
      throw error;
    }
  },
};
