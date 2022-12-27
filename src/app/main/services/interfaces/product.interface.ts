export interface ProductsType {
  id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  brand: string;
  qty?: number;
}

export interface GetFiltredProducts {
  products: ProductsType[];
  categories: string[];
  page: number;
  pages: number;
}
