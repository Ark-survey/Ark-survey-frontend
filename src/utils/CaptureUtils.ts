import { toPng } from "html-to-image";
import { trigger_download } from "./DownloadUtils";

export async function capture(id: string, filename: string) {
  const node = document.getElementById(id)!;
  const url = await toPng(node);
  trigger_download(url, filename);
}