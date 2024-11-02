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
