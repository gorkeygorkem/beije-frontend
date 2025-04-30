// pages/index.tsx
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  WidthFull,
} from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { signIn, getProfile, getProductsAndPackets } from '@/lib/api';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setProfile } from '@/store/slices/authSlice';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { fetchProductsAndPackets } from '@/store/slices/productSlice';
import { RootState, AppDispatch } from '@/store/index';
import Head from 'next/head';

export default function LoginPage() {
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const { products, packets, loading } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProductsAndPackets());
  }, [dispatch]);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    try {
      const res = await signIn(email, password);
      const token = res.data.data.token;

      dispatch(setToken(token));

      const profileRes = await getProfile(); // x-auth-token should NOT be sent
      dispatch(setProfile(profileRes.data.data.profileInfo));

      router.push('/packet');
    } catch (err: any) {
      setError('E-posta veya şifre hatalı.');
    } finally {
    }
  };

  return (
    <>
      {/* Main layout */}
      <Grid
        container
        sx={{
          display: 'grid',
          gridTemplateColumns: { sm: '1fr', md: '1fr 1fr' }, // 1 column on mobile, 2 columns on desktop
          width: '100vw',
          margin: 0,
          padding: 0,
          bgcolor: 'rgba(247, 246, 245, 1)',
        }}>
        <Head>
          <title>beije </title>
        </Head>
        {/* Left Side - Image */}
        <Box
          sx={{
            backgroundColor: '#f5f5f5',
            display: 'flex',
          }}>
          <img
            src="/login-products.png"
            alt="Beije Product Group"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'fill',
            }}
          />
        </Box>

        {/* Right Side - Form */}
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: { xs: 3, md: 20 },
            py: '50px',
            height: '100%',
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h5" fontSize="40px" mb={1}>
              Merhaba
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography color="text.secondary" fontSize="16px" mb={3}>
              beije'e hoş geldin!
            </Typography>
          </Box>

          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            sx={{
              mb: 3,
              '& .MuiTabs-indicator': { backgroundColor: 'black' },
              '& .MuiTab-root.Mui-selected': {
                color: 'black',
              },
            }}
            variant="fullWidth">
            <Tab label="Giriş Yap" />
            <Tab label="Üye Ol" />
          </Tabs>

          {/* Social Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                mb: 4,
                width: '48%',
                height: '40px',
                textTransform: 'none',
                borderRadius: '50px',
                borderColor: 'black',
                color: 'black',
              }}>
              Google ile Giriş Yap
            </Button>
            <Button
              variant="outlined"
              startIcon={<FacebookIcon sx={{ color: '#4267B2' }} />}
              sx={{
                mb: 4,
                width: '48%',
                height: '40px',
                textTransform: 'none',
                borderRadius: '50px',
                borderColor: 'black',
                color: 'black',
              }}>
              Facebook ile Giriş Yap
            </Button>
          </Box>

          {/* Email */}
          <TextField
            fullWidth
            label="E-mail adresin"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderWidth: '1px',
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
              '& .MuiFormLabel-root': {
                color: 'black',
              },
            }}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Şifren"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end">
                    {showPassword ? (
                      <VisibilityOffOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderWidth: '1px',
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
              '& .MuiFormLabel-root': {
                color: 'black',
              },
            }}
          />

          {/* Forgot Password */}
          <Typography
            variant="body2"
            align="right"
            color="text.secondary"
            mb={3}>
            Şifremi Unuttum
          </Typography>

          {/* Submit */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              borderRadius: 6,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              bgcolor: 'black',
              fontSize: '16px',
            }}>
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Button>

          {/* Snackbar for errors */}
          <Snackbar
            open={!!error}
            autoHideDuration={4000}
            onClose={() => setError('')}>
            <MuiAlert
              severity="error"
              onClose={() => setError('')}
              elevation={6}
              variant="filled">
              {error}
            </MuiAlert>
          </Snackbar>
        </Box>
      </Grid>
    </>
  );
}
