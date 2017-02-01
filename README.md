# Mapbox Filter Timeseries Points (Proof of Concept)
Animation of timeseries data via WebGL overlay on Mapbox. Selection of time-related value via [Filters](https://www.mapbox.com/mapbox-gl-style-spec/#types-filter).

## environment
* npm v4.0.2, node v7.2.0
* java v8, mvn v3 

## server module
* `cd server`

### build
* `mvn package`

### start
* `java -jar target/*.jar`

## client module
* `cd client`

### build
0. `npm install`
1. `npm run build`

### start
1. `npm run start`
2. open `http://localhost:3000/`

## references
Discontinued PoC of solving the problem with D3 overlaz
* https://github.com/dnltsk/mapbox-d3-timeseries-points

Mapbox GL Layer:
* https://www.mapbox.com/mapbox-gl-js/example/data-driven-circle-colors/
* https://www.mapbox.com/mapbox-gl-js/example/timeline-animation/

## next steps
* TypeScript please
http://www.jbrantly.com/typescript-and-webpack/
