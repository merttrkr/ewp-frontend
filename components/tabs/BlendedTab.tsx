import {
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from '@chakra-ui/react';
import StudentInformationForm from '../forms/StudentInformationForm';
import SendingInstitutionInformationForm from '../forms/SendingInstitutionInformationForm';
import MobilityProgramFormDoctoralAndBlended from '../forms/MobilityProgramFormDoctoralAndBlended';
import CommitmentSignatureForm from '../forms/CommitmentSignatureForm';

export default function TabComponent() {
  const HeadingColor = useColorModeValue('gray.600', 'gray.300');
  return (
    <Tabs variant='colorful' colorScheme='gray'>
      <TabList>
        <Tab>Öğrenciye Ait Bilgiler</Tab>
        <Tab>Kurum / Üniversite Bilgisi</Tab>
        <Tab>Hareketlilik (Mobilite) Programı</Tab>
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
          Karma Hareketlilik
        </Heading>
      </Box>
      <TabPanels>
        <TabPanel>
          <StudentInformationForm pageName='Öğrenciye Ait Bilgiler' />
        </TabPanel>
        <TabPanel>
          <SendingInstitutionInformationForm pageName='Kurum /Üniversite Bilgisi' />
        </TabPanel>
        <TabPanel>
          <MobilityProgramFormDoctoralAndBlended
            pageName={'Hareketlilik Programı'}
          ></MobilityProgramFormDoctoralAndBlended>
        </TabPanel>
        <TabPanel>
          <CommitmentSignatureForm pageName='Taahhüt Metni'></CommitmentSignatureForm>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
