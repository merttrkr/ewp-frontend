import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from '@chakra-ui/react';
import InstitutionInformationForm from './form-components/InstitutionInformationForm';



export default function TabComponent() {
  const HeaderBackground = useColorModeValue('white', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  return (
    <Tabs isFitted variant='enclosed'>
      <TabList mb='1em'>
        <Tab>Partner Kurumların Bilgileri</Tab>
        <Tab>Partner Kurumların İş Birliği Koşulları</Tab>
        <Tab>Ön İzleme / Kaydetme</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
        <InstitutionInformationForm pageName= 'Kurum Bilgilerim' subText={'Lütfen kurumunuzun bilgilerini doldurunuz.'}/>
        <InstitutionInformationForm pageName= 'Partner Kurum Bilgileri'subText={'Lütfen partner kurumun bilgilerini doldurunuz.'}/>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
