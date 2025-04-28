'use client';

import { Box, Typography, Fade, IconButton } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcons from '@mui/icons-material/ArrowForward';
import { ShoppingCartOutlined, PersonOutlined } from '@mui/icons-material';

interface Product {
  _id: string;
  title: string;
  image: string;
  type: string;
}

interface Packet {
  _id: string;
  title: string;
  image: string;
}

interface NavbarProps {
  products: Product[];
  packets: Packet[];
}

export default function Navbar({ products, packets }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{ position: 'fixed', width: '100%', bgcolor: 'white', zIndex: 100 }}>
      {/* Navbar */}
      <Box
        sx={{
          maxWidth: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 3, md: 12 },
          py: 2,
        }}>
        {/* Left - Logo and Tabs */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          <Image src="/Logo.png" alt="Beije Logo" width={70} height={24} />

          {/* Navigation Tabs */}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 4,
            }}>
            {/* Tüm Ürünler */}
            <Box
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              sx={{ position: 'relative' }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: open ? 600 : 400, cursor: 'pointer' }}>
                Tüm Ürünler
              </Typography>

              {/* Hovered Menu */}
              <Fade in={open}>
                <Box
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                  sx={{
                    position: 'fixed', // <<< not absolute, fixed to screen
                    top: '72px', // height of navbar
                    left: 0,
                    width: '100vw',
                    bgcolor: 'white',
                    px: { xs: 3, md: 12 },
                    pt: 6,
                    pb: 4,
                    zIndex: 99,
                  }}>
                  {/* Ürünler */}
                  <Box mb={6}>
                    <Typography variant="h6" fontWeight="bold" mb={3}>
                      Ürünler
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 4,
                      }}>
                      {products.map((product) => (
                        <Box
                          key={product._id}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: 140,
                            cursor: 'pointer',
                          }}>
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={140}
                            height={140}
                            style={{ objectFit: 'cover', borderRadius: 8 }}
                          />
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              mt: 1,
                            }}>
                            <Typography variant="body2" noWrap>
                              {product.title}
                            </Typography>
                            <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Paketler */}
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 3,
                      }}>
                      <Typography variant="h6" fontWeight="bold">
                        Paketler
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          gap: 0.5,
                          ml: 103,
                        }}>
                        <Typography variant="body2" fontWeight="regular">
                          Tüm Paketler
                        </Typography>
                        <ArrowForwardIcons sx={{ fontSize: 16 }} />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 4,
                        alignItems: 'center',
                      }}>
                      {packets.map((packet) => (
                        <Box
                          key={packet._id}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: 140,
                            cursor: 'pointer',
                          }}>
                          <Image
                            src={packet.image}
                            alt={packet.title}
                            width={140}
                            height={140}
                            style={{ objectFit: 'cover', borderRadius: 8 }}
                          />
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              mt: 1,
                            }}>
                            <Typography variant="body2" noWrap>
                              {packet.title}
                            </Typography>
                            <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Box>

            {/* Other Static Tabs */}
            {[
              'Biz Kimiz?',
              'Bağış Kültürü',
              'Regl Testi!',
              'Kendi Paketini Oluştur',
            ].map((tab, i) => (
              <Typography
                key={i}
                variant="body1"
                sx={{ cursor: 'pointer', fontWeight: 400 }}>
                {tab}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Right - Cart and Profile */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton>
            <ShoppingCartOutlined />
          </IconButton>
          <IconButton>
            <PersonOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
