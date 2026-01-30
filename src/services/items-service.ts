// src/services/items-service.ts
import { AppError } from '../errors/app-error.js'
import type { Item, CreateItemInput, CreateItemData } from '../domain/items.js'

import type { ItemsRepository } from '../repositories/items-repository.js'

export class ItemsService {
  private itemsRepository: ItemsRepository

  constructor(itemsRepository: ItemsRepository) {
    this.itemsRepository = itemsRepository
  }

  createItem({ name, owner }: CreateItemInput): Item {
    if (!name || name.trim() === '') {
      throw new AppError('Name is required', 400)
    }

    if (!owner || owner.trim() === '') {
      throw new AppError('Owner is required', 400)
    }

    const itemData: CreateItemData = {
      name: name.trim(),
      owner: owner.trim(),
      isBorrowed: false
    }

    return this.itemsRepository.create(itemData)
  }

  listItems():Item[]{
    return this.itemsRepository.findAll()
  }

  getItemById(id: string):Item{
    if(!id || id.trim() === '')
      throw new AppError('Id is required', 400)
    const item = this.itemsRepository.findById(id)
    if(!item)
      throw new AppError('Item not found', 404)
    return item
  }

  borrow(id: string){
    if(!id || id.trim()==='')
      throw new AppError('Id is required', 400)
    const item = this.itemsRepository.findById(id)
    if(!item)
      throw new AppError('Item not found', 404)
    if (item.isBorrowed) {
      throw new AppError('Item is already borrowed', 409)
    }

    const updated: Item={...item, isBorrowed:true}
    const saved = this.itemsRepository.update(updated)
    if(!saved)
      throw new AppError('Item not found', 404)
    return saved
  }

  returnItem(id: string){
    if(!id || id.trim()==='')
      throw new AppError('Id is required', 400)
    const item = this.itemsRepository.findById(id)
    if(!item)
      throw new AppError('Item not found', 404)
    if(item.isBorrowed == false)
      throw new AppError('This Item is not borrowed', 409)

    const updated: Item={...item,isBorrowed:false}
    const saved = this.itemsRepository.update(updated)
    if(!saved)
      throw new AppError('Item not found', 404)
    return saved
  }


}

