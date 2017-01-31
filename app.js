import mapboxgl from "mapbox-gl";
import * as d3 from "d3";

mapboxgl.accessToken = 'pk.eyJ1IjoiZG5sdHNrIiwiYSI6ImNpbXlsb3VubjAwZ2F2OWx5Znp5cXM2OHIifQ.0xaAmNZYxb68vzxxQ0yu2Q';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [13.3096834, 52.515747],
  zoom: 8
});

var timeslides = [
  '2017-01-31T00:00:00Z',
  '2017-01-31T00:20:00Z',
  '2017-01-31T00:40:00Z',
  '2017-01-31T01:00:00Z',
  '2017-01-31T01:20:00Z',
  '2017-01-31T01:40:00Z',
  '2017-01-31T02:00:00Z',
  '2017-01-31T02:20:00Z',
  '2017-01-31T02:40:00Z',
  '2017-01-31T03:00:00Z'
];

function filterBy(timeslideIndex) {
  var selectedTime = timeslides[timeslideIndex];
  console.log("selectedTime: ", selectedTime);

  map.setFilter('observations',
      [
        "all",
        ['>=', 'validFrom', "2017-01-31T01:20:00Z"],
        ['<', 'validTo', "2017-01-31T01:20:00Z"]
      ]);

  // Set the label to the month
  document.getElementById('month').textContent = selectedTime;
}

map.on('load', function () {
  d3.json('observations.json', function (err, data) {
    if (err) throw err;

    map.addSource('observations-source', {
      'type': 'geojson',
      'data': data
    });

    var observationLayer = map.addLayer({
      'id': 'observations',
      'type': 'circle',
      'source': 'observations-source',
      'paint': {
        'circle-color': {
          property: 'value',
          stops: [
            [1, '#FCA107'],
            [2, '#7F3121'],
            [3, '#bb0000']
          ]
        },
        'circle-opacity': 0.5,
        'circle-radius': 7
      }
    });

    //initial filter
    filterBy(0);

    document.getElementById('slider').addEventListener('input', function (e) {
      var timeslideIndex = parseInt(e.target.value, 10);
      filterBy(timeslideIndex);
    });
  });
});