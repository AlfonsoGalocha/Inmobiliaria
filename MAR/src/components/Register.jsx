// src/components/Register.jsx

import { Link,useNavigate} from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';

// Estilos
import '../styles/Login.css';

// Componente de registro
const Register = () => {
  const [formData, setFormData] = useState({ // Estado para almacenar los datos del formulario
    username: '',
    email: '',
    password: ''
  });

  // Manejar los cambios en los inputs
  const handleChange = (e) => {
    const { id, value } = e.target; // Se extrae el id y el valor del input
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar el mensaje de error
  const navigate = useNavigate();

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Para evitar que la página se recargue
    try {
      await axios.post('http://localhost:5172/user/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,

      });
      // Redirigir al usuario a la página de inicio de sesión
      navigate('/login');
    } catch (error) {
      console.error('Register error:', error.response ? error.response.data : error.message);
      setErrorMessage(error.response ? error.response.data.message : 'Register error:'); // Se actualiza el estado del mensaje de error
    }
  };
  
  return (
    <>
      <div className="fondoIR"></div>
      <div className="overlay"></div> {/*Este es el overlay que desenfocará el fondo */}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="top">
            <Link to="/" className="back-link">🡨 </Link>
            <h2>Crear Cuenta</h2>
          </div>
          <div className="form-group">
            <input className='input-form' type="text" id="username" placeholder="Usuario" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input className='input-form' type="text" id="email" placeholder="Correo" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input className='input-form' type="password" id="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Muestra el mensaje de error si existe */}

          <Link to="/login" className="register-link">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
          <input type="submit" value="Registrarse" />

        </form>
    </>
  );
}

export default Register;





