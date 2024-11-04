
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

// Selecciona todos los elementos que contienen las imágenes y sus textos
const featureItems = document.querySelectorAll('.feature');

// Agrega el evento para el efecto de hover
featureItems.forEach(item => {
  // Aplica el efecto al entrar el cursor
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'scale(1.2)'; // Aumenta el tamaño un 10%
    item.style.transition = 'transform 0.3s ease'; // Transición suave
  });

  // Quita el efecto al salir el cursor
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'scale(1)'; // Restaura el tamaño original
  });
});


let mainMap, routeMap, geocoder, markerStart, markerEnd, autocompleteStart, autocompleteDestination;
let directionsService, directionsRenderer;
let trafficLayer; 

function initMap() {
  // Solo inicializar el mapa y capa de tráfico si el elemento "map" existe en la página actual
  const mapElement = document.getElementById("map");
  if (mapElement) {
      map = new google.maps.Map(mapElement, {
          center: { lat: -12.088577, lng: -77.005112 },
          zoom: 13,
      });
      // Activar capa de tráfico
      const trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
  }
}

initMap();

function initRouteMap() {
    const routeMapElement = document.getElementById("routeMap");
    if (routeMapElement) {
        // Inicializar el mapa específico para rutas en mapa_buses.html
        routeMap = new google.maps.Map(routeMapElement, {
            center: { lat: -12.088577, lng: -77.005112 },
            zoom: 13,
        });

        geocoder = new google.maps.Geocoder();
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(routeMap);

        // Inicializar autocompletado en los campos de entrada
        const startInput = document.getElementById("start");
        const destinationInput = document.getElementById("destination");

        if (startInput && destinationInput) {
            autocompleteStart = new google.maps.places.Autocomplete(startInput);
            autocompleteDestination = new google.maps.places.Autocomplete(destinationInput);
            autocompleteStart.setComponentRestrictions({ country: "pe" });
            autocompleteDestination.setComponentRestrictions({ country: "pe" });
        }

        // Inicializar la capa de tráfico pero no mostrarla inicialmente
        trafficLayer = new google.maps.TrafficLayer();
    }
}

// Función para alternar el menú desplegable
function toggleFilterMenu() {
    const menu = document.getElementById("filterMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Función para mostrar/ocultar la capa de tráfico
function toggleTrafficLayer() {
    const checkbox = document.getElementById("trafficToggle");
    if (checkbox.checked) {
        trafficLayer.setMap(routeMap); // Mostrar la capa de tráfico
    } else {
        trafficLayer.setMap(null); // Ocultar la capa de tráfico
    }
}

function calculateRoute() {
    const startAddress = document.getElementById("start").value;
    const destinationAddress = document.getElementById("destination").value;

    if (startAddress && destinationAddress) {
        const request = {
            origin: startAddress,
            destination: destinationAddress,
            travelMode: google.maps.TravelMode.TRANSIT,
            provideRouteAlternatives: true,
        };

        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
                displayRouteOptions(result.routes);
                selectRoute(0); // Seleccionar la opción 1 por defecto
            } else {
                alert("No se pudo encontrar una ruta de transporte público: " + status);
            }
        });
    } else {
        alert("Por favor, ingrese tanto la ubicación como el destino.");
    }
}

function displayRouteOptions(routes) {
    const routesContainer = document.getElementById("routesContainer");
    routesContainer.innerHTML = "";

    routes.slice(0, 3).forEach((route, index) => {
        const routeInfo = document.createElement("div");
        routeInfo.classList.add("route-info");
        routeInfo.id = `routeOption${index}`;

        // Agregar evento para seleccionar la ruta al hacer clic
        routeInfo.onclick = () => selectRoute(index);

        const duration = route.legs[0].duration.text;
        const departureTime = route.legs[0].departure_time?.text || "Hora desconocida";
        const arrivalTime = route.legs[0].arrival_time?.text || "Hora desconocida";

        routeInfo.innerHTML = `
            <h4>Opción ${index + 1}</h4>
            <p><strong>Salida:</strong> ${departureTime}</p>
            <p><strong>Llegada:</strong> ${arrivalTime}</p>
            <p><strong>Duración:</strong> ${duration}</p>
        `;

        route.legs[0].steps.forEach((step) => {
            const stepInfo = document.createElement("div");
            stepInfo.classList.add("step-info");

            if (step.travel_mode === "WALKING") {
                stepInfo.innerHTML = `<p>🚶 Caminata por ${step.duration.text}</p>`;
            } else if (step.travel_mode === "TRANSIT") {
                const line = step.transit.line;
                stepInfo.innerHTML = `
                    <p>🚌 ${line.vehicle.type} - ${line.short_name}</p>
                    <p>Desde: ${step.transit.departure_stop.name}</p>
                    <p>Hasta: ${step.transit.arrival_stop.name}</p>
                    <p>Tiempo: ${step.duration.text}</p>
                `;
            }
            routeInfo.appendChild(stepInfo);
        });

        routesContainer.appendChild(routeInfo);
    });
}

function selectRoute(index) {
    // Establece la ruta seleccionada en el mapa
    directionsRenderer.setRouteIndex(index);

    // Quitar la clase de negrita de todas las opciones
    const routeOptions = document.querySelectorAll(".route-info");
    routeOptions.forEach(option => option.classList.remove("selected"));

    // Agregar la clase de negrita a la opción seleccionada
    const selectedOption = document.getElementById(`routeOption${index}`);
    selectedOption.classList.add("selected");
}


if (document.getElementById("routeMap")) {
    initRouteMap();
}
