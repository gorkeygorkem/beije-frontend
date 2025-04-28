import { Provider } from 'react-redux';
import { store } from '../store';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { AppProps } from 'next/app';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
