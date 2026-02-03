import 'dotenv/config'
import Fastify from 'fastify'
import { AppError } from './errors/app-error.js'
import { itemsRoutes } from './routes/items-routes.js'
const app = Fastify()

const PORT = 3333


app.get('/health', async () => {
  return { status: 'ok' }
})



app.setErrorHandler((error,request,reply)=>{
    if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: error.message
      })
    }
    console.log(error)
    return reply.status(500).send({
        message: 'Internal server error'
    })
})


app.register(itemsRoutes)


try {
  const address = await app.listen({ port: PORT, host: '0.0.0.0' })
  console.log(`Server running at ${address}`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}

