import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () =>
    (await prisma.memory.findMany({ orderBy: { createdAt: 'asc' } })).map(
      ({ id, coverUrl, content }) => {
        if (content.length > 115) {
          return {
            id,
            coverUrl,
            excerpt: content.substring(0, 115).concat('...'),
          }
        }

        return { id, coverUrl, excerpt: content }
      },
    ),
  )

  app.get('/memories/:id', async ({ params }) => {
    const paramsSchema = z.object({ id: z.string().uuid() })

    const { id } = paramsSchema.parse(params)

    return await prisma.memory.findUniqueOrThrow({ where: { id } })
  })

  app.post('/memories', async ({ body }) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(body)

    return await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: 'be8c29b6-c99d-4c78-9d75-19aa6ff5b2a0',
      },
    })
  })

  app.put('/memories/:id', async ({ body, params }) => {
    const paramsSchema = z.object({ id: z.string().uuid() })

    const { id } = paramsSchema.parse(params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(body)

    return await prisma.memory.update({
      where: { id },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })
  })

  app.delete('/memories/:id', async ({ params }) => {
    const paramsSchema = z.object({ id: z.string().uuid() })

    const { id } = paramsSchema.parse(params)

    await prisma.memory.delete({ where: { id } })
  })
}
