# Mapbox D3 Timeseries Points (Proof of Concept)
Timeseries data as D3 overlay on Mapbox

**STATUS: discontinued because d3 can't handle >=10k circles efficiently!**

[!]

=> Mapbox GL together with [Filters](https://www.mapbox.com/mapbox-gl-style-spec/#types-filter) looks more promissing!

## environment
* npm v4.0.2
* node v7.2.0

## build
* `npm install`
* `npm run build`

## start
1. `npm run start`
2. open http://localhost:3000/

## references
General:
* Using mapbox-gl and webpack together
https://mikewilliamson.wordpress.com/2016/02/24/using-mapbox-gl-and-webpack-together/

D3 Overlay:
* Mapbox-gl -> d3 projection
https://bl.ocks.org/enjalot/1ed5d9795b82f846759f89029b0b8ff3

Mapbox GL Layer:
* https://www.mapbox.com/mapbox-gl-js/example/data-driven-circle-colors/
* https://www.mapbox.com/mapbox-gl-js/example/timeline-animation/

## next steps
* TypeScript please
http://www.jbrantly.com/typescript-and-webpack/