import CommitmentSignatureForm from '@/components/forms/CommitmentSignatureForm';
import MobilityProgramFormLongTerm from '@/components/forms/MobilityProgramFormLongTerm';
import ReceivingInstitutionInfoForm from '@/components/forms/ReceivingInstitutionInfoFormOLA';
import SendingInstitutionInfoForm from '@/components/forms/SendingInstitutionInfoFormOLA';
import StudentInformationForm from '@/components/forms/StudentInformationForm';
import VirtualComponentForm from '@/components/forms/VirtualComponentForm';
import useCreate from '@/hooks/create/useCreate';
import useUpdate from '@/hooks/update/useUpdate';
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
import { useState, useEffect } from 'react';

export default function TabComponent() {
  const {
    GenerateOmobilityId,
    GenerateNewIdForLearningAgreement,
    GenerateNewIdForStudentInfo,
    GenerateNewIdForSendingInstitutionInfo,
    GenerateNewIdForReceivingInstitutionInfo,
    GenerateNewIdForProposedMobilityProgramme,
  } = useCreate();
  const { InsertEmptyRowToLearningAgreement } = useUpdate();
  const [omobilityID, setOmobilityID] = useState('');
  const [learningAgreementID, setLearningAgreementID] = useState(0);
  const [studentInfoID, setStudentInfoID] = useState(0);
  const [sendingInstitutionInfoID, setSendingInstitutionInfoID] = useState(0);
  const [receivingInstitutionInfoID, setReceivingInstitutionInfoID] =
    useState(0);
  const [proposedMobilityProgrammeID, setProposedMobilityProgrammeID] =
    useState(0);
  const [mobilityTypeId, setMobilityTypeId] = useState(1);

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

  async function handleGenerateNewIdForLearningAgreement() {
    try {
      const data = await GenerateNewIdForLearningAgreement(
        'https://localhost:5001/spGenerateNewIdForLearningAgreement'
      );
      if (data !== null && data !== undefined && learningAgreementID === 0) {
        setLearningAgreementID(data);
        handleInsertEmptyRowToLearningAgreement(data);
      } else {
        throw new Error('No data received for learning agreement ID');
      }
    } catch (error) {
      console.error('Error generating learning agreement ID:', error);
      // Handle error: display an error message to the user or perform other error handling tasks
    }
  }

  async function handleInsertEmptyRowToLearningAgreement(laId: number) {
    try {
      const data = await InsertEmptyRowToLearningAgreement(
        'https://localhost:5001/spInsertEmptyRowToLearningAgreement?learningAgreement_id=' +
          laId
      );
      console.log('inserted empty la row ', laId);
    } catch (error) {
      console.error('Error inserting learning agreement:', error);
      // Handle error: display an error message to the user or perform other error handling tasks
    }
  }

  async function handleGenerateNewIdForStudentInfo() {
    const fetchStudentInfoID = async () => {
      const data = await GenerateNewIdForStudentInfo(
        'https://localhost:5001/spGenerateNewIdForStudentInfo'
      );
      if (data) {
        setStudentInfoID(data);
      }
    };
    fetchStudentInfoID();
  }

  async function handleGenerateNewIdForSendingInstitutionInfo() {
    const fetchSendingInstitutionInfoID = async () => {
      const data = await GenerateNewIdForSendingInstitutionInfo(
        'https://localhost:5001/spGenerateNewIdForSendingInstitutionInfo'
      );
      if (data) {
        setSendingInstitutionInfoID(data);
      }
    };
    fetchSendingInstitutionInfoID();
  }

  async function handleGenerateNewIdForReceivingInstitutionInfo() {
    const fetchReceivingInstitutionInfoID = async () => {
      const data = await GenerateNewIdForReceivingInstitutionInfo(
        'https://localhost:5001/spGenerateNewIdForReceivingInstitutionInfo'
      );
      if (data) {
        setReceivingInstitutionInfoID(data);
      }
    };
    fetchReceivingInstitutionInfoID();
  }

  async function handleGenerateNewIdForProposedMobilityProgramme() {
    const fetchProposedMobilityProgrammeID = async () => {
      const data = await GenerateNewIdForProposedMobilityProgramme(
        'https://localhost:5001/spGenerateNewIdForProposedMobilityProgramme'
      );
      if (data) {
        setProposedMobilityProgrammeID(data);
      }
    };
    fetchProposedMobilityProgrammeID();
  }

  useEffect(() => {
    handleGenerateOmobilityId();
    handleGenerateNewIdForLearningAgreement();
    handleGenerateNewIdForStudentInfo();
    handleGenerateNewIdForSendingInstitutionInfo();
    handleGenerateNewIdForReceivingInstitutionInfo();
    handleGenerateNewIdForProposedMobilityProgramme();
  }, []);
  return (
    <Tabs variant='colorful' colorScheme='gray'>
      <TabList overflowX='auto'>
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
            studentInfo={undefined}
            pageName='Öğrenciye Ait Bilgiler'
            omobilityId={omobilityID}
            mobilityType='Long-term Mobility'
            mobilityTypeId={mobilityTypeId}
            studentInfoId={studentInfoID}
            learningAgreementID={learningAgreementID}
          />
        </TabPanel>
        <TabPanel>
          <SendingInstitutionInfoForm
            pageName='Gönderen Kurum /Üniversite Bilgisi'
            heiId='iyte.edu.tr'
            heiName='Izmir Institute Of Technology'
            institutionInfoID={21}
            sendingInstitutionInfoId={sendingInstitutionInfoID}
            learningAgreementId={learningAgreementID}
          />
          <ReceivingInstitutionInfoForm
            pageName='Alıcı Kurum /Üniversite Bilgisi'
            receivingInstitutionInfoId={receivingInstitutionInfoID}
            learningAgreementId={learningAgreementID}
          />
        </TabPanel>
        <TabPanel>
          <MobilityProgramFormLongTerm
            pageName={'Hareketlilik Programı'}
            pmpID={proposedMobilityProgrammeID}
            learningAgreementID={learningAgreementID}
          ></MobilityProgramFormLongTerm>
        </TabPanel>
        <TabPanel>
          <VirtualComponentForm
            pageName={'Virtual Compnent'}
            pmpID={proposedMobilityProgrammeID}
            learningAgreementID={learningAgreementID}
          ></VirtualComponentForm>
        </TabPanel>
        <TabPanel>
          <CommitmentSignatureForm
            pageName='Taahhüt Metni'
            learningAgreementID={learningAgreementID}
          ></CommitmentSignatureForm>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
