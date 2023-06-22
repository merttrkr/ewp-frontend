import CommitmentSignatureForm from '@/components/forms/CommitmentSignatureForm';
import MobilityProgramFormDoctoralAndBlended from '@/components/forms/MobilityProgramFormDoctoralAndBlended';
import ReceivingInstitutionInfoForm from '@/components/forms/ReceivingInstitutionInfoFormOLA';
import StudentInformationForm from '@/components/forms/StudentInformationForm';
import useCreate from '@/hooks/create/useCreate';
import SendingInstitutionInfoForm from '@/components/forms/SendingInstitutionInfoFormOLA';
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

  const [omobilityID, setOmobilityID] = useState('');
  const [learningAgreementID, setLearningAgreementID] = useState(0);
  const [studentInfoID, setStudentInfoID] = useState(0);
  const [sendingInstitutionInfoID, setSendingInstitutionInfoID] = useState(0);
  const [receivingInstitutionInfoID, setReceivingInstitutionInfoID] =
    useState(0);
  const [proposedMobilityProgrammeID, setProposedMobilityProgrammeID] =
    useState(0);
  const [mobilityTypeId, setMobilityTypeId] = useState(3);

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
    const fetchLearningAgreementID = async () => {
      const data = await GenerateNewIdForLearningAgreement(
        'https://localhost:5001/spGenerateNewIdForLearningAgreement'
      );
      if (data) {
        setLearningAgreementID(data);
      }
    };
    fetchLearningAgreementID();
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
          Kısa Dönem Doktora Hareketliliği
        </Heading>
      </Box>
      <TabPanels>
        <TabPanel>
          <StudentInformationForm
            studentInfo={undefined}
            pageName='Öğrenciye Ait Bilgiler'
            omobilityId={omobilityID}
            mobilityType='Short-term Doctoral Mobility'
            mobilityTypeId={mobilityTypeId}
            studentInfoId={studentInfoID}
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
          <MobilityProgramFormDoctoralAndBlended
            pageName={'Hareketlilik Programı'}
            pmpID={proposedMobilityProgrammeID}
          ></MobilityProgramFormDoctoralAndBlended>
        </TabPanel>
        <TabPanel>
          <CommitmentSignatureForm pageName='Taahhüt Metni'></CommitmentSignatureForm>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
