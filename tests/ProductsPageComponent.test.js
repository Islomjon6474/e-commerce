import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import ProductsPageComponent from '@/components/ProductsPageComponent';
import { fetchProducts } from '@/lib/api';

jest.mock('@/lib/api', () => ({
  fetchProducts: jest.fn()
}));

describe('ProductsPageComponent', () => {
  it('displays products after fetching', async () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', description: 'Description 1', price: 10.00, currency: 'USD', image: 'image1.jpg', rating: 4 },
    ];

    fetchProducts.mockResolvedValue(mockProducts);

    render(
        <Provider store={store}>
          <ProductsPageComponent />
        </Provider>
    );

    expect(screen.getByText('Loading products...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
  });
});