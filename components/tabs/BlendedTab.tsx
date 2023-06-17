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
import InstitutionInformationFormOLA from '../forms/InstitutionInformationFormOLA';
import MobilityProgramFormDoctoralAndBlended from '../forms/MobilityProgramFormDoctoralAndBlended';
import CommitmentSignatureForm from '../forms/CommitmentSignatureForm';
import useCreate from '@/hooks/create/useCreate';
import { useState, useEffect } from 'react';

export default function TabComponent() {
  const {
    GenerateOmobilityId,
    GenerateNewIdForLearningAgreement,
    GenerateNewIdForStudentInfo,
    GenerateNewIdForSendingInstitutionInfo,
    GenerateNewIdForReceivingInstitutionInfo,
    GenerateNewIdForProposedMobilityProgramme,
    GenerateNewIdForCommitment,
  } = useCreate();

  const [omobilityID, setOmobilityID] = useState('');
  const [learningAgreementID, setLearningAgreementID] = useState('');
  const [studentInfoID, setStudentInfoID] = useState('');
  const [sendingInstitutionInfoID, setSendingInstitutionInfoID] = useState('');
  const [receivingInstitutionInfoID, setReceivingInstitutionInfoID] =
    useState('');
  const [proposedMobilityProgrammeID, setProposedMobilityProgrammeID] =
    useState('');
  const [commitmentID, setCommitmentID] = useState('');
  const [mobilityTypeId, setMobilityTypeId] = useState(2);

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

  async function handleGenerateNewIdForCommitment() {
    const fetchCommitmentID = async () => {
      const data = await GenerateNewIdForCommitment(
        'https://localhost:5001/spGenerateNewIdForCommitment'
      );
      if (data) {
        setCommitmentID(data);
      }
    };
    fetchCommitmentID();
  }

  useEffect(() => {
    handleGenerateOmobilityId();
    handleGenerateNewIdForLearningAgreement();
    handleGenerateNewIdForStudentInfo();
    handleGenerateNewIdForSendingInstitutionInfo();
    handleGenerateNewIdForReceivingInstitutionInfo();
    handleGenerateNewIdForProposedMobilityProgramme();
    handleGenerateNewIdForCommitment();
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
          Karma Hareketlilik
        </Heading>
      </Box>
      <TabPanels>
        <TabPanel>
          <StudentInformationForm
            pageName='Öğrenciye Ait Bilgiler'
            omobilityId={omobilityID}
            mobilityType='Blended Mobility'
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
