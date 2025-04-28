// src/app/packet/page.tsx

'use client';
import { useEffect } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PacketPage from '@/components/PacketsPage'; // Adjust if needed
import { useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/index';
import { fetchProductsAndPackets } from '@/store/slices/productSlice';

export default function Packet() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProductsAndPackets());
  }, [dispatch]);

  return (
    <>
      <PacketPage />
      <Footer />
    </>
  );
}
