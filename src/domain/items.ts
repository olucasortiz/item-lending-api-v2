
export type Item = {
  id: string
  name: string
  owner: string
  isBorrowed: boolean
}

export type CreateItemInput = {
  name: string
  owner: string
}

export type CreateItemData = Omit<Item, 'id'>
