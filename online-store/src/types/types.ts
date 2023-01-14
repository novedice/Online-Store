export interface IData {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}
export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity?: number;
  inCart?: boolean;
}
export interface IProdInCart {
  id: number;
  quantity: number;
}
export interface ICartContext {
  listOfProd: number[];
  rsDiscount: boolean;
  epmDiscount: boolean;
  productsInCart: IProdInCart[];
  addOne: (prodInCart: IProdInCart) => void;
  minusOne: (prodInCart: IProdInCart) => void;
  addToCart: (id: number) => void;
  delFromCart: (id: number) => void;
  addRsDisc: () => void;
  addEpmDisc: () => void;
  removeRsDisc: () => void;
  removeEpmDisc: () => void;
  clearCart: () => void;
  resorteCart: () => void;
}

export type QParam = {
  id: string;
};
