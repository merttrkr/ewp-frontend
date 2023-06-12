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
import InstitutionInformationFormOLA from '../forms/InstitutionInformationFormOLA';
import MobilityProgramFormLongTerm from '../forms/MobilityProgramFormLongTerm';
import CommitmentSignatureForm from '../forms/CommitmentSignatureForm';
import VirtualComponentForm from '../forms/VirtualComponentForm';
import useCreate from '@/hooks/create/useCreate';
import { useState, useEffect } from 'react';

export default function TabComponent() {
  const { GenerateOmobilityId } = useCreate();
  const [omobilityID, setOmobilityID] = useState('');
  const HeadingColor = useColorModeValue('gray.600', 'gray.300');

  async function handleGenerateOmobilityId() {
    const fetchOmobilityID = async () => {
      const data = await GenerateOmobilityId(
        'https://localhost:5001/spGenerateOmobilityId'
      );
      if (data) {
        setOmobilityID(data);
      }
    };
    fetchOmobilityID();
  }
  useEffect(() => {
    handleGenerateOmobilityId();
  }, []);

  return (
    <Tabs variant='colorful' colorScheme='gray'>
      <TabList>
        <Tab>Öğrenciye Ait Bilgiler</Tab>
        <Tab>Kurum / Üniversite Bilgisi</Tab>
        <Tab>Hareketlilik (Mobilite) Programı</Tab>
        <Tab>Sanal Dersler/ Komponentler</Tab>
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
          <StudentInformationForm
            pageName='Öğrenciye Ait Bilgiler'
            omobilityId={omobilityID}
            mobilityType='Long-term Mobility'
          />
        </TabPanel>
        <TabPanel>
          <InstitutionInformationFormOLA
            pageName='Gönderen Kurum /Üniversite Bilgisi'
            heiId='iyte.edu.tr'
            heiName='Izmir Institute Of Technology'
          />
          <InstitutionInformationFormOLA pageName='Alıcı Kurum /Üniversite Bilgisi' />
        </TabPanel>
        <TabPanel>
          <MobilityProgramFormLongTerm
            pageName={'Hareketlilik Programı'}
          ></MobilityProgramFormLongTerm>
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
