// src/app/packet/page.tsx

'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PacketPage from '@/components/PacketsPage'; // Adjust if needed
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/index';

export default function Packet() {
  return (
    <>
      <PacketPage />
      <Footer />
    </>
  );
}
