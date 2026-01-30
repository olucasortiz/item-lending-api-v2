
import type { FastifyReply, FastifyRequest } from "fastify"
import type { ItemsService } from "../services/items-service.js"
type GetItemByIdParams = {
  id: string
}
export class ItemsController{
    private itemService:ItemsService

    constructor(itemService: ItemsService){
        this.itemService = itemService
    }

    create(request : any, reply: any){
        const {name,owner} = request.body
        const item = this.itemService.createItem({name,owner})
        return reply.status(201).send(item)
    }

    list(request: FastifyRequest, reply: FastifyReply) {
        const items = this.itemService.listItems()
        return reply.send(items)
    }

    getById(request: FastifyRequest<{Params : GetItemByIdParams}>, reply: FastifyReply){
        const id = request.params.id
        const item = this.itemService.getItemById(id)
        return reply.send(item)
    }

    //const {id} = request.params é a mesma coisa de const id = request.params.id
    //vai ajudar quando houver muitos campos
    //ex: const { id, owner } = request.params

    borrow(request:FastifyRequest<{Params : GetItemByIdParams}>, reply:FastifyReply){
        const {id} = request.params
        const itemAtualizado = this.itemService.borrow(id)
        reply.send(itemAtualizado)
    }

    returnItem(request:FastifyRequest<{Params: GetItemByIdParams}>, reply:FastifyReply){
        const {id} = request.params
        const itemAtualizado = this.itemService.returnItem(id)
        reply.send(itemAtualizado)
    }
}