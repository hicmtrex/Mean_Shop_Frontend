export interface GetProducts {
  _id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  qty: number;
  brand: string;
  category: string;
  description: string;
  specifications: string[];
  createdAt: Date;
}

export interface CreateProduct {
  name: string;
  image: string;
  price: number;
  brand: string;
  category: string;
  description: string;
  specifications: string[];
}

export interface UpdateProduct extends CreateProduct {
  _id: string;
}

export interface FilterProduct {
  category: string;
  page: number;
  search: string;
}
