export function cleanHTML(html: string): string {
  return html
    .replace(/<p>(\s|&nbsp;)*<\/p>/g, '')
    .replace(/<p>(.*?)<\/p>/g, '$1')
    .replace(/<p><br><\/p>/g, '')
    .replace(/<br>/g, '');
}