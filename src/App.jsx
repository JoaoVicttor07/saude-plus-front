import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';

// Paciente
import PatientDashboard from './pages/patient/dashboard';
import AppointmentsList from './pages/patient/appointmentsList';
import AppointmentDetail from './pages/patient/appointmentDetail';
import Calendar from './pages/patient/calendar';
import ProfileEdit from './pages/patient/profileEdit';
import ProfileView from './pages/patient/profileView';

// Médico
import DoctorDashboard from './pages/doctor/dashboard';
import DoctorProfile from "./pages/doctor/profile";

// Admin
import AdminDashboard from './pages/admin/dashboard';
import AdminPatients from './pages/admin/patients';
import AdminPatientDetail from './pages/admin/patients/PatientDetail';
import AdminDoctors from './pages/admin/doctors';
import AdminDoctorDetail from './pages/admin/doctors/DoctorDetail';
import AdminAppointments from './pages/admin/appointments';
// import AdminAppointmentDetail from './pages/admin/appointments/AppointmentDetail';
// import AdminAppointmentCreate from './pages/admin/appointments/AppointmentCreate';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path='/' element={<Navigate to="/signin" replace />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />

        {/* Rotas Paciente */}
        <Route path='/dashboard' element={<PatientDashboard />} />
        <Route path='/appointments' element={<AppointmentsList />} />
        <Route path='/appointment/:id' element={<AppointmentDetail />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/profile/edit' element={<ProfileEdit />} />
        <Route path='/profile' element={<ProfileView />} />

        {/* Rotas Médico */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />

        {/* Rotas Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/patients" element={<AdminPatients />} />
        <Route path="/admin/patients/:id" element={<AdminPatientDetail />} />
        <Route path="/admin/doctors" element={<AdminDoctors />} />
        <Route path="/admin/doctors/:id" element={<AdminDoctorDetail />} />
        <Route path="/admin/appointments" element={<AdminAppointments />} />
        {/* <Route path="/admin/appointments/:id" element={<AdminAppointmentDetail />} />
        <Route path="/admin/appointments/create" element={<AdminAppointmentCreate />} /> */}
      </Routes>
    </Router>
  );
}

export default App;