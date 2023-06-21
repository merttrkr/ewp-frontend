import CommitmentSignatureForm from '@/components/forms/CommitmentSignatureForm';
import MobilityProgramFormDoctoralAndBlended from '@/components/forms/MobilityProgramFormDoctoralAndBlended';
import ReceivingInstitutionInfoForm from '@/components/forms/ReceivingInstitutionInfoFormOLA';
import StudentInformationForm from '@/components/forms/StudentInformationForm';
import SendingInstitutionInfoForm from '@/components/forms/SendingInstitutionInfoFormOLA';
import useCreate from '@/hooks/create/useCreate';
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
import { useRouter } from 'next/router';
import useRead from '@/hooks/read/useRead';
import { StudentInfoResponse } from '@/models/response/studentInfoResponse';

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
  const { GetStudentInfoById } = useRead();
  const router = useRouter();

  const [omobilityID, setOmobilityID] = useState('');
  const [learningAgreementID, setLearningAgreementID] = useState(0);
  const [studentInfoID, setStudentInfoID] = useState(0);
  const [sendingInstitutionInfoID, setSendingInstitutionInfoID] = useState(0);
  const [receivingInstitutionInfoID, setReceivingInstitutionInfoID] =
    useState(0);
  const [proposedMobilityProgrammeID, setProposedMobilityProgrammeID] =
    useState(0);
  const [commitmentID, setCommitmentID] = useState(0);
  const [mobilityTypeId, setMobilityTypeId] = useState(2);
  const [studentInfo, setStudentInfo] = useState<StudentInfoResponse>();

  const HeadingColor = useColorModeValue('gray.600', 'gray.300');

  const {
    studentInfoId,
    proposedMobilityProgrammeId,
    commitmentId,
    sendingInstitutionInfoId,
    receivingInstitutionInfoId,
    virtualComponentId,
  } = router.query;

  const handleGetStudentInfoById = async () => {
    const request =
      'https://localhost:5001/spGetStudentInfoById?studentInfo_id=' +
      studentInfoID;
    try {
      const studentInfo = await GetStudentInfoById(request);

      console.log('Student Info:', studentInfo);
      // Handle the received studentInfo data: update state, display to the user, etc.
    } catch (error) {
      console.error('Error fetching student info:', error);
      // Handle error: display an error message to the user or perform other error handling tasks
    }
  };

  async function handleGenerateOmobilityId() {
    try {
      const data = await GenerateOmobilityId(
        'https://localhost:5001/spGenerateOmobilityId'
      );
      if (data !== null && data !== undefined) {
        setOmobilityID(data);
      } else {
        throw new Error('No data received for omobility ID');
      }
    } catch (error) {
      console.error('Error generating omobility ID:', error);
      // Handle error: display an error message to the user or perform other error handling tasks
    }
  }

  async function handleGenerateNewIdForLearningAgreement() {
    try {
      const data = await GenerateNewIdForLearningAgreement(
        'https://localhost:5001/spGenerateNewIdForLearningAgreement'
      );
      if (data !== null && data !== undefined) {
        setLearningAgreementID(data);
      } else {
        throw new Error('No data received for learning agreement ID');
      }
    } catch (error) {
      console.error('Error generating learning agreement ID:', error);
      // Handle error: display an error message to the user or perform other error handling tasks
    }
  }

  async function handleGenerateNewIdForStudentInfo() {
    try {
      const data = await GenerateNewIdForStudentInfo(
        'https://localhost:5001/spGenerateNewIdForStudentInfo'
      );
      if (data !== null && data !== undefined) {
        setStudentInfoID(data);
      } else {
        throw new Error('No data received for student info ID');
      }
    } catch (error) {
      console.error('Error generating student info ID:', error);
      // Handle error: display an error message to the user or perform other error handling tasks
    }
  }

  async function handleGenerateNewIdForSendingInstitutionInfo() {
    try {
      const data = await GenerateNewIdForSendingInstitutionInfo(
        'https://localhost:5001/spGenerateNewIdForSendingInstitutionInfo'
      );
      if (data !== null && data !== undefined) {
        setSendingInstitutionInfoID(data);
      } else {
        throw new Error('No data received for sending institution info ID');
      }
    } catch (error) {
      console.error('Error generating sending institution info ID:', error);
      // Handle error: display an error message to the user or perform other error handling tasks
    }
  }

  async function handleGenerateNewIdForReceivingInstitutionInfo() {
    try {
      const data = await GenerateNewIdForReceivingInstitutionInfo(
        'https://localhost:5001/spGenerateNewIdForReceivingInstitutionInfo'
      );
      if (data !== null && data !== undefined) {
        setReceivingInstitutionInfoID(data);
      } else {
        throw new Error('No data received for receiving institution info ID');
      }
    } catch (error) {
      console.error('Error generating receiving institution info ID:', error);
      // Handle error: display an error message to the user or perform other error handling tasks
    }
  }

  async function handleGenerateNewIdForProposedMobilityProgramme() {
    try {
      const data = await GenerateNewIdForProposedMobilityProgramme(
        'https://localhost:5001/spGenerateNewIdForProposedMobilityProgramme'
      );
      if (data !== null && data !== undefined) {
        setProposedMobilityProgrammeID(data);
      } else {
        throw new Error('No data received for proposed mobility programme ID');
      }
    } catch (error) {
      console.error('Error generating proposed mobility programme ID:', error);
      // Handle error: display an error message to the user or perform other error handling tasks
    }
  }

  async function handleGenerateNewIdForCommitment() {
    try {
      const data = await GenerateNewIdForCommitment(
        'https://localhost:5001/spGenerateNewIdForCommitment'
      );
      if (data !== null && data !== undefined) {
        setCommitmentID(data);
      } else {
        throw new Error('No data received for commitment ID');
      }
    } catch (error) {
      console.error('Error generating commitment ID:', error);
      // Handle error: display an error message to the user or perform other error handling tasks
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Student Info Id:', studentInfoId);
        console.log(
          'Proposed Mobility Programme Id:',
          proposedMobilityProgrammeId
        );
        console.log('Commitment Id:', commitmentId);

        setStudentInfoID(Number(studentInfoId) || 0);
        setProposedMobilityProgrammeID(
          Number(proposedMobilityProgrammeId) || 0
        );
        setCommitmentID(Number(commitmentId) || 0);

        await Promise.all([
          (studentInfoID === 0 ||
            studentInfoID === undefined ||
            studentInfoID === null) &&
            handleGenerateNewIdForStudentInfo(),
          (omobilityID === '' ||
            omobilityID === undefined ||
            omobilityID === null) &&
            handleGenerateOmobilityId(),
          (learningAgreementID === 0 ||
            learningAgreementID === undefined ||
            learningAgreementID === null) &&
            handleGenerateNewIdForLearningAgreement(),

          handleGenerateNewIdForSendingInstitutionInfo(),
          handleGenerateNewIdForReceivingInstitutionInfo(),
          handleGenerateNewIdForProposedMobilityProgramme(),
          handleGenerateNewIdForCommitment(),
        ]);
      } catch (error) {
        console.error('Error generating data:', error);
        // Set an error state variable and display an error message to the user
      } finally {
        // Set a loading state variable to false to indicate that the data fetching is complete
      }
    };

    fetchData();
  }, [studentInfoId, proposedMobilityProgrammeId, commitmentId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          console.log('Student Info ID:', studentInfoID),

          handleGetStudentInfoById(),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set an error state variable and display an error message to the user
      } finally {
        // Set a loading state variable to false to indicate that the data fetching is complete
      }
    };

    fetchData();
  }, [studentInfoID]);

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
