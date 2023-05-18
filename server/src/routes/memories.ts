import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (req) => req.jwtVerify())

  app.get('/memories', async (req) => {
    const memories = await prisma.memory.findMany({
      orderBy: { createdAt: 'asc' },
      where: { userId: req.user.sub },
    })

    return memories.map(({ id, coverUrl, content }) => {
      if (content.length > 115) {
        return {
          id,
          coverUrl,
          excerpt: content.substring(0, 115).concat('...'),
        }
      }

      return { id, coverUrl, excerpt: content }
    })
  })

  app.get('/memories/:id', async ({ params, user }, res) => {
    const paramsSchema = z.object({ id: z.string().uuid() })

    const { id } = paramsSchema.parse(params)

    const memory = await prisma.memory.findUniqueOrThrow({ where: { id } })

    if (!memory.isPublic && memory.userId !== user.sub) {
      return res.status(401).send()
    }

    return memory
  })

  app.post('/memories', async ({ body, user }) => {
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
        userId: user.sub,
      },
    })
  })

  app.put('/memories/:id', async ({ body, params, user }, res) => {
    const paramsSchema = z.object({ id: z.string().uuid() })

    const { id } = paramsSchema.parse(params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(body)

    const memory = await prisma.memory.findUniqueOrThrow({ where: { id } })

    if (memory.userId !== user.sub) {
      return res.status(401).send()
    }

    return await prisma.memory.update({
      where: { id },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })
  })

  app.delete('/memories/:id', async ({ params, user }, res) => {
    const paramsSchema = z.object({ id: z.string().uuid() })

    const { id } = paramsSchema.parse(params)

    const memory = await prisma.memory.findUniqueOrThrow({ where: { id } })

    if (memory.userId !== user.sub) {
      return res.status(401).send()
    }

    await prisma.memory.delete({ where: { id } })
  })
}
