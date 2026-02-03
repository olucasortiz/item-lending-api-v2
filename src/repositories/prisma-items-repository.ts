import { prisma } from '../infra/prisma.js'
import type { ItemsRepository } from './items-repository.js'
import type { Item } from '../domain/items.js' // ajuste o path do seu type

export class PrismaItemsRepository implements ItemsRepository {
  async create(data: Item): Promise<Item> {
    const created = await prisma.item.create({
      data: {
        id: data.id,
        name: data.name,
        owner: data.owner,
        isBorrowed: data.isBorrowed,
      },
    })

    return created as unknown as Item
  }

  async findAll(): Promise<Item[]> {
    const items = await prisma.item.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return items as unknown as Item[]
  }

  async findById(id: string): Promise<Item | null> {
    const item = await prisma.item.findUnique({
      where: { id },
    })

    return (item as unknown as Item) ?? null
  }

  async update(item: Item): Promise<Item> {
    const updated = await prisma.item.update({
      where: { id: item.id },
      data: {
        name: item.name,
        owner: item.owner,
        isBorrowed: item.isBorrowed,
      },
    })

    return updated as unknown as Item
  }
}
