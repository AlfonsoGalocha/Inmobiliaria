// import React from 'react';
import '../styles/Login.css'; // Asegúrate de que la ruta sea correcta
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

      // Puedes almacenar la respuesta o el estado
      console.log(response.data.message); // Muestra el mensaje de éxito
      // Puedes guardar información adicional si es necesario
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
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input type="text" id="username"value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <input type="submit" value="Iniciar Sesión" />
        <Link to="/signup" className="register-link">¿No tienes una cuenta? Regístrate aquí</Link>
      </form>
    </div>
  );
};

export default Login;


