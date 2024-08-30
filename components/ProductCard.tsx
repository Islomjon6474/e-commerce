import React, {Dispatch} from 'react';
import { Product } from "@/types";
import { roundToTwo } from "@/utils";
import { useAppDispatch } from "@/hooks";
import { addToCart } from "@/store/cartSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {AppDispatch} from "@/store";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const dispatch:AppDispatch = useAppDispatch();
    const addToCartFn = (product: Product) => {
        dispatch(addToCart(product));
    }

    return (
        <div className="border border-gray-300 shadow rounded-lg p-4">
            <img src={product.image} alt={product.title} className="w-full h-32 object-cover rounded"/>
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-sm text-gray-600 truncate">{product.description}</p>
            <p className="text-md font-semibold">{`${roundToTwo(product.price)} ${product.currency}`}</p>
            <p className="text-yellow-500">{Array(Math.round(product.rating)).fill('⭐')}</p>
            <button
                onClick={() => addToCartFn(product)}
                className="mt-2 border border-gray-400 hover:border-gray-500 text-gray-800 hover:text-gray-900 font-bold py-2 px-4 rounded-full flex items-center justify-center"
                aria-label="Add to Cart"
            >
                <FontAwesomeIcon icon={faShoppingCart}/>
            </button>
        </div>
    );
}

export default ProductCard;
