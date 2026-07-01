const fs = require('fs');
const path = require('path');

async function consertarMapa() {
  console.log("Baixando mapa do Brasil OTIMIZADO...");

  try {
    const response = await fetch('https://unpkg.com/@svg-maps/brazil');
    if (!response.ok) throw new Error(`Erro na conexão: ${response.status}`);

    let data = await response.text();

    // O segredo: trocar "export default" por "return" no texto baixado.
    // Assim o Node.js para de reclamar de módulos e nos entrega o objeto pronto!
    data = data.replace(/export\s+default/g, 'return');

    // Agora executamos com segurança
    const getMapa = new Function(data);
    const mapa = getMapa();

    if (!mapa || !mapa.locations || mapa.locations.length === 0) {
        console.error("Erro: Não foi possível ler as localizações do pacote.");
        return;
    }

    let paths = '';

    mapa.locations.forEach(loc => {
      const sigla = loc.id.toUpperCase();
      const nome = loc.name;
      const d = loc.path; // Coordenadas super leves e formatadas para a web

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
    });

    const file = path.join(process.cwd(), 'components', 'MapaAtuacao.tsx');
    if (!fs.existsSync(file)) {
      console.error("Erro: Arquivo components/MapaAtuacao.tsx não encontrado!");
      return;
    }

    let content = fs.readFileSync(file, 'utf8');

    // Substituição 100% segura para encontrar as tags <svg> e </svg> e o miolo
    const svgOpenStart = content.indexOf('<svg');
    const svgOpenEnd = content.indexOf('>', svgOpenStart);
    const svgCloseStart = content.indexOf('</svg>', svgOpenEnd);

    if (svgOpenStart !== -1 && svgOpenEnd !== -1 && svgCloseStart !== -1) {
        let svgTag = content.substring(svgOpenStart, svgOpenEnd + 1);

        // Garante que o enquadramento do mapa (viewBox) está perfeitamente ajustado
        if (svgTag.includes('viewBox=')) {
            svgTag = svgTag.replace(/viewBox="[^"]*"/, 'viewBox="0 0 613 639"');
        } else {
            svgTag = svgTag.replace('<svg', '<svg viewBox="0 0 613 639"');
        }

        // Reconstrói o arquivo
        content = content.substring(0, svgOpenStart) +
                  svgTag +
                  '\n' + paths + '\n        ' +
                  content.substring(svgCloseStart);

        fs.writeFileSync(file, content);
        console.log(`✅ Sucesso absoluto! Foram inseridos ${mapa.locations.length} estados no código.`);
        console.log("👉 Verifique o seu navegador. O mapa vai aparecer na tela com as formas perfeitamente detalhadas e super leve!");
    } else {
        console.error("Erro: Não encontrei as tags <svg> e </svg> no arquivo MapaAtuacao.tsx.");
    }

  } catch (err) {
    console.error("Erro geral:", err.message);
  }
}

consertarMapa();