import api from "./api";

const EspecialidadeService = {
    listarTodos: async () => {
        try {
            const response = await api.get('/especialidades');
            return response.data;
        } catch (error) {
            console.error('Erro ao listar especialidades:', error);
            throw new Error('Não foi possível listar as especialidades.');
        }
    },

    buscarPorId: async (id) => {
        try {
            const response = await api.get(`/especialidades/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar especialidade por ID (${id}):`, error);
            throw new Error('Não foi possível buscar a especialidade pelo ID.');
        }
    },

    cadastrar: async (dados) => {
        try {
            const response = await api.post('/especialidades', dados);
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar especialidade:', error);
            throw new Error('Não foi possível cadastrar a especialidade.');
        }
    }
};

export default EspecialidadeService;