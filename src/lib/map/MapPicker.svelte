<script>
	import { onMount, onDestroy } from "svelte";

	export let position = null;

	let map, baseLayer, marker, positionData;

	function onMapClick(e) {
		position = {
			lat: e.latlng.lat,
			lng: e.latlng.lng,
		};
		// position = `${e.latlng.lat}, ${e.latlng.lng}`;
		marker.setLatLng(e.latlng).addTo(map);
	}

	onMount(async () => {
		const leafletModule = await import("leaflet");
		L = leafletModule.default;

		// NICE CLEAR ONE!
		// http://maps.stamen.com/
		// https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}
		// https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.{ext}
		// https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.{ext}
		// https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}
		baseLayer = L.tileLayer(
			"//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}",
			{
				subdomains: "abcd",
				minZoom: 0,
				maxZoom: 18,
				ext: "png",
			}
		);

		map = L.map("map-canvas", {
			zoomControl: false, // Add zoom control separately below
			center: [9.933576017916193, -84.0551265784177], // Initial map center
			maxBounds: L.latLngBounds([
				[9.980261288306549, -84.17891979217531],
				[9.962086432098069, -84.14235591888429],
			]),
			zoom: 15, // Initial zoom level
			attributionControl: false, // Instead of default attribution, we add custom at the bottom of script
			scrollWheelZoom: true,
			layers: [baseLayer],
		});

		// L.control.zoom({ position: "topright" }).addTo(map);
		let pickerIcon = L.icon({
			iconUrl: "/map/marker-icon.png",
			shadowUrl: "/map/marker-shadow.png",
			iconAnchor: [13, 42],
		});

		marker = L.marker(positionData, {
			icon: pickerIcon,
		});

		if (position) {
			positionData = [+position.lat, +position.lng];
			marker.setLatLng(positionData).addTo(map);
			map.setView(positionData, 16);
		}

		map.on("click", onMapClick);
		// map.on('resize', () => console.log('resized map'))

		// map.invalidateSize();
	});

	onDestroy(async () => {
		if (map) {
			// console.log("Unloading 🗺");
			map.remove();
		}
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/leaflet.css" />
</svelte:head>

<div id="map-canvas" class="map" />

<style>
	.map {
		height: 222px;
		width: 100%;
		z-index: 1;
	}
	@media (prefers-color-scheme: dark) {
		.map {
			filter: invert(1) brightness(var(--brightness));
		}
	}
</style>
