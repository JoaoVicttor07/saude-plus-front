import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import PatientDashboard from './pages/patient/dashboard';
import AppointmentsList from './pages/patient/appointmentsList';
import AppointmentDetail from './pages/patient/appointmentDetail';
import Calendar from './pages/patient/calendar';
// import ProfileEdit from './pages/patient/profileEdit';
// import ProfileView from './pages/patient/profileView';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/signin" replace />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<PatientDashboard />} />
        <Route path='/appointments' element={<AppointmentsList />} />
        <Route path='/appointment/:id' element={<AppointmentDetail />} />
        <Route path='/calendar' element={<Calendar />} />
        {/* <Route path='/profile/edit' element={<ProfileEdit />} />
        <Route path='/profile' element={<ProfileView />} /> */}
      </Routes>
    </Router>
  );
}

export default App;