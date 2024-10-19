import './Login.css';
import "./Footer.css";
import Logo from './assets/logo.png';
import Footer from './Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Sesión autenticada correctamente');
      navigate('/Dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión', error.message);
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div>
          <p className="text-center tittle">HEALTY LIFESTYLE</p>
          <p className="text-center mini">Registro y seguimiento de tus objetivos</p>
        </div>

        <div className="border p-4 bg-white rounded shadow" style={{ width: '35%', height: '500px' }}>
          <div className="text-center mb-4">
            <img src={Logo} alt="MyFitnessApp Logo" className="img-fluid" style={{ maxHeight: '200px' }} />
          </div>

          <form onSubmit={handleLogin}>
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

            <small className="form-text text-muted mb-3">
              Recuerda no compartir tu contraseña con nadie.
            </small>

            <div className="d-flex justify-content-center mt-3">
              <button type="submit" className="btn btn-primary">
                Iniciar Sesión <i className='bx bxs-user-check'></i>
              </button>
            </div>
          </form>

          <div className="d-flex justify-content-center mt-3">
            <p>¿No tienes cuenta? Crea una <a href="/signup">aquí</a></p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Login;