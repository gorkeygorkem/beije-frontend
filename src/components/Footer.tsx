// src/components/Footer.tsx
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  OutlinedInput,
  Link as MuiLink,
} from '@mui/material';
import Image from 'next/image';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1C1C1C',
        color: 'white',
        pt: 8,
        px: { xs: 3, md: 12 },
        pb: 4,
      }}>
      {/* Top Grid */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', md: '1fr 2fr' }}
        gap={6}>
        {/* Left Section */}
        <Box>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            beije.
          </Typography>

          <Typography variant="subtitle2" fontWeight={600} mb={1}>
            Arayı açmayalım!
          </Typography>

          <Typography variant="body2" mb={3}>
            beije’deki yeni ürün ve gelişmeleri sana haber verelim & aylık
            e-gazetemizi döngü’ye abone ol!
          </Typography>

          {/* Email Subscribe */}
          <Stack direction="row" spacing={1} mb={2}>
            <OutlinedInput
              placeholder="E-mail Adresin"
              sx={{
                bgcolor: '#1C1C1C',
                color: 'white',
                flex: 1,
                borderRadius: 2,
                height: 48,
                '& fieldset': {
                  borderColor: 'white',
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: 'white',
                color: 'black',
                fontWeight: 'bold',
                px: 4,
                borderRadius: 8,
                height: 48,
                '&:hover': { bgcolor: 'white' },
              }}>
              Gönder
            </Button>
          </Stack>

          <Typography variant="caption">
            Abone olarak, beije{' '}
            <MuiLink
              href="#"
              underline="hover"
              color="inherit"
              fontWeight="bold">
              KVKK
            </MuiLink>{' '}
            ve{' '}
            <MuiLink
              href="#"
              underline="hover"
              color="inherit"
              fontWeight="bold">
              Gizlilik Politikası
            </MuiLink>
            'nı kabul ediyor ve beije'den haber almayı onaylıyorum.
          </Typography>
        </Box>

        {/* Right Section */}
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', sm: 'repeat(3, 1fr)' }}
          gap={4}>
          {[
            ['beije Ped', 'beije Günlük Ped', 'beije Tampon'],
            ['Biz Kimiz?', 'Blog', 'Sıkça Sorulan Sorular', 'Ekibimize Katıl'],
            ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'Spotify'],
          ].map((links, i) => (
            <Stack spacing={1} key={i}>
              {links.map((text, idx) => (
                <MuiLink
                  key={idx}
                  href="#"
                  underline="hover"
                  color="inherit"
                  variant="body2">
                  {text}
                </MuiLink>
              ))}
            </Stack>
          ))}
        </Box>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />

      {/* Bottom Footer Row */}
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        mb={3}>
        {/* Left - Legal Links */}
        <Stack direction="row" spacing={2} flexWrap="wrap" fontSize={13}>
          <Typography variant="body2">
            2022 beije. Tüm hakları saklıdır.
          </Typography>
          <MuiLink href="#" underline="hover" color="inherit">
            KVKK
          </MuiLink>
          <MuiLink href="#" underline="hover" color="inherit">
            KVKK Başvuru Formu
          </MuiLink>
          <MuiLink href="#" underline="hover" color="inherit">
            Üyelik Sözleşmesi
          </MuiLink>
          <MuiLink href="#" underline="hover" color="inherit">
            Gizlilik Politikası
          </MuiLink>
          <MuiLink href="#" underline="hover" color="inherit">
            Çerez Politikası
          </MuiLink>
          <MuiLink href="#" underline="hover" color="inherit">
            Test Sonuçları
          </MuiLink>
        </Stack>

        {/* Right - Language Switcher */}
        <Typography variant="body2">EN | TR</Typography>
      </Box>

      {/* Payment Logos */}
      <Box
        display="flex"
        justifyContent={{ xs: 'center', md: 'flex-end' }}
        alignItems="center"
        gap={2}>
        <Image src="/payment1.png" alt="mastercard" width={40} height={24} />
        <Image src="/payment2.png" alt="visa" width={40} height={24} />
      </Box>
    </Box>
  );
}
