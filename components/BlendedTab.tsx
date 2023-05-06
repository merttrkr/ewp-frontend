import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from '@chakra-ui/react';
import StudentInformationForm from './StudentInformationForm';
import SendingInstitutionInformationForm from './SendingInstitutionInformationForm';
import MobilityProgramForm from './MobilityProgramForm';
import CommitmentSignatureForm from './CommitmentSignatureForm';

export default function TabComponent() {
  return (
    <Tabs variant='colorful' colorScheme='gray'>
      <TabList>
        <Tab>Öğrenciye Ait Bilgiler</Tab>
        <Tab>Gönderen Kurum / Üniversite Bilgisi</Tab>
        <Tab>Alıcı Kurum / Üniversite Bilgisi</Tab>
        <Tab>Hareketlilik (Mobilite) Programı</Tab>
        <Tab>Taahhüt / İmza Bilgileri</Tab>
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
          <SendingInstitutionInformationForm
            pageName='Alıcı Kurum Üniversite Bilgisi'
            subText=''
          />
        </TabPanel>
        <TabPanel>
          <MobilityProgramForm
            pageName={'Hareketlilik Programı'}
          ></MobilityProgramForm>
        </TabPanel>
        <TabPanel>
          <CommitmentSignatureForm
            subText=''
            pageName='Taahhüt Metni'
          ></CommitmentSignatureForm>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
