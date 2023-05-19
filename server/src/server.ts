import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'

import memoriesRoutes from './routes/memories'
import authRoutes from './routes/auth'
import uploadRoutes from './routes/upload'
import { resolve } from 'path'

const app = fastify()

app.register(multipart)

app.register(fastifyStatic, {
  prefix: '/uploads',
  root: resolve(__dirname, '../uploads'),
})

app.register(cors, { origin: true })
// todas as URLs de front-end poderão acessar nosso back-end
// origin: ['site1', 'site2'...] para especificar permissões

app.register(jwt, { secret: 'spacetime' })

app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadRoutes)

app
  .listen({ host: '0.0.0.0', port: 3333 })
  .then(() => console.log('🚀 HTTP server running on http://localhost:3333'))
