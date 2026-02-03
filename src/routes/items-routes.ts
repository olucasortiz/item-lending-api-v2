import type { FastifyInstance } from 'fastify'
import { ItemsController } from '../controllers/item-controller.js'
import { ItemsService } from '../services/items-service.js'
import { PrismaItemsRepository } from '../repositories/prisma-items-repository.js'

type GetItemByIdParams = { id: string }

export async function itemsRoutes(app: FastifyInstance) {
  const repository = new PrismaItemsRepository()
  const service = new ItemsService(repository)
  const controller = new ItemsController(service)

  app.post('/items', async (request, reply) => {
    return await controller.create(request, reply)
  })

  app.get('/items', async (request, reply) => {
    return await controller.list(request, reply)
  })

  app.get<{ Params: GetItemByIdParams }>('/items/:id', async (request, reply) => {
    return await controller.getById(request, reply)
  })

  app.put<{ Params: GetItemByIdParams }>('/items/:id/borrow', async (request, reply) => {
    return await controller.borrow(request, reply)
  })

  app.put<{ Params: GetItemByIdParams }>('/items/:id/return', async (request, reply) => {
    return await controller.returnItem(request, reply)
  })
}
