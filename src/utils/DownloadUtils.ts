export function trigger_download(url: string, filename: string) {
  const link = document.createElement("a");
  document.body.appendChild(link);
  link.setAttribute("download", filename);
  link.setAttribute("href", url);
  link.click();
  document.body.removeChild(link);
}