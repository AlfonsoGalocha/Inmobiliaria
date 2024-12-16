// src/components/Footer.jsx

// Componente Footer para la sección de pie de página
const Footer = () => {

  return(
    <footer className="footer" id="footer">
        <div className="contact-section">
        <p id="contact">Contáctanos</p>
        <p>mar.soporte@gmail.com</p>
        <p>+34 642 773 127</p>
        </div>
        <div className="social-links">
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src="../../public/static/img/instagram_logo.webp" alt="Instagram" />
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <img src="../../public/static/img/linkedin_logo.webp" alt="LinkedIn" />
        </a>
        <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
            <img
            src="../../public/static/img/tiktok_logo.png"
            alt="TikTok"
            className="tiktok_logo"
            />
        </a>
        </div>
        <div className="footer-links">
        <a href="/acerca-de">Acerca de</a>
        <a href="/politica-de-privacidad">Política de privacidad</a>
        <a href="/aviso-legal">Aviso legal</a>
        </div>
    </footer>
  )
}

export default Footer