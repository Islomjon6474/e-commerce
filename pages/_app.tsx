import { Provider } from 'react-redux';
import store from '../store';
import '../styles/globals.css';
import ProductsPageComponent from "@/components/products";
import Header from "@/components/Header";

function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
          <Header />
          <ProductsPageComponent />
      </Provider>
  );
}

export default MyApp;
