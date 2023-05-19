import axios from 'axios'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

export default async function authRoutes(app: FastifyInstance) {
  app.post('/register', async ({ body }) => {
    const bodySchema = z.object({ code: z.string() })

    const { code } = bodySchema.parse(body)

    const accessTokenResponse = await axios.post(
      'http://github.com/login/oauth/access_token',
      null,
      {
        params: {
          code,
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
        },
        headers: { Accept: 'application/json' },
      },
    )

    const { access_token: accessToken } = accessTokenResponse.data

    const { data } = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const {
      avatar_url: avatarUrl,
      id: githubId,
      login,
      name,
    } = userSchema.parse(data)

    let user = await prisma.user.findUnique({
      where: { githubId },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          avatarUrl,
          githubId,
          login,
          name,
        },
      })
    }

    const token = app.jwt.sign(
      { name, avatarUrl },
      { sub: user.id, expiresIn: '30 days' },
    )

    return { token }
  })
}
