// import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import '../styles/Login.css'; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión aquí
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input type="text" id="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" required />
        </div>
        <input type="submit" value="Iniciar Sesión" />
        <Link to="/registro" className="register-link">¿No tienes una cuenta? Regístrate aquí</Link>
      </form>
    </div>
  );
};

export default Login;
