export default function About() {
  return (
    <div className="page-container animate-fade-in">
      <div className="about-wrapper">

        {/* App identity */}
        <div className="about-hero glass-card">
          <div className="about-logo">⏱</div>
          <h1 className="about-app-name">Nexia SMED</h1>
          <span className="badge badge-accent about-badge">v1.0.0</span>
          <p className="about-description">
            Plataforma profesional de reducción de tiempos de cambio basada en la metodología{' '}
            <strong>SMED (Single-Minute Exchange of Die)</strong>. Captura y analiza videos de
            cambio, clasifica operaciones internas y externas, optimiza actividades y genera
            estándares documentados para lograr cambios más rápidos y eficientes.
          </p>
        </div>

        {/* Developer */}
        <div className="about-section glass-card">
          <p className="about-section-label">Desarrollado por</p>
          <p className="about-company-name">NexIA Soluciones</p>
          <a
            href="https://www.nexiasoluciones.com.mx"
            target="_blank"
            rel="noopener noreferrer"
            className="about-website-link"
          >
            www.nexiasoluciones.com.mx ↗
          </a>
        </div>

        {/* Contact */}
        <div className="about-section glass-card">
          <p className="about-section-label">¿Te interesa esta herramienta?</p>
          <p className="about-contact-desc">
            Escríbenos y con gusto te asesoramos sobre cómo NexIA puede
            impulsar la reducción de tiempos de cambio en tu organización.
          </p>
          <a
            href="mailto:soporte@nexiasoluciones.com.mx?subject=Información sobre Nexia SMED"
            className="btn btn-primary about-contact-btn"
          >
            ✉️ Contactar a NexIA
          </a>
        </div>

        {/* Footer */}
        <p className="about-footer">
          © {new Date().getFullYear()} NexIA Soluciones · Todos los derechos reservados
        </p>

      </div>
    </div>
  );
}
