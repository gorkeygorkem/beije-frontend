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
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
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
        gridTemplateColumns={{ xs: '1fr', md: '3fr 2fr' }}
        gap={0}>
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
                maxWidth: '50%',
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
          gap={6}>
          {[
            ['beije Ped', 'beije Günlük Ped', 'beije Tampon'],
            ['Biz Kimiz?', 'Blog', 'Sıkça Sorulan Sorular', 'Ekibimize Katıl'],
            [
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                key="Facebook">
                <FacebookIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2">Facebook</Typography>
              </Stack>,
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                key="Instagram">
                <InstagramIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2">Instagram</Typography>
              </Stack>,
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                key="Twitter">
                <TwitterIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2">Twitter</Typography>
              </Stack>,
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                key="LinkedIn">
                <LinkedInIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2">LinkedIn</Typography>
              </Stack>,
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                key="Spotify">
                <GraphicEqIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2">Spotify</Typography>
              </Stack>,
            ],
          ].map((links, i) => (
            <Stack spacing={3} key={i}>
              {links.map((text, idx) => (
                <MuiLink
                  key={idx}
                  href="#"
                  underline="hover"
                  color="inherit"
                  fontSize={'15px'}
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

        <Typography variant="body2">
          2022 beije. Tüm hakları saklıdır.
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" fontSize={14}>
          <Typography variant="body2" align="center">
            <MuiLink href="#" underline="hover" color="inherit">
              KVKK
            </MuiLink>
          </Typography>
          <Typography variant="body2" align="center">
            <MuiLink href="#" underline="hover" color="inherit">
              KVKK Başvuru Formu
            </MuiLink>
          </Typography>
          <Typography variant="body2" align="center">
            <MuiLink href="#" underline="hover" color="inherit">
              Üyelik Sözleşmesi
            </MuiLink>
          </Typography>
          <Typography variant="body2" align="center">
            <MuiLink href="#" underline="hover" color="inherit">
              Gizlilik Politikası
            </MuiLink>
          </Typography>
          <Typography variant="body2" align="center">
            <MuiLink href="#" underline="hover" color="inherit">
              Çerez Politikası
            </MuiLink>
          </Typography>
          <Typography variant="body2" align="center">
            <MuiLink href="#" underline="hover" color="inherit">
              Test Sonuçları
            </MuiLink>
          </Typography>
        </Stack>

        {/* Right - Language Switcher */}
        <Typography variant="body2">
          EN | <strong>TR</strong>
        </Typography>
      </Box>

      {/* Payment Logos */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        <Image src="/payment2.png" alt="mastercard" width={40} height={24} />
        <Image src="/payment1.png" alt="visa" width={40} height={24} />
      </Box>
    </Box>
  );
}
