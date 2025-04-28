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
import { useState } from 'react';
import { Visibility, VisibilityOff, WidthFull } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { signIn, getProfile } from '@/lib/api';
import { useDispatch } from 'react-redux';
import { setToken, setProfile } from '@/store/slices/authSlice';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    try {
      setLoading(true);

      const res = await signIn(email, password);
      const token = res.data.data.token;

      dispatch(setToken(token));

      const profileRes = await getProfile(); // x-auth-token should NOT be sent
      dispatch(setProfile(profileRes.data.data.profileInfo));

      router.push('/packets');
    } catch (err: any) {
      setError('E-posta veya şifre hatalı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Main layout */}
      <Grid
        container
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, // 1 column on mobile, 2 columns on desktop
          width: '100vw',
          margin: 0,
          padding: 0,
        }}>
        {/* Left Side - Image */}
        <Box
          sx={{
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}>
          <img
            src="/login-products.png"
            alt="Beije Product Group"
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: 8,
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
            px: { xs: 3, md: 6 },
            py: 8,
            height: '100%',
          }}>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Merhaba
          </Typography>
          <Typography color="text.secondary" mb={3}>
            beije'ye hoş geldin!
          </Typography>

          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            sx={{ mb: 3 }}>
            <Tab label="Giriş Yap" />
            <Tab label="Üye Ol" />
          </Tabs>

          {/* Social Buttons */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{ mb: 2, textTransform: 'none' }}>
            Google ile Giriş Yap
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FacebookIcon />}
            sx={{ mb: 3, textTransform: 'none' }}>
            Facebook ile Giriş Yap
          </Button>

          {/* Email */}
          <TextField
            fullWidth
            label="E-mail adresin"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
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
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 1 }}
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

      {/* Footer */}
      <Box sx={{ width: '100vw', overflowX: 'hidden' }}>
        <Footer />
      </Box>
    </>
  );
}
