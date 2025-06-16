import api from "./api";

const ConsultaService = {
    listarTodas: async () => {
        try {
            const response = await api.get('/api/consultas');
            return response.data;
        } catch (error) {
            console.error('Erro ao listar consultas:', error);
            throw new Error('Não foi possível listar as consultas.');
        }
    },

    buscarPorId: async (id) => {
        try {
            const response = await api.get(`/api/consultas/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar consulta por ID (${id}):`, error);
            throw new Error('Não foi possível buscar a consulta pelo ID.');
        }
    },

    agendar: async (dados) => {
        try {
            const response = await api.post('/api/consultas', dados);
            return response.data;
        } catch (error) {
            console.error('Erro ao agendar consulta:', error);
            throw new Error('Não foi possível agendar a consulta.');
        }
    },

    listarPorMedico: async (idMedico) => {
        try {
            const response = await api.get(`/api/consultas/medico/${idMedico}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao listar consultas por médico (${idMedico}):`, error);
            throw new Error('Não foi possível listar as consultas do médico.');
        }
    },

    listarPorPaciente: async (idPaciente) => {
        try {
            const response = await api.get(`/api/consultas/paciente/${idPaciente}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao listar consultas por paciente (${idPaciente}):`, error);
            throw new Error('Não foi possível listar as consultas do paciente.');
        }
    },

    listarPorStatus: async (status) => {
        try {
            const response = await api.get(`/api/consultas/status/${status}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao listar consultas por status (${status}):`, error);
            throw new Error('Não foi possível listar as consultas pelo status.');
        }
    },

    desmarcar: async (id) => {
        try {
            const response = await api.put(`/api/consultas/${id}/desmarcar`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao desmarcar consulta (${id}):`, error);
            throw new Error('Não foi possível desmarcar a consulta.');
        }
    },

    listarFuturasMedico: async (idMedico) => {
        try {
            const response = await api.get(`/api/consultas/medico/${idMedico}/futuras`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao listar futuras consultas do médico (${idMedico}):`, error);
            throw new Error('Não foi possível listar as futuras consultas do médico.');
        }
    },

    listarFuturasPaciente: async (idPaciente) => {
        try {
            const response = await api.get(`/api/consultas/paciente/${idPaciente}/futuras`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao listar futuras consultas do paciente (${idPaciente}):`, error);
            throw new Error('Não foi possível listar as futuras consultas do paciente.');
        }
    }
};

export default ConsultaService;