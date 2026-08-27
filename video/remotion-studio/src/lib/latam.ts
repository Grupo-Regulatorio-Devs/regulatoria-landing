/**
 * Stylised Latin America outline.
 *
 * A hand-simplified coastline ring in [longitude, latitude] pairs, drawn as a
 * single closed loop: US border → Gulf of Mexico → Yucatán → Central American
 * Caribbean → Colombia/Venezuela → Guianas → Brazil → Río de la Plata →
 * Patagonia → Cape Horn → Chile/Peru/Ecuador Pacific → Central American
 * Pacific → mainland Mexico → Baja California → back to Tijuana.
 *
 * It is deliberately coarse — roughly 130 points for a continent — so it reads
 * as a graphic silhouette, not a cartographic claim. Island groups (Caribbean,
 * Galápagos, Malvinas/Falklands) are omitted.
 */
export const LATAM_RING: [number, number][] = [
  // Northern border of Mexico, west → east
  [-117.1, 32.5],
  [-114.8, 32.5],
  [-111.0, 31.3],
  [-108.2, 31.3],
  [-106.5, 31.8],
  [-103.1, 29.0],
  [-101.4, 29.8],
  [-99.5, 27.6],
  [-97.4, 25.9],
  // Gulf of Mexico coast, north → south
  [-97.7, 22.3],
  [-96.4, 19.2],
  [-94.5, 18.2],
  [-92.0, 18.7],
  // Yucatán peninsula
  [-90.6, 19.9],
  [-90.3, 21.1],
  [-88.0, 21.6],
  [-86.8, 21.2],
  [-87.5, 19.6],
  [-88.3, 18.5],
  // Central American Caribbean
  [-88.9, 15.9],
  [-87.0, 15.9],
  [-83.9, 15.0],
  [-83.2, 12.4],
  [-83.7, 10.9],
  [-82.2, 9.0],
  [-79.0, 9.4],
  [-77.4, 8.7],
  [-76.9, 8.0],
  // Colombian and Venezuelan Caribbean
  [-75.6, 9.4],
  [-74.2, 11.1],
  [-71.7, 12.4],
  [-71.0, 11.7],
  [-70.2, 12.2],
  [-68.4, 11.2],
  [-64.2, 10.6],
  [-62.0, 10.7],
  [-60.0, 8.6],
  // Guianas
  [-58.1, 6.8],
  [-55.2, 6.0],
  [-51.7, 4.2],
  [-50.0, 1.8],
  // Brazilian north and east coast
  [-48.5, -0.7],
  [-44.3, -2.5],
  [-41.8, -2.9],
  [-38.5, -3.7],
  [-35.2, -5.8],
  [-34.8, -7.2],
  [-35.5, -9.7],
  [-37.1, -11.3],
  [-38.5, -13.0],
  [-39.0, -15.9],
  [-39.7, -18.6],
  [-41.0, -21.9],
  [-44.7, -23.4],
  [-48.5, -25.9],
  [-48.6, -28.5],
  [-50.4, -30.9],
  [-52.3, -32.2],
  [-53.4, -33.7],
  // Uruguay and the Río de la Plata
  [-56.2, -34.9],
  [-57.6, -35.4],
  // Argentine Atlantic coast and Patagonia
  [-57.2, -38.0],
  [-62.3, -38.9],
  [-62.2, -40.9],
  [-65.0, -42.0],
  [-64.0, -43.5],
  [-65.7, -45.0],
  [-67.6, -46.0],
  [-67.7, -49.3],
  [-68.9, -50.3],
  [-68.5, -52.4],
  [-69.6, -52.6],
  [-70.9, -54.9],
  [-68.6, -54.9],
  [-71.0, -55.9],
  // Chilean Pacific coast, south → north
  [-74.7, -52.6],
  [-75.6, -48.7],
  [-74.9, -45.9],
  [-73.8, -43.4],
  [-73.6, -41.8],
  [-73.2, -39.4],
  [-72.0, -36.6],
  [-71.6, -33.6],
  [-70.9, -30.0],
  [-70.5, -25.4],
  [-70.4, -23.5],
  [-70.2, -21.0],
  [-70.3, -18.5],
  // Peru and Ecuador
  [-76.2, -14.0],
  [-77.0, -12.1],
  [-79.0, -8.1],
  [-81.3, -6.1],
  [-80.9, -4.2],
  [-80.9, -2.2],
  [-80.0, -1.0],
  [-79.7, 0.9],
  // Colombian Pacific
  [-78.8, 2.5],
  [-77.9, 4.0],
  [-77.4, 6.0],
  // Central American Pacific
  [-78.2, 7.5],
  [-80.5, 8.2],
  [-82.9, 8.1],
  [-84.9, 9.8],
  [-86.0, 11.2],
  [-87.7, 13.4],
  [-90.1, 13.9],
  [-92.3, 15.0],
  [-94.5, 16.2],
  [-96.5, 15.7],
  [-99.9, 16.7],
  [-102.2, 17.9],
  [-104.7, 19.2],
  [-105.7, 20.4],
  // Mexican Pacific coast up to the Gulf of California
  [-108.9, 25.6],
  [-109.9, 27.1],
  [-112.2, 28.9],
  [-113.1, 31.0],
  [-114.6, 31.7],
  // Baja California: down the eastern shore, around Cabo, back up the west
  [-114.0, 30.0],
  [-112.9, 27.9],
  [-111.4, 25.6],
  [-110.0, 24.2],
  [-109.4, 23.1],
  [-110.3, 23.6],
  [-112.1, 25.5],
  [-114.3, 27.8],
  [-115.8, 29.9],
];

export type Projector = (lon: number, lat: number) => { x: number; y: number };

/**
 * Builds an equirectangular projector that fits the whole ring inside
 * `boxWidth` × `boxHeight`, preserving aspect ratio and centring the result.
 */
export const createProjector = (
  boxX: number,
  boxY: number,
  boxWidth: number,
  boxHeight: number,
): Projector => {
  const lons = LATAM_RING.map((p) => p[0]);
  const lats = LATAM_RING.map((p) => p[1]);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);

  const spanLon = maxLon - minLon;
  const spanLat = maxLat - minLat;
  const scale = Math.min(boxWidth / spanLon, boxHeight / spanLat);

  const offsetX = boxX + (boxWidth - spanLon * scale) / 2;
  const offsetY = boxY + (boxHeight - spanLat * scale) / 2;

  return (lon, lat) => ({
    x: offsetX + (lon - minLon) * scale,
    y: offsetY + (maxLat - lat) * scale,
  });
};

export const buildPath = (project: Projector): string => {
  const d = LATAM_RING.map(([lon, lat], i) => {
    const { x, y } = project(lon, lat);
    return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
  return `${d} Z`;
};
