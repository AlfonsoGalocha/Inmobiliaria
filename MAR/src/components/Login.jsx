import '../styles/Login.css'; // Asegúrate de que la ruta sea correcta
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import BackLink from '../../public/static/img/go-back.png'; // Importa el componente BackLink

const Login = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5172/user/login', {
        username: formData.username,
        password: formData.password
      }, { withCredentials: true }); // Importante para que las cookies sean enviadas y recibidas

      console.log(response.data.message); // Muestra el mensaje de éxito
      localStorage.setItem('user', JSON.stringify({ username: formData.username }));

      navigate('/'); // Redirige a la página principal después de iniciar sesión
        
    } catch (error) {
      console.error('Error en el login:', error.response ? error.response.data.message : error.message);
    }
  };
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  return (
      <>
      <div className="fondoIR"></div>
      <div className="overlay"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="top">
          <Link to="/" className="back-link"><img src={BackLink} alt="Volver" /> </Link>
          <h2>Iniciar Sesión</h2>
        </div>
        <div className="form-group">
          <input className='input-form' placeholder='Usuario' type="text" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input className='input-form' placeholder='Contraseña' type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <Link to="/signup" className="register-link">¿No tienes una cuenta? Regístrate aquí</Link>
        <input type="submit" value="Iniciar Sesión" />
       
      </form>
      </>
  );
};

export default Login;
