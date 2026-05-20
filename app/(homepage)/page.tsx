// Re-exporta a página principal de app/page.tsx para o grupo de rotas (homepage).
// O Next.js App Router usa o arquivo mais próximo da rota — este arquivo
// é a entrada canônica de "/" dentro do grupo (homepage).
// Conteúdo idêntico ao app/page.tsx original; movido para cá para que
// o layout.tsx deste grupo possa renderizar o Footer com paleta padrão.
export { default } from "../page";
