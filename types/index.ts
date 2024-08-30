export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    currency: string;
    image: string;
    rating: number;
}

export interface ProductsState {
    products: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    currentPage: number;
    productsPerPage: number;
    totalProducts: number;
    totalPages: number;
}
