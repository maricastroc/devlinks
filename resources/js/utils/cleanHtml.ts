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
    .replace(/<p><br><\/p>/g, '') // Remove `<p>` com `<br>`
    .replace(/<br>/g, '') // Remove `<br>` soltos
  
  return html;
}
