import { useState, useEffect } from "react";
import {
  internshipService,
  Internship,
  InternshipResponse,
} from "@/src/services/internshipService";

export const useInternships = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  });

  const fetchInternships = async (page: number = 0, size: number = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response: InternshipResponse = await internshipService.getAll(
        page,
        size
      );
      setInternships(response.content);
      setPagination({
        page: response.number,
        size: response.size,
        totalPages: response.totalPages,
        totalElements: response.totalElements,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar estágios"
      );
      console.error("Erro ao carregar estágios:", err);
    } finally {
      setLoading(false);
    }
  };

  const createInternship = async (internship: Omit<Internship, "id">) => {
    try {
      setLoading(true);
      setError(null);
      const newInternship = await internshipService.create(internship);
      setInternships((prev) => [...prev, newInternship]);
      return newInternship;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar estágio");
      console.error("Erro ao criar estágio:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateInternship = async (
    id: number,
    internship: Partial<Internship>
  ) => {
    try {
      setLoading(true);
      setError(null);
      const updatedInternship = await internshipService.update(id, internship);
      setInternships((prev) =>
        prev.map((item) => (item.id === id ? updatedInternship : item))
      );
      return updatedInternship;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao atualizar estágio"
      );
      console.error("Erro ao atualizar estágio:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteInternship = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await internshipService.delete(id);
      setInternships((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao deletar estágio");
      console.error("Erro ao deletar estágio:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getInternshipById = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const internship = await internshipService.getById(id);
      return internship;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar estágio");
      console.error("Erro ao buscar estágio:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getInternshipsByStatus = async (status: string) => {
    try {
      setLoading(true);
      setError(null);
      const filteredInternships = await internshipService.getByStatus(status);
      setInternships(filteredInternships);
      return filteredInternships;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao buscar estágios por status"
      );
      console.error("Erro ao buscar estágios por status:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  return {
    internships,
    loading,
    error,
    pagination,
    fetchInternships,
    createInternship,
    updateInternship,
    deleteInternship,
    getInternshipById,
    getInternshipsByStatus,
    refetch: () => fetchInternships(pagination.page, pagination.size),
  };
};

export const useInternship = (id?: number) => {
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInternship = async (internshipId: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await internshipService.getById(internshipId);
      setInternship(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar estágio");
      console.error("Erro ao carregar estágio:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInternship(id);
    }
  }, [id]);

  return {
    internship,
    loading,
    error,
    fetchInternship,
    refetch: () => (id ? fetchInternship(id) : Promise.resolve()),
  };
};
