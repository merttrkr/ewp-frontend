import Navbar from './Navbar';
import Head from 'next/head';
import Footer from './Footer';
import { Box, Flex } from '@chakra-ui/react';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>EWP IYTE </title>
        <meta name='description' content='EWP IYTE Dashboard' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex flexDirection='column' minHeight='100vh'>
        <Navbar />
        {children}
        <Box height={100}></Box>
        <Footer />
      </Flex>
    </div>
  );
}
