
import type { Item, CreateItemInput, CreateItemData } from '../domain/items.js'

export interface ItemsRepository{
    create(data: CreateItemData): Item
    findAll(): Item[]
    findById(id: string): Item | null
    update(item: Item): Item | null
}