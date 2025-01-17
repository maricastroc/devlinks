export function cleanHTML(html: string): string {
  // Preserve classes de fontes (como ql-font-monospace)
  html = html.replace(/<span class="ql-font-(monospace|sans-serif|serif)">/g, (match) => {
    // Retorna a tag com a classe sem alteração
    return match;
  });

  // Limpa as tags vazias <p> e outros elementos indesejados
  html = html
    .replace(/<p>(\s|&nbsp;)*<\/p>/g, '') // Remove `<p>` vazios
    .replace(/<p>(.*?)<\/p>/g, '$1') // Remove `<p>` ao redor de texto simples

    // Adiciona classes de margem para h1, h2 e h3
    .replace(/<h1>/g, '<h1 class="mt-4 mb-2">') // Adiciona classes para `<h1>`
    .replace(/<h2>/g, '<h2 class="mt-4 mb-2">') // Adiciona classes para `<h2>`
    .replace(/<h3>/g, '<h3 class="mt-4 mb-2">'); // Adiciona classes para `<h3>`

  return html;
}