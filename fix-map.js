const https = require('https');
const fs = require('fs');
const path = require('path');

console.log("Baixando mapa do Brasil OTIMIZADO (leve)...");

// Busca um pacote de SVG focado 100% em UI/Web (traços simplificados)
https.get('https://unpkg.com/@svg-maps/brazil@1.0.1/brazil.js', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {

    // Captura apenas os IDs e os caminhos (d) das linhas otimizadas
    const regex = /id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*path:\s*"([^"]+)"/g;
    let match;
    let paths = '';

    while ((match = regex.exec(data)) !== null) {
      const sigla = match[1].toUpperCase();
      const d = match[3]; // Aqui estão as coordenadas simplificadas

      paths += `
            {/* ${sigla} */}
            <path
              id="${sigla.toLowerCase()}"
              aria-label={NOME_TODOS_ESTADOS["${sigla}"] ?? "${match[2]}"}
              d="${d}"
              style={{ fill: getEstadoFill("${sigla}"), opacity: getEstadoOpacity("${sigla}"), transition: "fill 200ms ease, opacity 200ms ease", cursor: "pointer", stroke: "#1a0000", strokeWidth: 1.5 }}
              onMouseEnter={(e) => handleMouseEnter("${sigla}", e)}
              onMouseMove={(e) => handleMouseMove("${sigla}", e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleClick("${sigla}", e)}
              onTouchStart={(e) => handleTouch("${sigla}", e)}
              role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick("${sigla}", e as unknown as React.MouseEvent<SVGPathElement>); }}
            />`;
    }

    const file = path.join(process.cwd(), 'components', 'MapaAtuacao.tsx');
    if (!fs.existsSync(file)) {
        console.error("Erro: Arquivo components/MapaAtuacao.tsx não encontrado!");
        return;
    }

    let content = fs.readFileSync(file, 'utf8');

    // Mantém a correção do TypeScript (caso não tenha sido feita)
    content = content.replace(/new Set\(\s*estadosAtuacao/, 'new Set<string>(\n  estadosAtuacao');

    // Substitui todo o bloco <svg> ... </svg> pelo SVG leve e com o viewBox correto para este mapa
    content = content.replace(
      /(<svg[^>]*viewBox=")([^"]*)("[^>]*>)([\s\S]*?)(<\/svg>)/,
      `$10 0 613 639$3${paths}\n          $5`
    );

    fs.writeFileSync(file, content);
    console.log("Mapa LEVE instalado com sucesso! O DOM agora está limpo e rápido.");
  });
}).on("error", (err) => {
    console.error("Erro ao baixar o mapa leve:", err.message);
});