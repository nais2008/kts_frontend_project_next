import { IGitHubReadmeFileModel } from "@/shared/interfaces/readme.interface"
import { marked } from "marked"

export async function parseReadmeToHtml(
  file: IGitHubReadmeFileModel
): Promise<string> {
  const binary = atob(file.content.replace(/\n/g, ""))
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  const decoder = new TextDecoder("utf-8")
  const decoded = decoder.decode(bytes)

  const html = await marked.parse(decoded, { async: true })
  return html
}
