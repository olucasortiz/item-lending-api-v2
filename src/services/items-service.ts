import { AppError } from '../errors/app-error.js'
import type { Item, CreateItemInput, CreateItemData } from '../domain/items.js'
import type { ItemsRepository } from '../repositories/items-repository.js'

export class ItemsService {
  private itemsRepository: ItemsRepository

  constructor(itemsRepository: ItemsRepository) {
    this.itemsRepository = itemsRepository
  }

  async createItem({ name, owner }: CreateItemInput): Promise<Item> {
    if (!name || name.trim() === '') throw new AppError('Name is required', 400)
    if (!owner || owner.trim() === '') throw new AppError('Owner is required', 400)

    const itemData: CreateItemData = {
      name: name.trim(),
      owner: owner.trim(),
      isBorrowed: false,
    }

    return await this.itemsRepository.create(itemData)
  }

  async listItems(): Promise<Item[]> {
    return await this.itemsRepository.findAll()
  }

  async getItemById(id: string): Promise<Item> {
    if (!id || id.trim() === '') throw new AppError('Id is required', 400)

    const item = await this.itemsRepository.findById(id)
    if (!item) throw new AppError('Item not found', 404)

    return item
  }

  async borrow(id: string): Promise<Item> {
    if (!id || id.trim() === '') throw new AppError('Id is required', 400)

    const item = await this.itemsRepository.findById(id)
    if (!item) throw new AppError('Item not found', 404)

    if (item.isBorrowed) throw new AppError('Item is already borrowed', 409)

    const updated: Item = { ...item, isBorrowed: true }
    const saved = await this.itemsRepository.update(updated)
    if (!saved) throw new AppError('Item not found', 404)

    return saved
  }

  async returnItem(id: string): Promise<Item> {
    if (!id || id.trim() === '') throw new AppError('Id is required', 400)

    const item = await this.itemsRepository.findById(id)
    if (!item) throw new AppError('Item not found', 404)

    if (item.isBorrowed === false) throw new AppError('This Item is not borrowed', 409)

    const updated: Item = { ...item, isBorrowed: false }
    const saved = await this.itemsRepository.update(updated)
    if (!saved) throw new AppError('Item not found', 404)

    return saved
  }
}
