import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ItemsService } from '../services/items-service.js'

type GetItemByIdParams = { id: string }

export class ItemsController {
  private itemService: ItemsService

  constructor(itemService: ItemsService) {
    this.itemService = itemService
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { name, owner } = request.body as { name: string; owner: string }
    const item = await this.itemService.createItem({ name, owner })
    return reply.status(201).send(item)
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    const items = await this.itemService.listItems()
    return reply.send(items)
  }

  async getById(
    request: FastifyRequest<{ Params: GetItemByIdParams }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params
    const item = await this.itemService.getItemById(id)
    return reply.send(item)
  }

  async borrow(
    request: FastifyRequest<{ Params: GetItemByIdParams }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params
    const itemAtualizado = await this.itemService.borrow(id)
    return reply.send(itemAtualizado)
  }

  async returnItem(
    request: FastifyRequest<{ Params: GetItemByIdParams }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params
    const itemAtualizado = await this.itemService.returnItem(id)
    return reply.send(itemAtualizado)
  }
}
