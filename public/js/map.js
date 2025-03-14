


const coordinates = window.listingCoordinates; 
const title = window.listingTitle;
const locationName = window.listingLocation;  
const mapToken = window.mapToken;




const map = new maplibregl.Map({
  container: "map",
  style: "https://api.maptiler.com/maps/outdoor-v2/style.json?key=" + mapToken,
  center: coordinates,
  zoom: 9
});


const marker = new maplibregl.Marker({ color: "red" })
  .setLngLat(coordinates)
  .setPopup(
    new maplibregl.Popup({ offset: 25 })
      .setHTML(`<h2>${title}</h2><p> <b>${locationName}</b></p>`)
  )
  .addTo(map);


marker.togglePopup();



