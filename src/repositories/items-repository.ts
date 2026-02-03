import type { Item, CreateItemData } from '../domain/items.js'

export interface ItemsRepository {
  create(data: CreateItemData): Promise<Item>
  findAll(): Promise<Item[]>
  findById(id: string): Promise<Item | null>
  update(item: Item): Promise<Item | null>
}
