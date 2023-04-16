import Carousel from '@/components/Carousel';
import Contact from '@/components/Contact';
import Features from '@/components/Feature';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';

import Navbar from '@/components/Navbar';
import Testimonials from '@/components/Testimonials';
import Head from 'next/head';

export default function Home() {
  return (
    <>

        <HeroSection/>
        <Carousel />
        
        <Testimonials/>
        <Contact/>
    </>
  );
}
