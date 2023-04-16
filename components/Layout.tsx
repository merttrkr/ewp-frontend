
import Navbar from './Navbar';
import Head from 'next/head';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode,
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
        <Navbar />
       {children}
       <Footer/>
    </div>
  );
}