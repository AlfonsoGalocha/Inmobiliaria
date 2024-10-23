import '../styles/Login.css'; // Reutilizamos el mismo CSS para coherencia de estilo
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Crear Cuenta</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input type="text" id="username" placeholder="Introduce tu usuario" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="text" id="email" placeholder="Introduce tu correo" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" placeholder="Introduce tu contraseña" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input type="password" id="confirmPassword" placeholder="Confirma tu contraseña" required />
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
