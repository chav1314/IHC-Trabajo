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

const navLinks = document.querySelectorAll('.nav-links li a');

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.fontSize = '18px';
    link.style.fontWeight = 'bold';
    link.style.color = '#000';
    link.style.transition = 'font-size 0.3s ease, font-weight 0.3s ease, color 0.3s ease';
  });

  link.addEventListener('mouseleave', () => {
    link.style.fontSize = '16px'; 
    link.style.fontWeight = '600';
    link.style.color = '#333';
  });
});


const featureItems = document.querySelectorAll('.feature');

featureItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'scale(1.2)'; // Aumenta el tamaño un 10%
    item.style.transition = 'transform 0.3s ease'; // Transición suave
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'scale(1)'; // Restaura el tamaño original
  });
});
