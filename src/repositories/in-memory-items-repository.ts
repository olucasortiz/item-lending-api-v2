import { randomUUID } from 'node:crypto'
import type { CreateItemData, Item } from '../domain/items.js'
import type { ItemsRepository } from './items-repository.js'

export class MemoryItemsRepository implements ItemsRepository {
  private items: Map<string, Item> = new Map()

  async create(data: CreateItemData): Promise<Item> {
    const id = randomUUID()

    const item: Item = {
      id,
      ...data,
    }

    this.items.set(id, item)
    return item
  }

  async findAll(): Promise<Item[]> {
    return Array.from(this.items.values())
  }

  async findById(id: string): Promise<Item | null> {
    return this.items.get(id) ?? null
  }

  async update(item: Item): Promise<Item | null> {
    if (!this.items.has(item.id)) return null
    this.items.set(item.id, item)
    return item
  }
}
