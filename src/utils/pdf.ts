import * as pdfjs from 'pdfjs-dist'
import PdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjs.GlobalWorkerOptions.workerSrc = PdfWorker

// A single positioned text run from a PDF page.
interface TextItem {
  str: string
  transform: number[]
  width: number
  height: number
  hasEOL: boolean
}

// A resolved hyperlink annotation, with its bounding box in PDF user space.
interface LinkRegion {
  url: string
  rect: [number, number, number, number]
}

// Returns the URL whose annotation rectangle contains the text run's centre,
// or null when the run isn't part of any link.
function findLinkForItem(item: TextItem, links: LinkRegion[]): string | null {
  const centerX = item.transform[4] + item.width / 2
  const centerY = item.transform[5] + item.height / 2

  for (const link of links) {
    const [x1, y1, x2, y2] = link.rect
    const withinX = centerX >= Math.min(x1, x2) && centerX <= Math.max(x1, x2)
    const withinY = centerY >= Math.min(y1, y2) && centerY <= Math.max(y1, y2)
    if (withinX && withinY) return link.url
  }

  return null
}

/**
 * Extracts the text of a PDF while preserving embedded hyperlinks.
 *
 * Plain text extractors read only the content stream, so a clickable label like
 * "github" loses its destination — the URL lives in a separate Link annotation.
 * This reads both and inlines the URL after its linked text, e.g. `github
 * (https://github.com/jdoe)`, so the destination survives into downstream parsing.
 */
export async function extractResumeText(file: File): Promise<string> {
  const data = await file.arrayBuffer()
  const pdf = await pdfjs.getDocument({ data }).promise

  let output = ''

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum)
    const [content, annotations] = await Promise.all([
      page.getTextContent(),
      page.getAnnotations(),
    ])

    const links: LinkRegion[] = annotations
      .filter((a) => a.subtype === 'Link' && (a.url || a.unsafeUrl))
      .map((a) => ({ url: a.url ?? a.unsafeUrl, rect: a.rect }))

    const items = content.items.filter(
      (item) => 'str' in item,
    ) as unknown as TextItem[]

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      output += item.str

      const url = findLinkForItem(item, links)
      const nextUrl =
        i + 1 < items.length ? findLinkForItem(items[i + 1], links) : null
      if (url && url !== nextUrl) output += ` (${url})`

      if (item.hasEOL) output += '\n'
    }

    output += '\n'
  }

  return output.trim()
}
