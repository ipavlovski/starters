// REPL: while true; do deno repl --allow-read; sleep 0; done

import { gpx } from '@tmcw/togeojson'
import { DOMParser } from '@xmldom/xmldom'
import { FeatureCollection, LineString } from 'geojson'
import { readFile, writeFile } from 'node:fs/promises'

const gpxString = await readFile('./data/20240817.gpx', 'utf8')
const gpxData = new DOMParser().parseFromString(gpxString, 'text/xml')
const geojsonData = gpx(gpxData) as FeatureCollection<LineString>

const coords = geojsonData.features[0].geometry.coordinates
const times = geojsonData.features[0].properties?.coordinateProperties.times
const tmp2 = coords.map((v, ind) => [times[ind].slice(0, 23), ...v].join(','))


geojsonData.features[0]
console.dir(geojsonData.features[0].properties?.coordinateProperties.times, { depth: 0 })

await writeFile('tmp.csv', tmp2.join('\n'))
