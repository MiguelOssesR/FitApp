import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App
