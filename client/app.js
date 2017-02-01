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
  '2017-01-01T00:00:00Z',
  '2017-01-01T00:20:00Z',
  '2017-01-01T00:40:00Z',
  '2017-01-01T01:00:00Z',
  '2017-01-01T01:20:00Z',
  '2017-01-01T01:40:00Z',
  '2017-01-01T02:00:00Z',
  '2017-01-01T02:20:00Z',
  '2017-01-01T02:40:00Z',
  '2017-01-01T03:00:00Z'
];

function filterBy(timeslideIndex) {
  var givenTimestamp = timeslides[timeslideIndex];
  console.log("selectedTime: ", givenTimestamp);

  map.setFilter('observations',
      [
        'all',
        ['<=', 'validFrom', givenTimestamp],
        ['>', 'validTo', givenTimestamp]
      ]);

  // Set the label to the month
  document.getElementById('month').textContent = givenTimestamp;
}

map.on('load', function () {
  d3.json('http://localhost:8080/obs', function (err, data) {
    if (err) throw err;

    console.log(data.features.length);

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
            [0, '#000000'],
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