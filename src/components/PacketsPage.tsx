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
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function PacketsPage() {
  const { products } = useSelector((state: RootState) => state.products);

  const [tab, setTab] = useState(0);
  const [cart, setCart] = useState<Record<string, number>>({}); // { subProductId: quantity }

  // Calculate total price
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

  return (
    <Box sx={{ px: { xs: 2, md: 12 }, py: 8, display: 'flex', gap: 6 }}>
      {/* Left Side - Products */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Kendi Paketini Oluştur
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Döngünün uzunluğuna, kanamanın yoğunluğuna ve kullanmak istediğin
          ürünlere göre tamamen kendine özel bir paket oluştur!
        </Typography>

        {/* Tabs */}
        <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 4 }}>
          <Tab label="Menstrual Ürünler" />
          <Tab label="Destekleyici Ürünler" />
        </Tabs>

        {/* Product Accordions */}
        {products
          .filter((product) =>
            tab === 0 ? product.type === 'Menstrual' : product.type === 'Other',
          )
          .map((product) => (
            <Accordion key={product._id} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">{product.title}</Typography>
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
                      px: 2,
                    }}>
                    {/* Sub Product Name */}
                    <Typography variant="body2">{subProduct.name}</Typography>

                    {/* Quantity Controls */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        onClick={() => handleDecrease(subProduct._id)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{cart[subProduct._id] || 0}</Typography>
                      <IconButton
                        onClick={() => handleIncrease(subProduct._id)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
      </Box>

      {/* Right Side - Cart */}
      <Box
        sx={{
          flex: 1,
          border: '1px solid #e0e0e0',
          borderRadius: 4,
          p: 4,
          bgcolor: '#f8f8f8',
          height: 'fit-content',
        }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Paketin
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Kişisel ihtiyacına yönelik istediğin miktarda ped, günlük ped, tampon
          veya destekleyici ürünler ekleyerek kendine özel paket
          oluşturabilirsin.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          disabled={totalPrice === 0}
          sx={{ textTransform: 'none', borderRadius: 6 }}>
          Sepete Ekle ({totalPrice}₺)
        </Button>
      </Box>
    </Box>
  );
}
