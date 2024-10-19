import './Login.css';
import "./Footer.css";
import Footer from './Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmar contraseña
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    } else {
      //alert("Contraseña confirmada");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      //alert('Usuario registrado correctamente');
      navigate('/LOGIN');
    } catch (error) {
      console.error('Error al registrarse', error.message);
      alert('Error al registrarse: ' + error.message);
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div>
          <p className="text-center tittle">CREAR NUEVA CUENTA</p>
          <p className="text-center mini">¿Ya tienes una cuenta? <a href="/login">ingresa aquí</a></p>
        </div>
        
        <div className="border p-4 bg-white rounded shadow" style={{ width: '35%', height: '350px' }}>

          <form onSubmit={handleRegister}>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className='bx bx-user'></i></span>
              </div>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Correo electrónico" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className='bx bx-lock'></i></span>
              </div>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Contraseña" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className='bx bxs-lock-alt'></i></span>
              </div>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Confirmar contraseña" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
            </div>

            <div className="d-flex justify-content-center mt-3">
              <button type="submit" className="btn btn-primary">Registrarse <i className='bx bxs-user-plus'></i></button>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default SignUp;
