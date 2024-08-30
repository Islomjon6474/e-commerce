import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    const product = {
      id: 1,
      title: 'Test Product',
      description: 'This is a test product.',
      price: 9.99,
      currency: 'USD',
      image: 'https://example.com/test-image.jpg',
      rating: 5
    };

    render(<ProductCard product={product} />);

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price.toFixed(2)} ${product.currency}`)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: product.title })).toHaveAttribute('src', product.image);
    expect(screen.getAllByText('⭐').length).toEqual(product.rating);
  });
});
