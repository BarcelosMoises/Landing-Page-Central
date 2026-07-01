const https = require('https');
const fs = require('fs');
const path = require('path');

console.log("Baixando mapa do Brasil OTIMIZADO...");

https.get('https://unpkg.com/@svg-maps/brazil@1.0.1/brazil.js', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    let paths = '';

    // Separa o texto em pequenos blocos, garantindo que vai pegar cada estado
    const blocos = data.match(/\{[^{}]*id:\s*['"][a-z]{2}['"][^{}]*\}/gi);

    if (!blocos || blocos.length === 0) {
        console.error("Erro: Não foi possível ler as coordenadas do arquivo.");
        return;
    }

    blocos.forEach(bloco => {
      // Extrai o ID e o PATH de forma inteligente, independente da ordem
      const idMatch = bloco.match(/id:\s*['"]([a-z]{2})['"]/i);
      const pathMatch = bloco.match(/path:\s*['"]([^'"]+)['"]/i);
      const nameMatch = bloco.match(/name:\s*['"]([^'"]+)['"]/i);

      if (idMatch && pathMatch) {
        const sigla = idMatch[1].toUpperCase();
        const d = pathMatch[1]; // Aqui estão as coordenadas do estado
        const nome = nameMatch ? nameMatch[1] : sigla;

        paths += `
            {/* ${sigla} */}
            <path
              id="${sigla.toLowerCase()}"
              aria-label={NOME_TODOS_ESTADOS["${sigla}"] ?? "${nome}"}
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
    });

    const file = path.join(process.cwd(), 'components', 'MapaAtuacao.tsx');
    if (!fs.existsSync(file)) {
        console.error("Erro: Arquivo components/MapaAtuacao.tsx não encontrado!");
        return;
    }

    let content = fs.readFileSync(file, 'utf8');

    // Substitui o miolo do SVG vazio pelas coordenadas corretas
    content = content.replace(
      /(<svg[^>]*viewBox=")([^"]*)("[^>]*>)([\s\S]*?)(<\/svg>)/,
      `$10 0 613 639$3${paths}\n          $5`
    );

    fs.writeFileSync(file, content);
    console.log(`✅ Sucesso! Foram inseridos ${blocos.length} estados no código. O mapa agora vai aparecer.`);
  });
}).on("error", (err) => {
    console.error("Erro de conexão:", err.message);
});