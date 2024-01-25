export interface Product {
  id: number
  category: string
  itemId: string
  name: string
  fullPrice: number
  price: number
  screen: string
  capacity: string
  color: string
  ram: string
  year: number
  image: string
}

export interface ProductDetails {
  id: number
  namespaceId: string
  name: string
  capacityAvailable: string[]
  capacity: string
  priceRegular: number
  priceDiscount: number
  colorsAvailable: string[]
  color: string
  images: string[]
  description: object
  screen: string
  resolution: string
  processor: string
  ram: string
  camera: string
  zoom: string
  cell: string[]
}

export interface ProductsWithCount {
  count: number
  rows: any[]
}
