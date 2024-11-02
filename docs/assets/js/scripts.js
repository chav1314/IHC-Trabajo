let map;

async function initMap() {
  const { Map, TrafficLayer } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -12.088577, lng: -77.005112  },
    zoom: 13,
  });

  const trafficLayer = new TrafficLayer();
  trafficLayer.setMap(map);
}

initMap();

// Selecciona todos los enlaces del menú de navegación
const navLinks = document.querySelectorAll('.nav-links li a');

// Agrega los eventos de hover a cada enlace
navLinks.forEach(link => {
  // Efecto al pasar el cursor
  link.addEventListener('mouseenter', () => {
    link.style.fontSize = '18px'; // Aumenta ligeramente el tamaño del texto
    link.style.fontWeight = 'bold'; // Cambia a negrita
    link.style.color = '#000'; // Cambia el color a negro (opcional)
    link.style.transition = 'font-size 0.3s ease, font-weight 0.3s ease, color 0.3s ease'; // Transición suave
  });

  // Efecto al quitar el cursor
  link.addEventListener('mouseleave', () => {
    link.style.fontSize = '16px'; // Restaura el tamaño original del texto
    link.style.fontWeight = '600'; // Restaura el grosor original
    link.style.color = '#333'; // Restaura el color original
  });
});



