// src/components/Login.jsx

// Importa los módulos necesarios
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css'; 

// Define el componente funcional
const Login = () => {
  const [formData, setFormData] = useState({ // Estado para almacenar los datos del formulario
    username: '', 
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar el mensaje de error

  const navigate = useNavigate();  // Hook para redirigir a otra página

  const handleSubmit = async (e) => { // Función para manejar el envío del formulario
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5172/user/login', {
        username: formData.username,
        password: formData.password
      }, { withCredentials: true }); 

      console.log(response.data.message); // Muestra el mensaje de éxito
      localStorage.setItem('user', JSON.stringify({ username: formData.username })); // Almacena el usuario en el localStorage

      navigate('/'); // Redirige a la página principal después de iniciar sesión
        
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data.message : error.message);
      setErrorMessage(error.response ? error.response.data.message : 'Login error'); // Actualiza el estado del mensaje de error

    }
  };
  
  // Función para manejar los cambios en los inputs
  const handleChange = (e) => {
    const { id, value } = e.target; // Extrae el id y el valor del input
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
          <Link to="/" className="back-link">🡨</Link>
          <h2>Iniciar Sesión</h2>
        </div>
        <div className="form-group">
          <input className='input-form' placeholder='Usuario' type="text" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input className='input-form' placeholder='Contraseña' type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Muestra el mensaje de error si existe */}
        <Link to="/signup" className="register-link">¿No tienes una cuenta? Regístrate aquí</Link>
        <input type="submit" value="Iniciar Sesión" />
       
      </form>
      </>
  );
};

export default Login;
