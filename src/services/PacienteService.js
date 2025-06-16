import api from "./api";

const PacienteService = {
    listarTodos: async () => {
        try {
            const response = await api.get('/api/pacientes');
            return response.data;
        } catch (error) {
            console.error('Erro ao listar pacientes:', error);
            throw new Error('Não foi possível listar os pacientes.');
        }
    },

    listarAtivos: async () => {
        try {
            const response = await api.get('/api/pacientes/ativos');
            return response.data;
        } catch (error) {
            console.error('Erro ao listar pacientes ativos:', error);
            throw new Error('Não foi possível listar os pacientes ativos.');
        }
    },

    listarDesativados: async () => {
        try {
            const response = await api.get('/api/pacientes/desativados');
            return response.data;
        } catch (error) {
            console.error('Erro ao listar pacientes desativados:', error);
            throw new Error('Não foi possível listar os pacientes desativados.');
        }
    },

    buscarPorId: async (id) => {
        try {
            const response = await api.get(`/api/pacientes/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar paciente por ID (${id}):`, error);
            throw new Error('Não foi possível buscar o paciente pelo ID.');
        }
    },

    cadastrar: async (dados) => {
        try {
            const response = await api.post('/api/pacientes', dados);
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar paciente:', error);
            throw new Error('Não foi possível cadastrar o paciente.');
        }
    },

    atualizar: async (id, dados) => {
        try {
            const response = await api.put(`/api/pacientes/${id}`, dados);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar paciente (${id}):`, error);
            throw new Error('Não foi possível atualizar o paciente.');
        }
    },

    desativar: async (id) => {
        try {
            await api.delete(`/api/pacientes/${id}`);
        } catch (error) {
            console.error(`Erro ao desativar paciente (${id}):`, error);
            throw new Error('Não foi possível desativar o paciente.');
        }
    },

    buscarPorEmail: async (email) => {
        try {
            const response = await api.get(`/api/pacientes/email/${email}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar paciente por email (${email}):`, error);
            throw new Error('Não foi possível buscar o paciente pelo email.');
        }
    },

    buscarPorCpf: async (cpf) => {
        try {
            const response = await api.get(`/api/pacientes/cpf/${cpf}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar paciente por CPF (${cpf}):`, error);
            throw new Error('Não foi possível buscar o paciente pelo CPF.');
        }
    },

    buscarPorNome: async (nome) => {
        try {
            const response = await api.get(`/api/pacientes/nome/${nome}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar pacientes por nome (${nome}):`, error);
            throw new Error('Não foi possível buscar pacientes pelo nome.');
        }
    }
};

export default PacienteService;