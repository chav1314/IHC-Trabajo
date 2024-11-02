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