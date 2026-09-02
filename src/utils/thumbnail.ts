import { pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export async function pdfBlobToThumbnail(
  blob: Blob,
  targetWidth = 500,
): Promise<Blob> {
  const data = await blob.arrayBuffer()
  const pdf = await pdfjs.getDocument({ data }).promise

  try {
    const page = await pdf.getPage(1)
    const scale = targetWidth / page.getViewport({ scale: 1 }).width
    const viewport = page.getViewport({ scale })

    const canvas = document.createElement('canvas')
    canvas.width = Math.ceil(viewport.width)
    canvas.height = Math.ceil(viewport.height)

    const context = canvas.getContext('2d')
    if (!context) throw new Error('Could not get 2d canvas context')

    await page.render({ canvas, canvasContext: context, viewport }).promise

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (out) =>
          out ? resolve(out) : reject(new Error('canvas.toBlob returned null')),
        'image/webp',
        0.8,
      )
    })
  } finally {
    void pdf.destroy()
  }
}
