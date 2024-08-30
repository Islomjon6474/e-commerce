export const expandProducts = (products, multiplier = 4) => {
    let expandedProducts = [];
    for (let i = 0; i < multiplier; i++) {
        const newProducts = products.map(product => ({
            ...product,
            id: product.id + i * 100,
            title: `${product.title} - ${i + 1}`,
            price: product.price + i * 0.1,
            rating: (product.rating + i * 0.1 > 5) ? 5 : product.rating + i * 0.1
        }));
        expandedProducts = expandedProducts.concat(newProducts);
    }
    return expandedProducts;
}

export const roundToTwo = (num) => {
    return +(Math.round(Number(num + "e+2"))  + "e-2");
}
