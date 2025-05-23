'use client';

import { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Divider,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Head from 'next/head';
import { RootState } from '@/store/index';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { verifyPacketPrice } from '@/lib/api';
import { useDispatch } from 'react-redux';
import { incrementCart } from '@/store/slices/cartSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function PacketsPage() {
  const { products } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  const [tab, setTab] = useState(0);
  const [expandedAccordions, setExpandedAccordions] = useState<string[]>(
    products.map((p) => p._id),
  ); // Open all initially
  const [cart, setCart] = useState<Record<string, number>>({});
  const infoTips: Record<string, string> = {
    'beije Ped':
      'Çoğu beije kullanıcısı normal yoğunlukta bir regl dönemi için abonelik paketinde 20 Standart, 20 Süper Ped tercih ediyor.',
    'beije Günlük Pad': `Kullanıcılarımızın %68'i akıntıları olan günlerde Standart Günlük Ped'i, regllerinin son günlerinde veya daha yoğun akıntıları olan günlerde ise Süper Günlük Ped'i tercih ediyor.`,
  };

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const totalPrice = products.reduce((acc, product) => {
    return (
      acc +
      product.subProducts.reduce((subAcc, subProduct) => {
        const count = cart[subProduct._id] || 0;
        return subAcc + count * subProduct.price;
      }, 0)
    );
  }, 0);

  const handleIncrease = (subProductId: string) => {
    setCart((prev) => ({
      ...prev,
      [subProductId]: (prev[subProductId] || 0) + 1,
    }));
  };

  const handleDecrease = (subProductId: string) => {
    setCart((prev) => {
      const newCount = (prev[subProductId] || 0) - 1;
      if (newCount <= 0) {
        const updated = { ...prev };
        delete updated[subProductId];
        return updated;
      }
      return { ...prev, [subProductId]: newCount };
    });
  };

  const handleRemoveParentProduct = (parentProductId: string) => {
    const subProductIds =
      products
        .find((p) => p._id === parentProductId)
        ?.subProducts.map((sp) => sp._id) || [];
    setCart((prev) => {
      const updated = { ...prev };
      subProductIds.forEach((id) => delete updated[id]);
      return updated;
    });
  };

  const handleAccordionToggle = (productId: string) => {
    setExpandedAccordions((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleCheckout = async () => {
    const packet = Object.entries(cart).map(([subProductId, count]) => ({
      _id: subProductId,
      count,
    }));

    try {
      await verifyPacketPrice(packet, totalPrice);
      setSnackbar({
        open: true,
        message: 'Paket başarıyla doğrulandı!',
        severity: 'success',
      });
      dispatch(incrementCart());
      setCart({});
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: 'Doğrulama başarısız oldu.',
        severity: 'error',
      });
    }
  };

  return (
    <Box sx={{ bgcolor: 'rgba(247, 246, 245, 1)', width: '100%' }}>
      <Head>
        <title>beije | Kendi Paketini Oluştur</title>
      </Head>

      <Box
        sx={{
          px: { xs: 2, md: 6, lg: 20 }, // smaller on medium, larger on large
          py: 20,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 10,
          bgcolor: 'rgba(247, 246, 245, 1)',
          maxWidth: '1440px',

          marginX: 'auto', // horizontal center
        }}>
        {/* Left Side */}
        <Box sx={{ flex: 2 }}>
          <Typography
            variant="h5"
            fontSize={28}
            fontWeight="bold"
            mb={1}
            display="flex"
            justifyContent="space-between">
            Kendi Paketini Oluştur
            <Typography
              component="span"
              variant="h6"
              sx={{ display: 'inline-block', verticalAlign: 'super' }}>
              Nasıl Çalışır?
            </Typography>
          </Typography>
          <Typography fontSize={16} color="text.secondary" mb={3}>
            Döngünün uzunluğuna, kanamanın yoğunluğuna ve kullanmak istediğin
            ürünlere göre kendine özel bir paket oluştur!
          </Typography>

          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={(e, v) => setTab(v)}
            textColor="inherit"
            variant="fullWidth"
            sx={{
              mb: 4,
              '& .MuiTabs-indicator': { backgroundColor: 'black' },
            }}>
            <Tab
              label="Menstrual Ürünler"
              sx={{ fontWeight: 600, textTransform: 'none' }}
            />
            <Tab
              label="Destekleyici Ürünler"
              sx={{ fontWeight: 600, textTransform: 'none' }}
            />
          </Tabs>
          {/* Product Accordions */}
          {products
            .filter((product) =>
              tab === 0
                ? product.type === 'Menstrual'
                : product.type === 'Other',
            )
            .map((product) => {
              const selectedSubProducts = product.subProducts.filter(
                (sub) => cart[sub._id],
              );
              const summaryText = selectedSubProducts
                .map((sub) => `${cart[sub._id]} adet ${sub.name}`)
                .join(' ve ');

              return (
                <Accordion
                  key={product._id}
                  expanded={expandedAccordions.includes(product._id)}
                  onChange={() => handleAccordionToggle(product._id)}
                  disableGutters
                  elevation={0}
                  square
                  sx={{
                    mb: 2,
                    borderRadius: '16px',
                    border: '1px solid #e0e0e0',
                    overflow: 'hidden', // this fixes rounded corners
                  }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ fontSize: 30 }} />}
                    sx={{ alignItems: 'center' }}>
                    <Box sx={{ width: '100%' }}>
                      {/* Top Row: title and summary */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}>
                        <Box sx={{ display: 'flex' }}>
                          <Image
                            src="/hijyenik-standart.svg"
                            alt="hijyenik standart"
                            width={30}
                            height={30}
                          />
                        </Box>
                        <Typography
                          fontWeight="bold"
                          fontSize={20}
                          sx={{ minWidth: 0, flex: 1, ml: 1 }}>
                          {product.title}
                        </Typography>

                        {selectedSubProducts.length > 0 && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              ml: 2,
                              whiteSpace: 'normal',
                              wordBreak: 'break-word',
                              textAlign: 'right',
                              maxWidth: '60%',
                              minWidth: 0,
                            }}>
                            {summaryText}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails>
                    {infoTips[product.title] && (
                      <Box
                        sx={{
                          bgcolor: 'rgba(236, 241, 207, 1)',
                          color: 'black',
                          px: 3,
                          py: 2,
                          borderRadius: 2,
                          mb: 3,
                          display: 'flex',
                          gap: 1.5,
                          alignItems: 'flex-start',
                        }}>
                        <FavoriteIcon sx={{ color: 'rgba(185, 213, 77, 1)' }} />
                        <Typography fontSize={16}>
                          {infoTips[product.title]}
                        </Typography>
                      </Box>
                    )}
                    {product.subProducts.map((subProduct) => (
                      <Box
                        key={subProduct._id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mb: 2,
                        }}>
                        <Typography fontSize={16} variant="body2" noWrap>
                          {subProduct.name}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            border: '1px solid #ccc',
                            borderRadius: 64,
                            alignItems: 'center',
                            gap: 1,
                          }}>
                          <IconButton
                            size="medium"
                            disabled={!cart[subProduct._id]}
                            onClick={() => handleDecrease(subProduct._id)}>
                            <RemoveIcon />
                          </IconButton>
                          <Typography>{cart[subProduct._id] || 0}</Typography>
                          <IconButton
                            size="medium"
                            onClick={() => handleIncrease(subProduct._id)}>
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </Box>

        {/* Right Side */}
        <Box
          sx={{
            flex: 1,
            bgcolor: 'white',
            borderRadius: 4,
            p: 4,
            height: 'fit-content',
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Paketin
            </Typography>

            <Box
              sx={{
                bgcolor: 'rgba(210, 231, 224, 1)',
                color: 'black',
                fontSize: '14px',
                fontWeight: 'bold',
                px: 2,
                py: 1,
                ml: 15,
                borderRadius: 2,
                whiteSpace: 'nowrap',
              }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: 'rgba(14, 185, 179, 1)',
                    borderRadius: '50%',
                  }}
                />
                2 Ayda bir gönderim
              </Box>
            </Box>
          </Box>

          <Typography color="text.secondary" mb={4}>
            Kişisel ihtiyacına yönelik istediğin miktarda ürün ekleyerek kendine
            özel paket oluşturabilirsin.
          </Typography>

          {/* Cart */}
          <Box display="flex" flexDirection="column" gap={2} mb={4}>
            {products
              .filter((product) =>
                product.subProducts.some((subProduct) => cart[subProduct._id]),
              )
              .map((product) => (
                <Card
                  key={product._id}
                  sx={{
                    bgcolor: 'white',
                    p: 2,
                    borderRadius: 2,
                    boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.12)',
                  }}>
                  <CardContent sx={{ p: 0 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                      }}>
                      <Typography fontSize={18} fontWeight="bold">
                        {product.title}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveParentProduct(product._id)}>
                        <DeleteOutlinedIcon fontSize="medium" />
                      </IconButton>
                    </Box>

                    {product.subProducts
                      .filter((subProduct) => cart[subProduct._id])
                      .map((subProduct) => (
                        <Box
                          key={subProduct._id}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 2,
                          }}>
                          <Typography
                            fontSize={14}
                            fontWeight="400"
                            variant="body2">
                            {cart[subProduct._id]} x {subProduct.name}
                          </Typography>
                          <Typography
                            fontSize={14}
                            fontWeight="500"
                            variant="body2">
                            {cart[subProduct._id] * subProduct.price}₺
                          </Typography>
                        </Box>
                      ))}
                  </CardContent>
                </Card>
              ))}
          </Box>

          {/* Checkout */}
          <Button
            fullWidth
            variant="contained"
            disabled={totalPrice === 0}
            onClick={handleCheckout}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 8,
              py: 1.5,
              backgroundColor: 'rgba(52, 49, 49, 1)',
              ':hover': { backgroundColor: '#333' },
            }}>
            Sepete Ekle ({totalPrice}₺)
          </Button>

          {/* Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}>
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
}
