
import Carousel from '@/components/Carousel';
import Contact from '@/components/Contact';
import PageNameContainer from '@/components/PageNameContainer';
import TabComponent from '@/components/Tab';

import Testimonials from '@/components/Testimonials';



export default function NewAgreement() {
  return (
    <>
        <PageNameContainer pageName={"Yeni Anlaşma Oluştur"}/>
        <TabComponent/>
        <Carousel />
        
        <Testimonials/>
        <Contact/>
    </>
  );
}
