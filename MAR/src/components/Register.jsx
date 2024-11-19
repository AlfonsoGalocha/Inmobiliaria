import '../styles/Login.css'; // Reutilizamos el mismo CSS para coherencia de estilo
import { Link,useNavigate} from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';

import BackLink from '../../public/static/img/go-back.png' // Importa el componente BackLink'

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
    <>
      <div className="fondoIR"></div>
      <div className="overlay"></div> {/*Este es el overlay que desenfocará el fondo */}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="top">
            <Link to="/" className="back-link"><img src={BackLink} alt="Volver" /> </Link>
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
          <Link to="/login" className="register-link">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
          <input type="submit" value="Registrarse" />

        </form>
    </>
  );
}

export default Register;





