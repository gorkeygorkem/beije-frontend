'use client';

import { Box, Typography, Fade, IconButton, Badge } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcons from '@mui/icons-material/ArrowForward';
import { ShoppingCartOutlined, PersonOutlined } from '@mui/icons-material';
import { useAppSelector } from '@/store/hooks'; // or your correct hooks path
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

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

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Get products and packets from Redux
  const products = useAppSelector((state) => state.products.products);
  const packets = useAppSelector((state) => state.products.packets);
  const cartCount = useSelector((state: RootState) => state.cart.count);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        width: '100%',
        bgcolor: 'white',
        zIndex: 100,
      }}>
      {/* Full width background */}
      <Box sx={{ bgcolor: 'rgba(247, 246, 245, 1)', width: '100%' }}>
        {/* Centered container */}
        <Box
          sx={{
            height: '80px',
            maxWidth: '1440px',
            mx: 'auto',
            px: { xs: 2, md: 6, lg: 12 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* Left: Logo */}
          <Box sx={{ flexShrink: 0 }}>
            <Box
              component="a"
              href="/"
              sx={{ display: 'flex', alignItems: 'center' }}>
              <Image src="/Logo.svg" alt="Beije Logo" width={70} height={24} />
            </Box>
          </Box>

          {/* Center: Navigation */}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
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
                sx={{
                  fontSize: '16px',
                  fontWeight: open ? 600 : 400,
                  cursor: 'pointer',
                }}>
                Tüm Ürünler
              </Typography>

              {/* Hover Menu */}
              <Fade in={open}>
                <Box
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                  sx={{
                    position: 'fixed',
                    top: '80px',
                    left: 0,
                    width: '100vw',
                    bgcolor: 'rgba(247, 246, 245, 1)',
                    zIndex: 99,
                    pt: 4,
                    pb: 4,
                  }}>
                  {/* Centered menu inside */}
                  <Box
                    sx={{
                      maxWidth: '1440px',
                      mx: 'auto',
                      px: { xs: 2, md: 6, lg: 12 },
                    }}>
                    {/* Ürünler */}
                    <Box mb={6}>
                      <Typography variant="h6" fontWeight="bold" mb={3}>
                        Ürünler
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {products.map((product) => (
                          <Box
                            key={product._id}
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              width: 172,
                              cursor: 'pointer',
                            }}>
                            <Image
                              src={product.image}
                              alt={product.title}
                              width={172}
                              height={135}
                              style={{ objectFit: 'cover' }}
                            />
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                mt: 1,
                              }}>
                              <Image
                                src="/hijyenik-standart.svg"
                                alt="Icon"
                                width={30}
                                height={30}
                              />
                              <Box
                                sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography
                                  variant="body2"
                                  noWrap
                                  fontSize={16}
                                  sx={{ ml: 0.5, wordBreak: 'break-word' }}>
                                  {product.title}
                                </Typography>
                              </Box>
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
                          justifyContent: 'space-between',
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
                              width: 211,
                              cursor: 'pointer',
                            }}>
                            <Image
                              src={packet.image}
                              alt={packet.title}
                              width={211}
                              height={135}
                              style={{ objectFit: 'cover' }}
                            />
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                mt: 1,
                              }}>
                              <Box
                                sx={{ display: 'flex', alignItems: 'center' }}>
                                <Image
                                  src="/tampon.svg"
                                  alt="Icon"
                                  width={30}
                                  height={30}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{ ml: 0.5, wordBreak: 'break-word' }}
                                  fontSize={16}>
                                  {packet.title}
                                </Typography>
                              </Box>
                              <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Box>

            {/* Static Tabs */}
            {[
              'Biz Kimiz?',
              'Bağış Kültürü',
              'Regl Testi!',
              'Kendi Paketini Oluştur',
            ].map((tab, i) => (
              <Typography
                key={i}
                variant="body1"
                sx={{
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: 400,
                  display: { xs: 'none', md: 'block' },
                }}>
                {tab}
              </Typography>
            ))}
          </Box>

          {/* Right: Icons */}
          <Box sx={{ flexShrink: 0, display: 'flex', gap: 2 }}>
            <IconButton>
              <Badge
                badgeContent={cartCount}
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: 'black',
                    color: 'white',
                  },
                }}>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
            <IconButton>
              <PersonOutlined />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
