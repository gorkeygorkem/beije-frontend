import axios from 'axios';

const API = axios.create({
  baseURL: 'https://96318a87-0588-4da5-9843-b3d7919f1782.mock.pstmn.io',
});

export const signIn = (email: string, password: string) => {
  return API.post('/sign-in-request', { email, password });
};

export const getProfile = () => {
  return API.get('/profile', {
    /* headers: {
      'x-auth-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSW5mbyI6eyJlbWFpbCI6InNhbGFyQGJlaWplLmNvIiwicGFzc3dvcmRIYXNoIjoiOGI0YmFlNWNhMzViMDZkOTk1OTdhNGY4MTNkMjdjOWUifSwiZXhwIjoxNzM4NjY0OTc5LCJpYXQiOjE3Mzg2NjEzNzl9.22eZB1T1DrBmq1VgQj1tiRy1jn9QG-P4T6KUMLu1XSU',
    }, */
  });
};

export const getProductsAndPackets = () => {
  return API.get('/packets-and-products');
};

const BASE_URL = 'https://3a631b5b-9b1b-4b7f-b736-00d1ce4a1505.mock.pstmn.io';
export const verifyPacketPrice = async (
  packet: { _id: string; count: number }[],
  totalPrice: number,
) => {
  const response = await axios.post(`${BASE_URL}/verify-packet-price`, {
    packet,
    totalPrice,
  });

  return response.data;
};
