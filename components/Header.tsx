import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {roundToTwo} from "@/utils";

const Header = () => {
    const {totalItems, totalPrice} = useSelector((state: RootState) => state.cart);

    return (
        <div className="bg-gray-800 text-white sticky top-0 left-0 right-0 p-4 flex justify-between items-center">
            <h1 className="text-lg">Shopping Cart</h1>
            <div className={`flex gap-4`}>
                <p>Items: {totalItems}</p>
                <p>Total: ${roundToTwo(totalPrice)}</p>
            </div>
        </div>
    );
};

export default Header;
