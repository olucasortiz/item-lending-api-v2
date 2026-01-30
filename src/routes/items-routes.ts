import { ItemsController } from "../controllers/item-controller.js"
import { ItemsService } from "../services/items-service.js"
import type { FastifyInstance } from 'fastify'
import { MemoryItemsRepository } from '../repositories/in-memory-items-repository.js'

type GetItemByIdParams = {
  id: string
}
export async function itemsRoutes(app: FastifyInstance) {
    const repository = new MemoryItemsRepository()
    const service = new ItemsService(repository)
    const controller = new ItemsController(service)

    app.post('/items',(request,reply)=>{
        return controller.create(request,reply)
    })

    app.get('/items', (request, reply)=>{
        return controller.list(request,reply)
    })

    app.put<{Params: GetItemByIdParams }>('/items/:id/borrow', (request,reply)=>{
        return controller.borrow(request,reply)
    })
    app.put<{Params: GetItemByIdParams }>('/items/:id/return', (request,reply)=>{
        return controller.returnItem(request,reply)
    })
}