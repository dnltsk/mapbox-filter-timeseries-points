import mapboxgl from "mapbox-gl";
import * as d3 from "d3";

mapboxgl.accessToken = 'pk.eyJ1IjoibWlrZXdpbGxpYW1zb24iLCJhIjoibzRCYUlGSSJ9.QGvlt6Opm5futGhE5i-1kw';
let map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
  center: [13.3888599, 52.5170365], // starting position
  zoom: 4 // starting zoom
});

let projectLonLatToMapbox = (lonlat) => {
  let p = map.project(new mapboxgl.LngLat(lonlat[0], lonlat[1]));
  return [p.x, p.y];
};

let renderStations = () => {
  stations
      .attr("cx", function (station, i) {
        return projectLonLatToMapbox(station.coord)[0]
      })
      .attr("cy", function (station, i) {
        return projectLonLatToMapbox(station.coord)[1]
      })
      .style("fill", colorTable)
      .attr("r", 8);
};

let colorTable = (station) => {
  switch (station.value) {
    case 0:
      return "green";
    case 1:
      return "yellow";
    case 2:
      return "red";
    default:
      throw Error("cannot find color for station " + JSON.stringify(station));
  }
};

map.on("viewreset", function () {
  renderStations()
});

map.on("move", function () {
  renderStations()
});

let container = map.getCanvasContainer();
let svg = d3.select(container).append("svg");

let stationData = [];
for (let i = 0; i < 10000; i++) {
  stationData.push({
    coord: [Math.random() * 360 - 180, Math.random() * 180 - 90],
    value: Math.floor(Math.random() * 3)
  });
}
let stations = svg.append("g").classed("stations", true)
    .selectAll("circle").data(stationData).enter().append("circle");

renderStations();