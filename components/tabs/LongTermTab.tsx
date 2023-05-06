import {
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import StudentInformationForm from '../forms/StudentInformationForm';
import SendingInstitutionInformationForm from '../forms/SendingInstitutionInformationForm';
import MobilityProgramForm from '../forms/MobilityProgramForm';
import CommitmentSignatureForm from '../forms/CommitmentSignatureForm';
import VirtualComponentForm from '../forms/VirtualComponentForm';

export default function TabComponent() {
  const HeadingColor = useColorModeValue('gray.600', 'gray.300');
  return (
    <Tabs variant='colorful' colorScheme='gray'>
      <TabList>
        <Tab>Öğrenciye Ait Bilgiler</Tab>
        <Tab>Gönderen Kurum / Üniversite Bilgisi</Tab>
        <Tab>Alıcı Kurum / Üniversite Bilgisi</Tab>
        <Tab>Hareketlilik (Mobilite) Programı</Tab>
        <Tab>Sanal Dersler/ Sanal Komponentler</Tab>
        <Tab>Taahhüt / İmza Bilgileri</Tab>
      </TabList>
      <Box pl='12'>
        <Heading
          as='h3'
          size='md'
          py='1'
          fontWeight={'medium'}
          color={HeadingColor}
        >
          Uzun Dönem Hareketlilik
        </Heading>
      </Box>
      <TabPanels>
        <TabPanel>
          <StudentInformationForm pageName='Öğrenciye Ait Bilgiler' />
        </TabPanel>
        <TabPanel>
          <SendingInstitutionInformationForm pageName='Gönderen Kurum Üniversite Bilgisi' />
        </TabPanel>
        <TabPanel>
          <SendingInstitutionInformationForm pageName='Alıcı Kurum Üniversite Bilgisi' />
        </TabPanel>
        <TabPanel>
          <MobilityProgramForm
            pageName={'Hareketlilik Programı'}
          ></MobilityProgramForm>
        </TabPanel>
        <TabPanel>
          <VirtualComponentForm
            pageName={'Virtual Compnent'}
          ></VirtualComponentForm>
        </TabPanel>
        <TabPanel>
          <CommitmentSignatureForm pageName='Taahhüt Metni'></CommitmentSignatureForm>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
