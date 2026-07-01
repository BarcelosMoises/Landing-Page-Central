const fs = require('fs');
const path = require('path');

async function gerar() {
  console.log("Baixando coordenadas oficiais...");
  try {
    const response = await fetch('https://unpkg.com/@svg-maps/brazil');
    const data = await response.text();
    const content = data.replace(/export\s+default/g, 'return');
    const getMapa = new Function(content);
    const mapa = getMapa();

    const paths = mapa.locations.map(loc => ({
      sigla: loc.id.toUpperCase(),
      nome: loc.name,
      d: loc.path
    }));

    const fileContent = `export const MAPA_PATHS = ${JSON.stringify(paths, null, 2)};`;

    fs.writeFileSync(path.join(__dirname, 'data', 'mapa-paths.ts'), fileContent);
    console.log("Arquivo data/mapa-paths.ts gerado com coordenadas perfeitas!");
  } catch (e) {
    console.error("Erro:", e);
  }
}

gerar();