import api from "./api";

const MedicoService = {
    listarTodos: async () => {
        try {
            const response = await api.get('/medicos');
            return response.data;
        } catch (error) {
            console.error('Erro ao listar médicos:', error);
            throw new Error('Não foi possível listar os médicos.');
        }
    },

    listarAtivos: async () => {
        try {
            const response = await api.get('/medicos/ativos');
            return response.data;
        } catch (error) {
            console.error('Erro ao listar médicos ativos:', error);
            throw new Error('Não foi possível listar os médicos ativos.');
        }
    },

    listarDesativados: async () => {
        try {
            const response = await api.get('/medicos/desativados');
            return response.data;
        } catch (error) {
            console.error('Erro ao listar médicos desativados:', error);
            throw new Error('Não foi possível listar os médicos desativados.');
        }
    },

    buscarPorId: async (id) => {
        try {
            const response = await api.get(`/medicos/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar médico por ID (${id}):`, error);
            throw new Error('Não foi possível buscar o médico pelo ID.');
        }
    },

    cadastrar: async (dados) => {
        try {
            const response = await api.post('/medicos', dados);
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar médico:', error);
            throw new Error('Não foi possível cadastrar o médico.');
        }
    },

    atualizar: async (id, dados) => {
        try {
            const response = await api.put(`/medicos/${id}`, dados);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar médico (${id}):`, error);
            throw new Error('Não foi possível atualizar o médico.');
        }
    },

    desativar: async (id) => {
        try {
            await api.delete(`/api/medicos/${id}`);
        } catch (error) {
            console.error(`Erro ao desativar médico (${id}):`, error);
            throw new Error('Não foi possível desativar o médico.');
        }
    },

    buscarPorCrm: async (crm) => {
        try {
            const response = await api.get(`/medicos/crm/${crm}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar médico por CRM (${crm}):`, error);
            throw new Error('Não foi possível buscar o médico pelo CRM.');
        }
    },

    buscarPorEspecialidade: async (especialidade) => {
        try {
            const response = await api.get(`/medicos/especialidade/${especialidade}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar médicos por especialidade (${especialidade}):`, error);
            throw new Error('Não foi possível buscar médicos pela especialidade.');
        }
    },

    buscarPorNome: async (nome) => {
        try {
            const response = await api.get(`/medicos/nome/${nome}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar médicos por nome (${nome}):`, error);
            throw new Error('Não foi possível buscar médicos pelo nome.');
        }
    }
};

export default MedicoService;