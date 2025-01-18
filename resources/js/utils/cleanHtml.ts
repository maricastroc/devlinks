export function cleanHTML(html: string): string {
  // Preserve classes de fontes (como ql-font-monospace)
  html = html.replace(/<span class="ql-font-(monospace|sans-serif|serif)">/g, (match) => {
    return match; // Retorna a tag com a classe sem alteração
  });

  html = html.replace(/<p>(.*?)<\/p>/g, (match, content) => {
    const trimmedContent = content.trim();
    return trimmedContent ? `${trimmedContent}<br>` : '';
  });

  html = html
    .replace(/<h1>/g, '<h1 class="mt-1 mb-1">') // Adiciona classes para <h1>
    .replace(/<h2>/g, '<h2 class="mt-1 mb-1">') // Adiciona classes para <h2>
    .replace(/<h3>/g, '<h3 class="mt-1 mb-1">'); // Adiciona classes para <h3>

  // Remove margens top e bottom dos parágrafos, se ainda existirem
  html = html.replace(/<p>/g, '<p class="m-0">');

  html = html.replace(/(<br\s*\/?>\s*){2,}/g, '<p class="mt-4 mb-4">');

  return html;
}