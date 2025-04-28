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
import { RootState } from '@/store/index';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { verifyPacketPrice } from '@/lib/api';

export default function PacketsPage() {
  const { products } = useSelector((state: RootState) => state.products);

  const [tab, setTab] = useState(0);
  const [expandedAccordions, setExpandedAccordions] = useState<string[]>(
    products.map((p) => p._id),
  ); // Open all initially
  const [cart, setCart] = useState<Record<string, number>>({});
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
    <Box
      sx={{
        px: { xs: 2, md: 12 },
        py: 8,
        display: 'flex',
        gap: 30,
        bgcolor: 'rgba(247, 246, 245, 1)',
      }}>
      {/* Left Side */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Kendi Paketini Oluştur
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Döngünün uzunluğuna, kanamanın yoğunluğuna ve kullanmak istediğin
          ürünlere göre kendine özel bir paket oluştur!
        </Typography>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          textColor="inherit"
          indicatorColor="primary"
          variant="fullWidth"
          sx={{ mb: 4 }}>
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
            tab === 0 ? product.type === 'Menstrual' : product.type === 'Other',
          )
          .map((product) => {
            const selectedSubProducts = product.subProducts.filter(
              (sub) => cart[sub._id],
            );
            const summaryText = selectedSubProducts
              .map((sub) => `${cart[sub._id]} ${sub.name}`)
              .join(', ');

            return (
              <Accordion
                key={product._id}
                expanded={expandedAccordions.includes(product._id)}
                onChange={() => handleAccordionToggle(product._id)}
                sx={{ mb: 2, borderRadius: '16px' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight="bold">{product.title}</Typography>
                  {!expandedAccordions.includes(product._id) &&
                    selectedSubProducts.length > 0 && (
                      <Typography
                        ml={60}
                        variant="body2"
                        color="text.secondary"
                        noWrap>
                        {summaryText}
                      </Typography>
                    )}
                </AccordionSummary>
                <AccordionDetails>
                  {product.subProducts.map((subProduct) => (
                    <Box
                      key={subProduct._id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                      }}>
                      <Typography variant="body2" noWrap>
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
              borderRadius: 10,
              whiteSpace: 'nowrap',
            }}>
            2 Ayda bir gönderim
          </Box>
        </Box>

        <Typography color="text.secondary" mb={4}>
          Kişisel ihtiyacına yönelik istediğin miktarda ürün ekleyerek kendine
          özel paket oluşturabilirsin.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* Cart */}
        <Box display="flex" flexDirection="column" gap={2} mb={4}>
          {products
            .filter((product) =>
              product.subProducts.some((subProduct) => cart[subProduct._id]),
            )
            .map((product) => (
              <Card
                key={product._id}
                sx={{ bgcolor: 'white', p: 2, borderRadius: 2 }}>
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}>
                    <Typography fontWeight="bold">{product.title}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveParentProduct(product._id)}>
                      <DeleteIcon fontSize="small" />
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
                          mb: 1,
                        }}>
                        <Typography variant="body2">
                          {cart[subProduct._id]} {subProduct.name}
                        </Typography>
                        <Typography variant="body2">
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
            backgroundColor: 'black',
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
  );
}
