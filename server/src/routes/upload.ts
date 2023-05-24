import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { createWriteStream, unlink } from 'fs'
import { resolve, extname } from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'

const pump = promisify(pipeline)

export default async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (req, res) => {
    const upload = await req.file({
      limits: { fileSize: 5_242_880 /* 5mb */ },
    })

    if (!upload) return res.status(400).send()

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFileFormat) return res.status(400).send()

    const fileId = randomUUID()
    const extension = extname(upload.filename)

    const fileName = fileId.concat(extension)

    const writeStream = createWriteStream(
      resolve(__dirname, '..', '..', 'uploads', fileName),
    )

    await pump(upload.file, writeStream)

    const fullUrl = req.protocol.concat('://').concat(req.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return { fileUrl }
  })

  app.delete('/upload/:fileName', async (req) => {
    const { fileName } = req.params as { fileName: string }

    await promisify(unlink)(resolve(__dirname, '..', '..', 'uploads', fileName))
  })
}
