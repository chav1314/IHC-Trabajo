let mainMap, routeMap, geocoder, directionsService, directionsRenderer, trafficLayer;
let autocompleteStart, autocompleteDestination;

function initializeMap(elementId, options = {}) {
    const mapElement = document.getElementById(elementId);
    if (!mapElement) return null;

    const map = new google.maps.Map(mapElement, {
        center: { lat: -12.088577, lng: -77.005112 },
        zoom: 13,
        ...options.mapOptions,
    });

    if (options.trafficLayer) {
        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
    }

    if (options.directionsService) {
        geocoder = new google.maps.Geocoder();
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
    }

    if (options.autocompleteInputs) {
        const [startInput, destinationInput] = options.autocompleteInputs;
        autocompleteStart = new google.maps.places.Autocomplete(startInput);
        autocompleteDestination = new google.maps.places.Autocomplete(destinationInput);
        autocompleteStart.setComponentRestrictions({ country: "pe" });
        autocompleteDestination.setComponentRestrictions({ country: "pe" });
    }

    return map;
}

function initMap() {
    mainMap = initializeMap("map", {
        trafficLayer: true,
    });
}

function initRouteMap() {
    routeMap = initializeMap("routeMap", {
        trafficLayer: false,
        directionsService: true,
        autocompleteInputs: [
            document.getElementById("start"),
            document.getElementById("destination"),
        ],
    });
}

function toggleFilterMenu() {
    const menu = document.getElementById("filterMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function toggleTrafficLayer() {
    const checkbox = document.getElementById("trafficToggle");
    trafficLayer.setMap(checkbox.checked ? routeMap : null);
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
                selectRoute(0);
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
    directionsRenderer.setRouteIndex(index);

    const routeOptions = document.querySelectorAll(".route-info");
    routeOptions.forEach(option => option.classList.remove("selected"));

    const selectedOption = document.getElementById(`routeOption${index}`);
    selectedOption.classList.add("selected");
}

if (document.getElementById("routeMap")) {
    initRouteMap();
}
