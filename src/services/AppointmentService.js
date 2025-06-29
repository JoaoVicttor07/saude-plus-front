import api from './api';

const AppointmentService = {
    getSpecialties: async () => {
        try {
            const response = await api.get('/especialidades'); // Endpoint para listar todas as especialidades
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar especialidades:", error.response?.data || error.message);
            throw error; // Re-throw para ser tratado no componente
        }
    },

    createAppointment: async (appointmentData) => {
        try {
            const response = await api.post('/consultas', appointmentData);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar consulta:", error.response?.data || error.message);
            throw error; // Re-throw para ser tratado no componente
        }
    },

    getFutureAppointmentsByPatient: async (patientId) => {
        try {
            const response = await api.get(`/consultas/paciente/${patientId}/futuras`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar agendamentos futuros para o paciente ${patientId}:`, error.response?.data || error.message);
            throw error;
        }
    },

    getAppointmentById: async (appointmentId) => {
        try {
            const response = await api.get(`/consultas/${appointmentId}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar consulta pelo ID ${appointmentId}:`, error.response?.data || error.message);
            throw error;
        }
    },

    unmarkAppointmentByPatient: async (appointmentId) => {
        try {
            const response = await api.put(`/consultas/${appointmentId}/desmarcar`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao desmarcar consulta ${appointmentId}:`, error.response?.data || error.message);
            throw error;
        }
    },

    getAppointmentsByStatusAndPatient: async (patientId, status) => {
        try {
            const response = await api.get(`/consultas/paciente/${patientId}/status/${status}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar consultas por status ${status} para o paciente ${patientId}:`, error.response?.data || error.message);
            throw error;
        }
    },

    getAllAppointmentsByPatient: async (patientId) => {
        try {
            const response = await api.get(`/consultas/paciente/${patientId}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar todas as consultas para o paciente ${patientId}:`, error.response?.data || error.message);
            throw error;
        }
    },
};

export default AppointmentService;