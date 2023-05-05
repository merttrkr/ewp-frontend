import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from '@chakra-ui/react';
import InstitutionInformationForm from './InstitutionInformationForm';
import InstitutionConditionsForm from './InstitutionConditionsForm';
import PreviewOrSaveForm from './PreviewOrSaveForm';
import StudentInformationForm from './StudentInformationForm';
import SendingInstitutionInformationForm from './SendingInstitutionInformationForm';

export default function TabComponent() {
  return (
    <Tabs variant='colorful' colorScheme='gray'>
      <TabList>
        <Tab>Öğrenciye Ait Bilgiler</Tab>
        <Tab>Gönderen Kurum / Üniversite Bilgisi</Tab>
        <Tab>Alıcı Kurum / Üniversite Bilgisi</Tab>
        <Tab>Hareketlilik (Mobilite) Programı</Tab>
        <Tab>Taahüt / İmza Bilgileri</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <StudentInformationForm
            pageName='Öğrenciye Ait Bilgiler'
            subText=''
          />
        </TabPanel>
        <TabPanel>
          <SendingInstitutionInformationForm
            pageName='Gönderen Kurum Üniversite Bilgisi'
            subText=''
          />
        </TabPanel>
        <TabPanel>
          <PreviewOrSaveForm pageName='Kurumuma Ait Bilgiler' />
          <PreviewOrSaveForm pageName='Partner Kuruma Ait Bilgiler' />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
