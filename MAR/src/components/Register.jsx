import '../styles/Login.css'; // Reutilizamos el mismo CSS para coherencia de estilo
import { Link,useNavigate} from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';

const Register = () => {
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Manejar los cambios en los inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const navigate = useNavigate();

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    try {
      await axios.post('http://localhost:5172/user/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,

      });

      navigate('/login');
    } catch (error) {
      console.error('Error en el registro:', error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input type="text" id="username" placeholder="Introduce tu usuario" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="text" id="email" placeholder="Introduce tu correo" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" placeholder="Introduce tu contraseña" value={formData.password} onChange={handleChange} required />
          </div>
          <input type="submit" value="Registrarse" />
        </form>
        <Link to="/login" className="register-link">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </div>
    </div>
  );
}

export default Register;





