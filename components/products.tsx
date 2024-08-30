import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Product } from '@/types';
import { useAppDispatch } from "@/hooks";
import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import {setPage, setNumberOfPages} from "@/store/productSlice";

const ProductsPageComponent = () => {
    const dispatch = useAppDispatch();
    const { products, status, error, currentPage, productsPerPage, totalProducts, totalPages } = useSelector((state: RootState) => state.products);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        let sortedProducts = [...products].filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortField) {
            sortedProducts.sort((a, b) => {
                if (['rating', 'price'].includes(sortField)) {
                    return sortDirection === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
                }
                return 0;
            });
        }

        setFilteredProducts(sortedProducts);
        handlePageChange(1);
        dispatch(setNumberOfPages(Math.ceil(sortedProducts.length / productsPerPage)));
    }, [products, searchTerm, sortField, sortDirection]);



    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
    };

    if (status === 'loading') {
        return <div className="text-center text-lg">Loading products...</div>;
    }

    if (status === 'failed') {
        return <div className="text-red-500 text-lg">Error loading products: {error}</div>;
    }

    const PaginationButtons = () => {
        console.log(totalPages, "totalPages")
        console.log(totalProducts, "totalProducts")
        console.log(productsPerPage, "productsPerPage")
        return (
            <div className="flex justify-center items-center mt-4">
                {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 ${currentPage === page ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'} rounded-md mx-1`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="container text-black mx-auto px-4 pb-4">
            <h1 className="text-2xl font-bold text-center my-6">Products</h1>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-2 border-gray-300 rounded-md p-1"
                />
                <div>
                    <select
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                        className="border-2 border-gray-300 rounded-md p-1 px-2 mx-2"
                    >
                        <option value="">Select Field</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                    </select>
                    <select
                        value={sortDirection}
                        onChange={(e) => setSortDirection(e.target.value)}
                        className="border-2 border-gray-300 rounded-md p-1 px-2 "
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((product: Product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
            <PaginationButtons/>
        </div>
    );
};

export default ProductsPageComponent;
