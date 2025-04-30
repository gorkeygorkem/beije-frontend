import { Provider } from 'react-redux';
import { store } from '../store';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { AppProps } from 'next/app';
import { Box } from '@mui/material';
import { CssBaseline } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  /*   
  //store on localstorage

  //utils/axios.ts
  axios.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  });

  //on this page
  useEffect(() => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        dispatch(setToken(storedToken));
        dispatch(fetchUserProfile());
      }
    }, []);
 */
  return (
    <Provider store={store}>
      <CssBaseline />
      <Navbar />
      <Component {...pageProps} />
      <Box
        sx={{
          width: '100%',
          lineHeight: 0,
          position: 'relative',
          marginTop: '-60px', // ensures no visible gap
          zIndex: 10, // ensures it sits above next elements
        }}>
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '100px' }}>
          <path
            fill="#1C1C1C"
            d="M0,160
         C 240,80 480,240 720,160
         C 960,80 1200,240 1440,160
         L1440,320 L0,320 Z"
          />
        </svg>
      </Box>

      <Footer />
    </Provider>
  );
}

export default MyApp;
