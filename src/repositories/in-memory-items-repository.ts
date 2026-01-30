import { randomUUID } from 'node:crypto'
import type { CreateItemData, Item } from '../domain/items.js'
import type { ItemsRepository } from './items-repository.js'

export class MemoryItemsRepository implements ItemsRepository {
  private items: Map<string, Item> = new Map()

  create(data: CreateItemData): Item {
    const id = randomUUID()

    const item: Item = {
      id,
      ...data
    }

    this.items.set(id, item)
    return item
  }

  findAll(): Item[] {
    return Array.from(this.items.values())
  }

  findById(id: string): Item | null {
    const item = this.items.get(id)
    if(item!= undefined)
        return item
    else return null
  }
  update(item: Item): Item | null {
      if(!this.items.has(item.id))
        return null
      this.items.set(item.id,item)
      return item
  }
}
