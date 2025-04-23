// src/components/Footer.tsx
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import Image from 'next/image';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#121212',
        color: 'white',
        pt: 8,
        px: { xs: 3, md: 10 },
        pb: 4,
        width: '100vw',
      }}>
      <Grid container spacing={4}>
        {/* Subscription */}
        <Grid container xs={12} md={4}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Arayı açmayalım!
          </Typography>
          <Typography variant="body2" mb={2}>
            beije’deki yeni ürün ve gelişmeleri sana haber verelim & aylık
            e-gazetemizi döngü’ye abone ol!
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              placeholder="E-mail Adresin"
              variant="filled"
              sx={{ backgroundColor: 'white', borderRadius: 1, flex: 1 }}
              InputProps={{
                disableUnderline: true,
              }}
            />
            <Button variant="contained" sx={{ px: 4, borderRadius: 1 }}>
              Gönder
            </Button>
          </Stack>
          <Typography variant="caption" mt={1} display="block">
            Abone olarak, beije{' '}
            <MuiLink href="#" underline="always" color="inherit">
              KVKK
            </MuiLink>{' '}
            ve{' '}
            <MuiLink href="#" underline="always" color="inherit">
              Gizlilik Politikası
            </MuiLink>
            'nı kabul ediyorum.
          </Typography>
        </Grid>

        {/* Links */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            {[
              ['beije Ped', 'beije Günlük Ped', 'beije Tampon'],
              [
                'Biz Kimiz?',
                'Blog',
                'Sıkça Sorulan Sorular',
                'Ekibimize Katıl',
              ],
              ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'Spotify'],
            ].map((column, i) => (
              <Grid item xs={4} key={i}>
                <Stack spacing={1}>
                  {column.map((link, idx) => (
                    <MuiLink
                      href="#"
                      key={idx}
                      underline="hover"
                      color="inherit"
                      variant="body2">
                      {link}
                    </MuiLink>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Bottom Row */}
      <Box
        mt={6}
        pt={3}
        borderTop="1px solid rgba(255,255,255,0.2)"
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        fontSize={13}>
        {/* Left Legal Links */}
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <MuiLink href="#" underline="hover" color="inherit">
            KVKK
          </MuiLink>
          <MuiLink href="#" underline="hover" color="inherit">
            Üyelik Sözleşmesi
          </MuiLink>
          <MuiLink href="#" underline="hover" color="inherit">
            Gizlilik
          </MuiLink>
          <MuiLink href="#" underline="hover" color="inherit">
            Çerez Politikası
          </MuiLink>
          <MuiLink href="#" underline="hover" color="inherit">
            Test Sonuçları
          </MuiLink>
        </Stack>

        {/* Right: Language + Cards */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2">EN | TR</Typography>
          <Image src="/visa.png" alt="visa" width={30} height={20} />
          <Image
            src="/mastercard.png"
            alt="mastercard"
            width={30}
            height={20}
          />
        </Stack>
      </Box>
    </Box>
  );
}
