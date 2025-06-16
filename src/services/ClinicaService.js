import api from "./api";

const ClinicaService = {
    buscarPorId: async (id) => {
        try {
            const response = await api.get(`/api/clinica/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar clínica por ID (${id}):`, error);
            throw new Error('Não foi possível buscar a clínica pelo ID.');
        }
    },

    atualizar: async (id, dados) => {
        try {
            const response = await api.put(`/api/clinica/${id}`, dados);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar clínica (${id}):`, error);
            throw new Error('Não foi possível atualizar a clínica.');
        }
    }
};

export default ClinicaService;