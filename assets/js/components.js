/* ============================================================
   BS Builder — Component Registry
   ============================================================ */

const COMPONENTS = [
  {
    category: 'Layout',
    icon: 'bi-grid',
    items: [
      {
        id: 'container',
        label: 'Container',
        icon: 'bi-layout-three-columns',
        tag: 'div',
        defaultClasses: 'container py-3',
        isContainer: true,
      },
      {
        id: 'container-fluid',
        label: 'Container Fluid',
        icon: 'bi-fullscreen',
        tag: 'div',
        defaultClasses: 'container-fluid py-3',
        isContainer: true,
      },
      {
        id: 'section',
        label: 'Section',
        icon: 'bi-layout-text-window',
        tag: 'section',
        defaultClasses: 'py-5',
        isContainer: true,
      },
      {
        id: 'row',
        label: 'Row',
        icon: 'bi-layout-three-columns',
        tag: 'div',
        defaultClasses: 'row g-3',
        isContainer: true,
      },
      {
        id: 'col',
        label: 'Col Auto',
        icon: 'bi-layout-sidebar',
        tag: 'div',
        defaultClasses: 'col',
        isContainer: true,
      },
      {
        id: 'col-12',
        label: 'Col 12',
        icon: 'bi-layout-sidebar',
        tag: 'div',
        defaultClasses: 'col-12',
        isContainer: true,
      },
      {
        id: 'col-6',
        label: 'Col 6',
        icon: 'bi-layout-sidebar',
        tag: 'div',
        defaultClasses: 'col-12 col-md-6',
        isContainer: true,
      },
      {
        id: 'col-4',
        label: 'Col 4',
        icon: 'bi-layout-sidebar',
        tag: 'div',
        defaultClasses: 'col-12 col-md-4',
        isContainer: true,
      },
      {
        id: 'col-3',
        label: 'Col 3',
        icon: 'bi-layout-sidebar',
        tag: 'div',
        defaultClasses: 'col-12 col-md-3',
        isContainer: true,
      },
      {
        id: 'div',
        label: 'Div',
        icon: 'bi-square',
        tag: 'div',
        defaultClasses: 'p-3',
        isContainer: true,
      },
    ]
  },
  {
    category: 'Secciones',
    icon: 'bi-layout-text-window-reverse',
    items: [
      {
        id: 'hero',
        label: 'Hero',
        icon: 'bi-stars',
        isPrebuilt: true,
        template: `<section class="py-5 text-center" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 400px; display:flex; align-items:center;">
  <div class="container">
    <h1 class="display-4 fw-bold mb-3">Título Principal</h1>
    <p class="lead mb-4">Descripción atractiva de tu producto o servicio.<br>Convierte visitantes en clientes.</p>
    <div class="d-flex gap-3 justify-content-center">
      <a href="#" class="btn btn-light btn-lg px-4">Comenzar ahora</a>
      <a href="#" class="btn btn-outline-light btn-lg px-4">Saber más</a>
    </div>
  </div>
</section>`,
      },
      {
        id: 'features-3',
        label: 'Features 3col',
        icon: 'bi-grid-3x2-gap',
        isPrebuilt: true,
        template: `<section class="py-5 bg-light">
  <div class="container">
    <h2 class="text-center mb-5">Nuestras Características</h2>
    <div class="row g-4">
      <div class="col-md-4 text-center">
        <div class="p-4">
          <i class="bi bi-lightning-charge-fill display-4 text-primary mb-3 d-block"></i>
          <h4>Rápido</h4>
          <p class="text-muted">Optimizado para máximo rendimiento y velocidad.</p>
        </div>
      </div>
      <div class="col-md-4 text-center">
        <div class="p-4">
          <i class="bi bi-shield-check-fill display-4 text-success mb-3 d-block"></i>
          <h4>Seguro</h4>
          <p class="text-muted">Protección avanzada para tus datos.</p>
        </div>
      </div>
      <div class="col-md-4 text-center">
        <div class="p-4">
          <i class="bi bi-heart-fill display-4 text-danger mb-3 d-block"></i>
          <h4>Fácil de usar</h4>
          <p class="text-muted">Interfaz intuitiva para todos.</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
      },
      {
        id: 'cta',
        label: 'CTA',
        icon: 'bi-megaphone',
        isPrebuilt: true,
        template: `<section class="py-5 bg-primary text-white text-center">
  <div class="container">
    <h2 class="fw-bold mb-3">¿Listo para comenzar?</h2>
    <p class="lead mb-4">Únete a miles de usuarios que ya confían en nosotros.</p>
    <a href="#" class="btn btn-light btn-lg px-5">Regístrate gratis</a>
  </div>
</section>`,
      },
      {
        id: 'footer',
        label: 'Footer',
        icon: 'bi-layout-sidebar-inset-reverse',
        isPrebuilt: true,
        template: `<footer class="bg-dark text-white py-5">
  <div class="container">
    <div class="row g-4">
      <div class="col-md-4">
        <h5 class="fw-bold mb-3">MiMarca</h5>
        <p class="text-white-50">Descripción breve de tu empresa o proyecto.</p>
      </div>
      <div class="col-md-2">
        <h6 class="fw-semibold mb-3">Empresa</h6>
        <ul class="list-unstyled text-white-50">
          <li><a href="#" class="text-white-50 text-decoration-none">Nosotros</a></li>
          <li><a href="#" class="text-white-50 text-decoration-none">Equipo</a></li>
          <li><a href="#" class="text-white-50 text-decoration-none">Blog</a></li>
        </ul>
      </div>
      <div class="col-md-2">
        <h6 class="fw-semibold mb-3">Soporte</h6>
        <ul class="list-unstyled text-white-50">
          <li><a href="#" class="text-white-50 text-decoration-none">Ayuda</a></li>
          <li><a href="#" class="text-white-50 text-decoration-none">Contacto</a></li>
          <li><a href="#" class="text-white-50 text-decoration-none">FAQ</a></li>
        </ul>
      </div>
      <div class="col-md-4 text-md-end">
        <h6 class="fw-semibold mb-3">Síguenos</h6>
        <div class="d-flex gap-2 justify-content-md-end">
          <a href="#" class="btn btn-outline-light btn-sm"><i class="bi bi-twitter-x"></i></a>
          <a href="#" class="btn btn-outline-light btn-sm"><i class="bi bi-instagram"></i></a>
          <a href="#" class="btn btn-outline-light btn-sm"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>
    </div>
    <hr class="border-secondary mt-4 mb-3">
    <p class="text-white-50 text-center mb-0 small">© 2026 MiMarca. Todos los derechos reservados.</p>
  </div>
</footer>`,
      },
      {
        id: 'section-navbar',
        label: 'Navbar',
        icon: 'bi-menu-button-wide-fill',
        isPrebuilt: true,
        template: `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand fw-bold" href="#">MiMarca</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#secNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="secNav">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link active" href="#">Inicio</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Nosotros</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Servicios</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Blog</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Contacto</a></li>
      </ul>
      <a href="#" class="btn btn-primary ms-3">Empezar</a>
    </div>
  </div>
</nav>`,
      },
      {
        id: 'features-4',
        label: 'Features 4col',
        icon: 'bi-grid-3x2-gap-fill',
        isPrebuilt: true,
        template: `<section class="py-5">
  <div class="container">
    <div class="text-center mb-5">
      <h2 class="fw-bold">¿Por qué elegirnos?</h2>
      <p class="text-muted lead">Todo lo que necesitas en un solo lugar.</p>
    </div>
    <div class="row g-4">
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card h-100 border-0 shadow-sm text-center p-3">
          <div class="card-body">
            <div class="mb-3">
              <i class="bi bi-lightning-charge-fill display-5 text-primary"></i>
            </div>
            <h5 class="card-title fw-bold">Rápido</h5>
            <p class="card-text text-muted">Rendimiento optimizado para la mejor experiencia del usuario.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card h-100 border-0 shadow-sm text-center p-3">
          <div class="card-body">
            <div class="mb-3">
              <i class="bi bi-shield-fill-check display-5 text-success"></i>
            </div>
            <h5 class="card-title fw-bold">Seguro</h5>
            <p class="card-text text-muted">Protección de datos de nivel empresarial garantizada.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card h-100 border-0 shadow-sm text-center p-3">
          <div class="card-body">
            <div class="mb-3">
              <i class="bi bi-phone-fill display-5 text-warning"></i>
            </div>
            <h5 class="card-title fw-bold">Responsive</h5>
            <p class="card-text text-muted">Diseño adaptado a cualquier dispositivo y pantalla.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card h-100 border-0 shadow-sm text-center p-3">
          <div class="card-body">
            <div class="mb-3">
              <i class="bi bi-headset display-5 text-info"></i>
            </div>
            <h5 class="card-title fw-bold">Soporte 24/7</h5>
            <p class="card-text text-muted">Equipo de soporte disponible en todo momento para ayudarte.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
      },
      {
        id: 'price-table',
        label: 'Price Table',
        icon: 'bi-tags-fill',
        isPrebuilt: true,
        template: `<section class="py-5 bg-light">
  <div class="container">
    <div class="text-center mb-5">
      <h2 class="fw-bold">Planes y Precios</h2>
      <p class="text-muted lead">Elige el plan perfecto para tu negocio.</p>
    </div>
    <div class="row g-4 justify-content-center">
      <div class="col-12 col-md-4">
        <div class="card h-100 border-0 shadow-sm">
          <div class="card-body text-center p-4">
            <h5 class="fw-bold mb-1">Básico</h5>
            <p class="text-muted small mb-3">Para empezar</p>
            <div class="display-4 fw-bold mb-1">$9</div>
            <p class="text-muted small mb-4">/ mes</p>
            <ul class="list-unstyled text-start mb-4">
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>5 proyectos</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>10 GB almacenamiento</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Soporte por email</li>
              <li class="mb-2 text-muted"><i class="bi bi-x-circle-fill text-muted me-2"></i>API access</li>
              <li class="mb-2 text-muted"><i class="bi bi-x-circle-fill text-muted me-2"></i>Reportes avanzados</li>
            </ul>
            <a href="#" class="btn btn-outline-primary w-100">Comenzar</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card h-100 border-0 shadow-lg border-primary" style="border-width:2px!important;">
          <div class="card-body text-center p-4">
            <span class="badge bg-primary mb-2">Más popular</span>
            <h5 class="fw-bold mb-1">Pro</h5>
            <p class="text-muted small mb-3">Para equipos en crecimiento</p>
            <div class="display-4 fw-bold mb-1 text-primary">$29</div>
            <p class="text-muted small mb-4">/ mes</p>
            <ul class="list-unstyled text-start mb-4">
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Proyectos ilimitados</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>100 GB almacenamiento</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Soporte prioritario</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>API access</li>
              <li class="mb-2 text-muted"><i class="bi bi-x-circle-fill text-muted me-2"></i>Reportes avanzados</li>
            </ul>
            <a href="#" class="btn btn-primary w-100">Comenzar</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card h-100 border-0 shadow-sm">
          <div class="card-body text-center p-4">
            <h5 class="fw-bold mb-1">Enterprise</h5>
            <p class="text-muted small mb-3">Para grandes organizaciones</p>
            <div class="display-4 fw-bold mb-1">$99</div>
            <p class="text-muted small mb-4">/ mes</p>
            <ul class="list-unstyled text-start mb-4">
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Proyectos ilimitados</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>1 TB almacenamiento</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Soporte 24/7 dedicado</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>API access</li>
              <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Reportes avanzados</li>
            </ul>
            <a href="#" class="btn btn-outline-dark w-100">Contactar ventas</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
      },
      {
        id: 'contact-form',
        label: 'Contact Form',
        icon: 'bi-envelope-paper-fill',
        isPrebuilt: true,
        template: `<section class="py-5">
  <div class="container">
    <div class="row g-5 align-items-start">
      <div class="col-12 col-lg-5">
        <h2 class="fw-bold mb-3">Contáctanos</h2>
        <p class="text-muted mb-4">¿Tienes alguna pregunta o quieres trabajar juntos? Escríbenos y te responderemos en menos de 24 horas.</p>
        <ul class="list-unstyled">
          <li class="d-flex align-items-center gap-3 mb-3">
            <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style="width:44px;height:44px;flex-shrink:0;">
              <i class="bi bi-geo-alt-fill"></i>
            </div>
            <div>
              <div class="fw-semibold">Dirección</div>
              <div class="text-muted small">Calle Principal 123, Ciudad</div>
            </div>
          </li>
          <li class="d-flex align-items-center gap-3 mb-3">
            <div class="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center" style="width:44px;height:44px;flex-shrink:0;">
              <i class="bi bi-telephone-fill"></i>
            </div>
            <div>
              <div class="fw-semibold">Teléfono</div>
              <div class="text-muted small">+1 (555) 000-0000</div>
            </div>
          </li>
          <li class="d-flex align-items-center gap-3">
            <div class="bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center" style="width:44px;height:44px;flex-shrink:0;">
              <i class="bi bi-envelope-fill"></i>
            </div>
            <div>
              <div class="fw-semibold">Email</div>
              <div class="text-muted small">hola@mimarca.com</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-12 col-lg-7">
        <div class="card border-0 shadow-sm p-4">
          <form>
            <div class="row g-3">
              <div class="col-12 col-sm-6">
                <label class="form-label fw-semibold">Nombre</label>
                <input type="text" class="form-control" placeholder="Tu nombre">
              </div>
              <div class="col-12 col-sm-6">
                <label class="form-label fw-semibold">Apellido</label>
                <input type="text" class="form-control" placeholder="Tu apellido">
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold">Correo electrónico</label>
                <input type="email" class="form-control" placeholder="tu@email.com">
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold">Asunto</label>
                <select class="form-select">
                  <option value="">Selecciona un tema...</option>
                  <option>Soporte técnico</option>
                  <option>Ventas</option>
                  <option>Colaboración</option>
                  <option>Otro</option>
                </select>
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold">Mensaje</label>
                <textarea class="form-control" rows="5" placeholder="Escribe tu mensaje aquí..."></textarea>
              </div>
              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="privacyCheck">
                  <label class="form-check-label text-muted small" for="privacyCheck">
                    Acepto la <a href="#">política de privacidad</a> y los <a href="#">términos de uso</a>.
                  </label>
                </div>
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-primary px-4">
                  <i class="bi bi-send-fill me-2"></i>Enviar mensaje
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>`,
      },
      {
        id: 'carousel',
        label: 'Carousel',
        icon: 'bi-images',
        isPrebuilt: true,
        template: `<section class="py-0">
  <div id="mainCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" class="active"></button>
      <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1"></button>
      <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://picsum.photos/1200/500?random=1" class="d-block w-100" alt="Slide 1" style="object-fit:cover;height:500px;">
        <div class="carousel-caption d-none d-md-block">
          <h3 class="fw-bold">Primer Slide</h3>
          <p>Descripción del primer slide del carrusel.</p>
          <a href="#" class="btn btn-primary">Ver más</a>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/1200/500?random=2" class="d-block w-100" alt="Slide 2" style="object-fit:cover;height:500px;">
        <div class="carousel-caption d-none d-md-block">
          <h3 class="fw-bold">Segundo Slide</h3>
          <p>Descripción del segundo slide del carrusel.</p>
          <a href="#" class="btn btn-light">Descubrir</a>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://picsum.photos/1200/500?random=3" class="d-block w-100" alt="Slide 3" style="object-fit:cover;height:500px;">
        <div class="carousel-caption d-none d-md-block">
          <h3 class="fw-bold">Tercer Slide</h3>
          <p>Descripción del tercer slide del carrusel.</p>
          <a href="#" class="btn btn-outline-light">Saber más</a>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
      <span class="visually-hidden">Anterior</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
      <span class="visually-hidden">Siguiente</span>
    </button>
  </div>
</section>`,
      },
      {
        id: 'gallery',
        label: 'Gallery',
        icon: 'bi-grid-3x3-gap-fill',
        isPrebuilt: true,
        template: `<section class="py-5">
  <div class="container">
    <div class="text-center mb-5">
      <h2 class="fw-bold">Galería</h2>
      <p class="text-muted lead">Una muestra de nuestros mejores trabajos.</p>
    </div>
    <div class="row g-3">
      <div class="col-12 col-sm-6 col-lg-4">
        <a href="https://picsum.photos/800/600?random=10" target="_blank" class="d-block overflow-hidden rounded shadow-sm">
          <img src="https://picsum.photos/800/600?random=10" class="img-fluid w-100" alt="Foto 1" style="height:220px;object-fit:cover;transition:transform .3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        </a>
      </div>
      <div class="col-12 col-sm-6 col-lg-4">
        <a href="https://picsum.photos/800/600?random=20" target="_blank" class="d-block overflow-hidden rounded shadow-sm">
          <img src="https://picsum.photos/800/600?random=20" class="img-fluid w-100" alt="Foto 2" style="height:220px;object-fit:cover;transition:transform .3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        </a>
      </div>
      <div class="col-12 col-sm-6 col-lg-4">
        <a href="https://picsum.photos/800/600?random=30" target="_blank" class="d-block overflow-hidden rounded shadow-sm">
          <img src="https://picsum.photos/800/600?random=30" class="img-fluid w-100" alt="Foto 3" style="height:220px;object-fit:cover;transition:transform .3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        </a>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <a href="https://picsum.photos/800/600?random=40" target="_blank" class="d-block overflow-hidden rounded shadow-sm">
          <img src="https://picsum.photos/800/600?random=40" class="img-fluid w-100" alt="Foto 4" style="height:180px;object-fit:cover;transition:transform .3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        </a>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <a href="https://picsum.photos/800/600?random=50" target="_blank" class="d-block overflow-hidden rounded shadow-sm">
          <img src="https://picsum.photos/800/600?random=50" class="img-fluid w-100" alt="Foto 5" style="height:180px;object-fit:cover;transition:transform .3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        </a>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <a href="https://picsum.photos/800/600?random=60" target="_blank" class="d-block overflow-hidden rounded shadow-sm">
          <img src="https://picsum.photos/800/600?random=60" class="img-fluid w-100" alt="Foto 6" style="height:180px;object-fit:cover;transition:transform .3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        </a>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <a href="https://picsum.photos/800/600?random=70" target="_blank" class="d-block overflow-hidden rounded shadow-sm">
          <img src="https://picsum.photos/800/600?random=70" class="img-fluid w-100" alt="Foto 7" style="height:180px;object-fit:cover;transition:transform .3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        </a>
      </div>
    </div>
    <div class="text-center mt-4">
      <a href="#" class="btn btn-outline-primary px-4">Ver toda la galería</a>
    </div>
  </div>
</section>`,
      },
      {
        id: 'product-single',
        label: 'Producto',
        icon: 'bi-bag-plus',
        isPrebuilt: true,
        template: `<section class="py-5 bg-white">
  <div class="container">
    <div class="row align-items-center g-5">
      <div class="col-12 col-lg-6">
        <div class="position-relative overflow-hidden rounded-4 shadow-sm bg-light text-center p-4">
          <img src="https://picsum.photos/600/600?random=88" class="img-fluid rounded-3 object-fit-cover" alt="Producto Premium" style="max-height: 450px;">
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="ps-lg-3">
          <span class="badge bg-primary bg-opacity-10 text-primary mb-2 px-3 py-2 rounded-pill fw-semibold text-uppercase" style="font-size: 0.75rem; letter-spacing: 0.5px;">Destacado</span>
          <h2 class="display-6 fw-bold mb-3 text-dark">Audífonos Inalámbricos Pro</h2>
          <div class="d-flex align-items-center gap-2 mb-3">
            <div class="text-warning">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-half"></i>
            </div>
            <span class="text-muted small">(4.7 estrellas · 98 opiniones)</span>
          </div>
          <div class="d-flex align-items-baseline gap-3 mb-4">
            <span class="fs-2 fw-bold text-dark">$119.99</span>
            <span class="text-muted text-decoration-line-through fs-5">$149.99</span>
          </div>
          <p class="text-muted mb-4 lead">Experimenta un sonido de alta fidelidad con cancelación activa de ruido, batería de hasta 40 horas de duración y almohadillas ergonómicas ultra suaves para máxima comodidad durante todo el día.</p>
          
          <div class="d-flex flex-wrap gap-3 align-items-center pt-2 mb-4">
            <div class="input-group" style="width: 120px;">
              <button class="btn btn-outline-secondary" type="button" onclick="var el = this.nextElementSibling; var v = parseInt(el.value); if(v > 1) el.value = v - 1;">-</button>
              <input type="number" class="form-control text-center fw-semibold" value="1" min="1" readonly style="background-color: transparent;">
              <button class="btn btn-outline-secondary" type="button" onclick="var el = this.previousElementSibling; var v = parseInt(el.value); el.value = v + 1;">+</button>
            </div>
            <button class="btn btn-primary btn-lg px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm">
              <i class="bi bi-cart-plus-fill"></i> Agregar al carrito
            </button>
          </div>
          
          <hr class="my-4 border-light-subtle">
          <div class="row g-2">
            <div class="col-6 col-sm-4">
              <div class="d-flex align-items-center gap-2 text-muted small">
                <i class="bi bi-truck text-primary fs-5"></i> Envío Gratis
              </div>
            </div>
            <div class="col-6 col-sm-4">
              <div class="d-flex align-items-center gap-2 text-muted small">
                <i class="bi bi-shield-check text-success fs-5"></i> Garantía 1 año
              </div>
            </div>
            <div class="col-12 col-sm-4 mt-2 mt-sm-0">
              <div class="d-flex align-items-center gap-2 text-muted small">
                <i class="bi bi-arrow-left-right text-info fs-5"></i> Devoluciones 30d
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
      },
      {
        id: 'section-img-left',
        label: 'Imagen Izq',
        icon: 'bi-layout-sidebar',
        isPrebuilt: true,
        template: `<section class="py-5 bg-white">
  <div class="container">
    <div class="row align-items-center g-5">
      <div class="col-12 col-lg-6">
        <img src="https://picsum.photos/600/400?random=1" class="img-fluid rounded-4 shadow-sm w-100 object-fit-cover" alt="Imagen descriptiva">
      </div>
      <div class="col-12 col-lg-6">
        <div class="ps-lg-3">
          <h2 class="display-5 fw-bold mb-3 text-dark">Diseño Moderno e Intuitivo</h2>
          <p class="lead text-muted mb-4">Descubre cómo nuestra plataforma puede ayudarte a optimizar tus flujos de trabajo de forma rápida y sencilla.</p>
          <p class="text-muted mb-4">Con herramientas avanzadas y una interfaz diseñada para la productividad, puedes enfocarte en lo que realmente importa para hacer crecer tu negocio.</p>
          <a href="#" class="btn btn-primary btn-lg px-4">Comenzar ahora</a>
        </div>
      </div>
    </div>
  </div>
</section>`,
      },
      {
        id: 'section-img-right',
        label: 'Imagen Der',
        icon: 'bi-layout-sidebar-reverse',
        isPrebuilt: true,
        template: `<section class="py-5 bg-light">
  <div class="container">
    <div class="row align-items-center g-5">
      <div class="col-12 col-lg-6 order-2 order-lg-1">
        <div class="pe-lg-3">
          <h2 class="display-5 fw-bold mb-3 text-dark">Impulsa tu Productividad</h2>
          <p class="lead text-muted mb-4">Todo lo que necesitas en una sola plataforma diseñada para equipos de alto rendimiento.</p>
          <p class="text-muted mb-4">Gestiona tareas, colabora en tiempo real y obtén reportes detallados del avance de todos tus proyectos sin esfuerzo.</p>
          <a href="#" class="btn btn-outline-primary btn-lg px-4">Saber más</a>
        </div>
      </div>
      <div class="col-12 col-lg-6 order-1 order-lg-2">
        <img src="https://picsum.photos/600/400?random=2" class="img-fluid rounded-4 shadow-sm w-100 object-fit-cover" alt="Imagen descriptiva">
      </div>
    </div>
  </div>
</section>`,
      },
      {
        id: 'section-counters',
        label: 'Contadores',
        icon: 'bi-hash',
        isPrebuilt: true,
        template: `<section class="py-5 bg-dark text-white" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);">
  <div class="container">
    <div class="row g-4 text-center">
      <div class="col-6 col-md-3">
        <div class="p-3">
          <i class="bi bi-check-circle display-5 text-primary mb-3 d-block"></i>
          <h3 class="display-5 fw-bold mb-1">150+</h3>
          <p class="text-white-50 small mb-0 fw-semibold">Proyectos Completados</p>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="p-3">
          <i class="bi bi-people display-5 text-success mb-3 d-block"></i>
          <h3 class="display-5 fw-bold mb-1">1,200+</h3>
          <p class="text-white-50 small mb-0 fw-semibold">Clientes Felices</p>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="p-3">
          <i class="bi bi-headset display-5 text-warning mb-3 d-block"></i>
          <h3 class="display-5 fw-bold mb-1">24/7</h3>
          <p class="text-white-50 small mb-0 fw-semibold">Soporte Activo</p>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="p-3">
          <i class="bi bi-trophy display-5 text-danger mb-3 d-block"></i>
          <h3 class="display-5 fw-bold mb-1">15+</h3>
          <p class="text-white-50 small mb-0 fw-semibold">Premios Ganados</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
      },
      {
        id: 'section-products-list',
        label: 'Lista Prod',
        icon: 'bi-grid-fill',
        isPrebuilt: true,
        template: `<section class="py-5 bg-white">
  <div class="container">
    <div class="text-center mb-5">
      <span class="badge bg-primary bg-opacity-10 text-primary mb-2 px-3 py-2 rounded-pill fw-semibold text-uppercase" style="font-size: 0.75rem; letter-spacing: 0.5px;">Colección</span>
      <h2 class="display-5 fw-bold text-dark">Productos Destacados</h2>
    </div>
    <div class="row g-4 justify-content-center">
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card h-100 border-0 shadow-sm overflow-hidden" style="transition: transform .2s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='none'">
          <div class="bg-light text-center p-4">
            <img src="https://picsum.photos/400/400?random=11" class="img-fluid rounded object-fit-cover" style="height: 180px;" alt="Reloj Inteligente">
          </div>
          <div class="card-body d-flex flex-column">
            <span class="text-muted small mb-1 d-block">Wearables</span>
            <h5 class="card-title fw-bold text-dark mb-2">Reloj Inteligente V2</h5>
            <div class="mt-auto pt-2">
              <div class="d-flex align-items-baseline gap-2 mb-3">
                <span class="fs-5 fw-bold text-dark">$99.99</span>
                <span class="text-muted text-decoration-line-through small">$129.99</span>
              </div>
              <button class="btn btn-primary w-100 fw-semibold d-flex align-items-center justify-content-center gap-2">
                <i class="bi bi-cart-plus-fill"></i> Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card h-100 border-0 shadow-sm overflow-hidden" style="transition: transform .2s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='none'">
          <div class="bg-light text-center p-4">
            <img src="https://picsum.photos/400/400?random=12" class="img-fluid rounded object-fit-cover" style="height: 180px;" alt="Cargador Inalámbrico">
          </div>
          <div class="card-body d-flex flex-column">
            <span class="text-muted small mb-1 d-block">Accesorios</span>
            <h5 class="card-title fw-bold text-dark mb-2">Cargador Inalámbrico</h5>
            <div class="mt-auto pt-2">
              <div class="d-flex align-items-baseline gap-2 mb-3">
                <span class="fs-5 fw-bold text-dark">$29.99</span>
                <span class="text-muted text-decoration-line-through small">$39.99</span>
              </div>
              <button class="btn btn-primary w-100 fw-semibold d-flex align-items-center justify-content-center gap-2">
                <i class="bi bi-cart-plus-fill"></i> Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card h-100 border-0 shadow-sm overflow-hidden" style="transition: transform .2s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='none'">
          <div class="bg-light text-center p-4">
            <img src="https://picsum.photos/400/400?random=13" class="img-fluid rounded object-fit-cover" style="height: 180px;" alt="Mochila Ergonómica">
          </div>
          <div class="card-body d-flex flex-column">
            <span class="text-muted small mb-1 d-block">Viaje</span>
            <h5 class="card-title fw-bold text-dark mb-2">Mochila Ergonómica</h5>
            <div class="mt-auto pt-2">
              <div class="d-flex align-items-baseline gap-2 mb-3">
                <span class="fs-5 fw-bold text-dark">$59.99</span>
                <span class="text-muted text-decoration-line-through small">$79.99</span>
              </div>
              <button class="btn btn-primary w-100 fw-semibold d-flex align-items-center justify-content-center gap-2">
                <i class="bi bi-cart-plus-fill"></i> Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card h-100 border-0 shadow-sm overflow-hidden" style="transition: transform .2s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='none'">
          <div class="bg-light text-center p-4">
            <img src="https://picsum.photos/400/400?random=14" class="img-fluid rounded object-fit-cover" style="height: 180px;" alt="Teclado Mecánico">
          </div>
          <div class="card-body d-flex flex-column">
            <span class="text-muted small mb-1 d-block">Oficina</span>
            <h5 class="card-title fw-bold text-dark mb-2">Teclado Mecánico RGB</h5>
            <div class="mt-auto pt-2">
              <div class="d-flex align-items-baseline gap-2 mb-3">
                <span class="fs-5 fw-bold text-dark">$89.99</span>
                <span class="text-muted text-decoration-line-through small">$109.99</span>
              </div>
              <button class="btn btn-primary w-100 fw-semibold d-flex align-items-center justify-content-center gap-2">
                <i class="bi bi-cart-plus-fill"></i> Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
      },
    ]
  },
  {
    category: 'Tipografía',
    icon: 'bi-type',
    items: [
      {
        id: 'h1',
        label: 'Heading 1',
        icon: 'bi-type-h1',
        tag: 'h1',
        defaultContent: 'Título Principal',
        defaultClasses: '',
      },
      {
        id: 'h2',
        label: 'Heading 2',
        icon: 'bi-type-h2',
        tag: 'h2',
        defaultContent: 'Título Secundario',
        defaultClasses: '',
      },
      {
        id: 'h3',
        label: 'Heading 3',
        icon: 'bi-type-h3',
        tag: 'h3',
        defaultContent: 'Título Terciario',
        defaultClasses: '',
      },
      {
        id: 'h4',
        label: 'Heading 4',
        icon: 'bi-type-h4',
        tag: 'h4',
        defaultContent: 'Subtítulo',
        defaultClasses: '',
      },
      {
        id: 'paragraph',
        label: 'Párrafo',
        icon: 'bi-text-paragraph',
        tag: 'p',
        defaultContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        defaultClasses: '',
      },
      {
        id: 'lead',
        label: 'Lead',
        icon: 'bi-text-paragraph',
        tag: 'p',
        defaultContent: 'Texto de introducción destacado con clase lead.',
        defaultClasses: 'lead',
      },
      {
        id: 'blockquote',
        label: 'Blockquote',
        icon: 'bi-chat-quote',
        tag: 'blockquote',
        defaultContent: 'Una cita importante que quieres destacar.',
        defaultClasses: 'blockquote border-start border-4 border-primary ps-3',
      },
      {
        id: 'code-inline',
        label: 'Code',
        icon: 'bi-code',
        tag: 'code',
        defaultContent: 'console.log("hello world")',
        defaultClasses: '',
      },
      {
        id: 'link',
        label: 'Link',
        icon: 'bi-link-45deg',
        tag: 'a',
        defaultContent: 'Enlace',
        defaultClasses: '',
        attrs: { href: '#' },
      },
      {
        id: 'hr',
        label: 'Divisor',
        icon: 'bi-dash-lg',
        tag: 'hr',
        defaultClasses: '',
        isSelfClosing: true,
      },
    ]
  },
  {
    category: 'Botones',
    icon: 'bi-hand-index',
    items: [
      {
        id: 'btn-primary',
        label: 'Primary',
        icon: 'bi-square-fill',
        tag: 'button',
        defaultContent: 'Button Primary',
        defaultClasses: 'btn btn-primary',
        attrs: { type: 'button' },
      },
      {
        id: 'btn-secondary',
        label: 'Secondary',
        icon: 'bi-square-fill',
        tag: 'button',
        defaultContent: 'Button Secondary',
        defaultClasses: 'btn btn-secondary',
        attrs: { type: 'button' },
      },
      {
        id: 'btn-success',
        label: 'Success',
        icon: 'bi-square-fill',
        tag: 'button',
        defaultContent: 'Button Success',
        defaultClasses: 'btn btn-success',
        attrs: { type: 'button' },
      },
      {
        id: 'btn-outline',
        label: 'Outline',
        icon: 'bi-square',
        tag: 'button',
        defaultContent: 'Button Outline',
        defaultClasses: 'btn btn-outline-primary',
        attrs: { type: 'button' },
      },
      {
        id: 'btn-link',
        label: 'Link Button',
        icon: 'bi-link',
        tag: 'a',
        defaultContent: 'Link',
        defaultClasses: 'btn btn-link',
        attrs: { href: '#' },
      },
    ]
  },
  {
    category: 'Tarjetas',
    icon: 'bi-card-text',
    items: [
      {
        id: 'card',
        label: 'Card',
        icon: 'bi-card-text',
        isPrebuilt: true,
        template: `<div class="card">
  <div class="card-body">
    <h5 class="card-title">Título de la Tarjeta</h5>
    <p class="card-text">Contenido de ejemplo para esta tarjeta de Bootstrap.</p>
    <a href="#" class="btn btn-primary">Ir a algún lugar</a>
  </div>
</div>`,
      },
      {
        id: 'card-img',
        label: 'Card + Img',
        icon: 'bi-card-image',
        isPrebuilt: true,
        template: `<div class="card">
  <img src="https://picsum.photos/400/200" class="card-img-top" alt="Card image">
  <div class="card-body">
    <h5 class="card-title">Título de la Tarjeta</h5>
    <p class="card-text">Descripción de la tarjeta con imagen de cabecera.</p>
    <a href="#" class="btn btn-primary">Ver más</a>
  </div>
</div>`,
      },
      {
        id: 'card-horizontal',
        label: 'Card Horizontal',
        icon: 'bi-card-heading',
        isPrebuilt: true,
        template: `<div class="card">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="https://picsum.photos/200/300" class="img-fluid rounded-start h-100 object-fit-cover" alt="Image">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Tarjeta Horizontal</h5>
        <p class="card-text">Tarjeta con imagen a la izquierda y contenido a la derecha.</p>
        <a href="#" class="btn btn-primary">Leer más</a>
      </div>
    </div>
  </div>
</div>`,
      },
    ]
  },
  {
    category: 'Alertas',
    icon: 'bi-exclamation-circle',
    items: [
      {
        id: 'alert-primary',
        label: 'Alert Info',
        icon: 'bi-info-circle',
        tag: 'div',
        defaultContent: 'Mensaje informativo. <a href="#" class="alert-link">Más detalles</a>',
        defaultClasses: 'alert alert-primary',
        attrs: { role: 'alert' },
        rawContent: true,
      },
      {
        id: 'alert-success',
        label: 'Alert Success',
        icon: 'bi-check-circle',
        tag: 'div',
        defaultContent: '¡Operación realizada con éxito!',
        defaultClasses: 'alert alert-success',
        attrs: { role: 'alert' },
      },
      {
        id: 'alert-danger',
        label: 'Alert Danger',
        icon: 'bi-x-circle',
        tag: 'div',
        defaultContent: 'Ha ocurrido un error. Por favor inténtalo nuevamente.',
        defaultClasses: 'alert alert-danger',
        attrs: { role: 'alert' },
      },
      {
        id: 'alert-warning',
        label: 'Alert Warning',
        icon: 'bi-exclamation-triangle',
        tag: 'div',
        defaultContent: 'Advertencia: revisa los datos antes de continuar.',
        defaultClasses: 'alert alert-warning',
        attrs: { role: 'alert' },
      },
    ]
  },
  {
    category: 'Formularios',
    icon: 'bi-ui-checks',
    items: [
      {
        id: 'form-input',
        label: 'Input',
        icon: 'bi-input-cursor-text',
        isPrebuilt: true,
        template: `<div class="mb-3">
  <label class="form-label fw-semibold">Etiqueta</label>
  <input type="text" class="form-control" placeholder="Escribe aquí...">
</div>`,
      },
      {
        id: 'form-email',
        label: 'Email',
        icon: 'bi-envelope',
        isPrebuilt: true,
        template: `<div class="mb-3">
  <label class="form-label fw-semibold">Correo electrónico</label>
  <input type="email" class="form-control" placeholder="tu@email.com">
</div>`,
      },
      {
        id: 'form-textarea',
        label: 'Textarea',
        icon: 'bi-textarea-t',
        isPrebuilt: true,
        template: `<div class="mb-3">
  <label class="form-label fw-semibold">Mensaje</label>
  <textarea class="form-control" rows="4" placeholder="Escribe tu mensaje..."></textarea>
</div>`,
      },
      {
        id: 'form-select',
        label: 'Select',
        icon: 'bi-menu-button',
        isPrebuilt: true,
        template: `<div class="mb-3">
  <label class="form-label fw-semibold">Selecciona</label>
  <select class="form-select">
    <option value="">Elige una opción...</option>
    <option value="1">Opción 1</option>
    <option value="2">Opción 2</option>
    <option value="3">Opción 3</option>
  </select>
</div>`,
      },
      {
        id: 'form-check',
        label: 'Checkbox',
        icon: 'bi-check-square',
        isPrebuilt: true,
        template: `<div class="form-check">
  <input class="form-check-input" type="checkbox" id="check1">
  <label class="form-check-label" for="check1">Acepto los términos y condiciones</label>
</div>`,
      },
      {
        id: 'form-switch',
        label: 'Switch',
        icon: 'bi-toggle-on',
        isPrebuilt: true,
        template: `<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="switch1">
  <label class="form-check-label" for="switch1">Activar opción</label>
</div>`,
      },
      {
        id: 'form-group',
        label: 'Form Group',
        icon: 'bi-ui-checks-grid',
        isPrebuilt: true,
        template: `<form class="p-4 border rounded">
  <div class="mb-3">
    <label class="form-label fw-semibold">Nombre completo</label>
    <input type="text" class="form-control" placeholder="Tu nombre">
  </div>
  <div class="mb-3">
    <label class="form-label fw-semibold">Correo electrónico</label>
    <input type="email" class="form-control" placeholder="tu@email.com">
  </div>
  <div class="mb-3">
    <label class="form-label fw-semibold">Mensaje</label>
    <textarea class="form-control" rows="4"></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Enviar</button>
</form>`,
      },
    ]
  },
  {
    category: 'Navegación',
    icon: 'bi-menu-button-wide',
    items: [
      {
        id: 'navbar-dark',
        label: 'Navbar Dark',
        icon: 'bi-menu-button-wide-fill',
        isPrebuilt: true,
        template: `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#">MiMarca</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav1">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="nav1">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link active" href="#">Inicio</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Nosotros</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Servicios</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Contacto</a></li>
      </ul>
    </div>
  </div>
</nav>`,
      },
      {
        id: 'navbar-light',
        label: 'Navbar Light',
        icon: 'bi-menu-button-wide',
        isPrebuilt: true,
        template: `<nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
  <div class="container">
    <a class="navbar-brand fw-bold text-primary" href="#">MiMarca</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav2">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="nav2">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link active" href="#">Inicio</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Nosotros</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Servicios</a></li>
      </ul>
      <a href="#" class="btn btn-primary ms-3">Contactar</a>
    </div>
  </div>
</nav>`,
      },
      {
        id: 'breadcrumb',
        label: 'Breadcrumb',
        icon: 'bi-chevron-right',
        isPrebuilt: true,
        template: `<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Inicio</a></li>
    <li class="breadcrumb-item"><a href="#">Categoría</a></li>
    <li class="breadcrumb-item active" aria-current="page">Página actual</li>
  </ol>
</nav>`,
      },
      {
        id: 'pagination',
        label: 'Pagination',
        icon: 'bi-123',
        isPrebuilt: true,
        template: `<nav aria-label="Navegación de páginas">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled"><a class="page-link" href="#">Anterior</a></li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Siguiente</a></li>
  </ul>
</nav>`,
      },
    ]
  },
  {
    category: 'Media',
    icon: 'bi-image',
    items: [
      {
        id: 'image',
        label: 'Imagen',
        icon: 'bi-image',
        tag: 'img',
        defaultClasses: 'img-fluid rounded',
        attrs: { src: 'https://picsum.photos/800/400', alt: 'Imagen de ejemplo' },
        isSelfClosing: true,
      },
      {
        id: 'figure',
        label: 'Figure',
        icon: 'bi-image-alt',
        isPrebuilt: true,
        template: `<figure class="figure text-center">
  <img src="https://picsum.photos/400/300" class="figure-img img-fluid rounded" alt="Figura">
  <figcaption class="figure-caption text-muted">Descripción de la imagen</figcaption>
</figure>`,
      },
      {
        id: 'iframe-video',
        label: 'Video Embed',
        icon: 'bi-play-circle',
        isPrebuilt: true,
        template: `<div class="ratio ratio-16x9">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Video" allowfullscreen></iframe>
</div>`,
      },
    ]
  },
  {
    category: 'Listas & Tablas',
    icon: 'bi-list-ul',
    items: [
      {
        id: 'list-group',
        label: 'List Group',
        icon: 'bi-list-ul',
        isPrebuilt: true,
        template: `<ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Elemento 1 <span class="badge bg-primary rounded-pill">14</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Elemento 2 <span class="badge bg-primary rounded-pill">7</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Elemento 3 <span class="badge bg-primary rounded-pill">3</span>
  </li>
</ul>`,
      },
      {
        id: 'table',
        label: 'Tabla',
        icon: 'bi-table',
        isPrebuilt: true,
        template: `<div class="table-responsive">
  <table class="table table-bordered table-hover">
    <thead class="table-dark">
      <tr>
        <th>#</th>
        <th>Nombre</th>
        <th>Email</th>
        <th>Estado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Juan Pérez</td>
        <td>juan@email.com</td>
        <td><span class="badge bg-success">Activo</span></td>
      </tr>
      <tr>
        <td>2</td>
        <td>María García</td>
        <td>maria@email.com</td>
        <td><span class="badge bg-warning">Pendiente</span></td>
      </tr>
      <tr>
        <td>3</td>
        <td>Carlos López</td>
        <td>carlos@email.com</td>
        <td><span class="badge bg-danger">Inactivo</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
      },
    ]
  },
  {
    category: 'Componentes',
    icon: 'bi-puzzle',
    items: [
      {
        id: 'badge',
        label: 'Badge',
        icon: 'bi-bookmark-fill',
        tag: 'span',
        defaultContent: 'Nuevo',
        defaultClasses: 'badge bg-primary',
      },
      {
        id: 'badge-pill',
        label: 'Badge Pill',
        icon: 'bi-bookmark',
        tag: 'span',
        defaultContent: '42',
        defaultClasses: 'badge rounded-pill bg-danger',
      },
      {
        id: 'spinner',
        label: 'Spinner',
        icon: 'bi-arrow-repeat',
        tag: 'div',
        defaultClasses: 'spinner-border text-primary',
        attrs: { role: 'status' },
        defaultContent: '',
        rawContent: true,
        innerContent: '<span class="visually-hidden">Cargando...</span>',
      },
      {
        id: 'progress',
        label: 'Progress',
        icon: 'bi-bar-chart-line',
        isPrebuilt: true,
        template: `<div class="mb-3">
  <div class="d-flex justify-content-between mb-1">
    <span class="small fw-semibold">Progreso</span>
    <span class="small text-muted">75%</span>
  </div>
  <div class="progress">
    <div class="progress-bar bg-primary" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
</div>`,
      },
      {
        id: 'accordion',
        label: 'Accordion',
        icon: 'bi-chevron-bar-down',
        isPrebuilt: true,
        template: `<div class="accordion" id="acc1">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#ac1">
        Pregunta uno
      </button>
    </h2>
    <div id="ac1" class="accordion-collapse collapse show" data-bs-parent="#acc1">
      <div class="accordion-body">Respuesta a la primera pregunta del acordeón.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ac2">
        Pregunta dos
      </button>
    </h2>
    <div id="ac2" class="accordion-collapse collapse" data-bs-parent="#acc1">
      <div class="accordion-body">Respuesta a la segunda pregunta del acordeón.</div>
    </div>
  </div>
</div>`,
      },
      {
        id: 'modal-trigger',
        label: 'Modal',
        icon: 'bi-window',
        isPrebuilt: true,
        template: `<div>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exModal">
    Abrir Modal
  </button>
  <div class="modal fade" id="exModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Título del Modal</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">Contenido del modal.</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
      },
      {
        id: 'tabs',
        label: 'Tabs',
        icon: 'bi-folder2',
        isPrebuilt: true,
        template: `<div>
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab1">Tab 1</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab2">Tab 2</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab3">Tab 3</button></li>
  </ul>
  <div class="tab-content border border-top-0 p-4">
    <div class="tab-pane fade show active" id="tab1">Contenido de la primera pestaña.</div>
    <div class="tab-pane fade" id="tab2">Contenido de la segunda pestaña.</div>
    <div class="tab-pane fade" id="tab3">Contenido de la tercera pestaña.</div>
  </div>
</div>`,
      },
      {
        id: 'toast-demo',
        label: 'Toast',
        icon: 'bi-bell',
        isPrebuilt: true,
        template: `<div class="toast show" role="alert">
  <div class="toast-header">
    <strong class="me-auto">Notificación</strong>
    <small class="text-muted">hace un momento</small>
    <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
  </div>
  <div class="toast-body">Mensaje de notificación emergente.</div>
</div>`,
      },
    ]
  },
];

// Helper: find component by id
function findComponent(id) {
  for (const cat of COMPONENTS) {
    const found = cat.items.find(i => i.id === id);
    if (found) return found;
  }
  return null;
}
