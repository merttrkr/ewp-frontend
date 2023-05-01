import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from '@chakra-ui/react';
import InstitutionInformationForm from './form-components/InstitutionInformationForm';
import InstitutionConditionsForm from './form-components/InstitutionConditionsForm';




export default function TabComponent() {
  const HeaderBackground = useColorModeValue('white', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  
  return (
    <Tabs  isFitted variant='enclosed'>
      <TabList   shadow={'md'} borderTop={'aliceblue'}  mb='1em'>
        <Tab _hover={{
              bg: 'gray.50',
             
            }}  fontWeight={'small'} fontSize={'xl'} m='1'>Partner Kurumların Bilgileri</Tab>
        <Tab _hover={{
              bg: 'gray.50',
              
            }} fontWeight={'small'} fontSize={'xl'} m='1'>Partner Kurumların İş Birliği Koşulları</Tab>
        <Tab _hover={{
              bg: 'gray.50',
              
            }}  fontWeight={'small'} fontSize={'xl'} m='1'>Ön İzleme / Kaydetme</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
        <InstitutionInformationForm pageName= 'Kurum Bilgilerim' subText={'Lütfen kurumunuzun bilgilerini doldurunuz.'}/>
        <InstitutionInformationForm pageName= 'Partner Kurum Bilgileri'subText={'Lütfen partner kurumun bilgilerini doldurunuz.'}/>
        </TabPanel>
        <TabPanel>
        <InstitutionConditionsForm pageName= 'Kurumuma Ait Koşullar'subText={'Lütfen kurumunuza ait koşulları doldurunuz.'}/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
