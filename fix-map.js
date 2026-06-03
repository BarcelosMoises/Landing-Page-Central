const https = require('https');
const fs = require('fs');
const path = require('path');

const geojsonUrl = 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson';

console.log("Baixando mapa do Brasil em alta resolução...");

https.get(geojsonUrl, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const geojson = JSON.parse(data);

    // Projeção Mercator calculada perfeitamente para o Brasil
    const width = 800, height = 800;
    const minLon = -74.0, maxLon = -32.0;
    const minLat = -34.0, maxLat = 5.5;
    const lonRange = maxLon - minLon;

    function project(lon, lat) {
      const x = ((lon - minLon) / lonRange) * width;
      const latRad = lat * Math.PI / 180;
      const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
      const minMercN = Math.log(Math.tan((Math.PI / 4) + (minLat * Math.PI / 180 / 2)));
      const maxMercN = Math.log(Math.tan((Math.PI / 4) + (maxLat * Math.PI / 180 / 2)));
      const y = height - ((mercN - minMercN) / (maxMercN - minMercN) * height);
      return [x, y];
    }

    let paths = '';

    geojson.features.forEach(feature => {
      const sigla = feature.properties.sigla.toUpperCase();
      let d = '';
      const geom = feature.geometry;

      const processPolygon = (ring) => {
        ring.forEach((coord, i) => {
          const [x, y] = project(coord[0], coord[1]);
          if (i === 0) d += `M ${x.toFixed(1)} ${y.toFixed(1)} `;
          else d += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
        });
        d += 'Z ';
      };

      if (geom.type === 'Polygon') {
        geom.coordinates.forEach(processPolygon);
      } else if (geom.type === 'MultiPolygon') {
        geom.coordinates.forEach(polygon => polygon.forEach(processPolygon));
      }

      paths += `
            {/* ${sigla} */}
            <path
              id="${sigla.toLowerCase()}"
              aria-label={NOME_TODOS_ESTADOS["${sigla}"] ?? "${feature.properties.name}"}
              d="${d.trim()}"
              style={{ fill: getEstadoFill("${sigla}"), opacity: getEstadoOpacity("${sigla}"), transition: "fill 200ms ease, opacity 200ms ease", cursor: "pointer", stroke: "#1a0000", strokeWidth: 0.5 }}
              onMouseEnter={(e) => handleMouseEnter("${sigla}", e)}
              onMouseMove={(e) => handleMouseMove("${sigla}", e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleClick("${sigla}", e)}
              onTouchStart={(e) => handleTouch("${sigla}", e)}
              role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick("${sigla}", e as unknown as React.MouseEvent<SVGPathElement>); }}
            />`;
    });

    const file = path.join(process.cwd(), 'components', 'MapaAtuacao.tsx');
    if (!fs.existsSync(file)) {
        console.error("Erro: Arquivo components/MapaAtuacao.tsx não encontrado!");
        return;
    }

    let content = fs.readFileSync(file, 'utf8');

    // 1. Corrige o Erro do TypeScript adicionando <string>
    content = content.replace(/new Set\(\s*estadosAtuacao/, 'new Set<string>(\n  estadosAtuacao');

    // 2. Substitui o viewBox antigo e limpa o SVG desenhado incorretamente pela IA anterior
    content = content.replace(
      /(<svg[^>]*viewBox=")([^"]*)("[^>]*>)([\s\S]*?)(<\/svg>)/,
      `$10 0 800 800$3${paths}\n          $5`
    );

    fs.writeFileSync(file, content);
    console.log("✅ SVG do Mapa atualizado e erro de compilação da Vercel corrigido com sucesso!");
  });
}).on("error", (err) => {
    console.error("Erro ao baixar os dados geográficos:", err.message);
});