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
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import useRead from '@/hooks/read/useRead';
import { StudentInfoResponse } from '@/models/response/studentInfoResponse';
import { set } from 'react-hook-form';

export default function TabComponent() {
  const {
    GenerateOmobilityId,
    GenerateNewIdForLearningAgreement,
    GenerateNewIdForStudentInfo,
    GenerateNewIdForSendingInstitutionInfo,
    GenerateNewIdForReceivingInstitutionInfo,
    GenerateNewIdForProposedMobilityProgramme,
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
  const [mobilityTypeId, setMobilityTypeId] = useState(2);
  const [studentInfo, setStudentInfo] = useState<StudentInfoResponse>();
  const [urlSetted, setUrlSetted] = useState(false);
  const HeadingColor = useColorModeValue('gray.600', 'gray.300');

  const {
    studentInfoId,
    proposedMobilityProgrammeId,
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
      if (studentInfo && Object.keys(studentInfo).length !== 0) {
        setStudentInfo(studentInfo);
      }

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
      if (data !== null && data !== undefined && omobilityID === '') {
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
      if (data !== null && data !== undefined && learningAgreementID === 0) {
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
      if (data !== null && data !== undefined && studentInfoID === 0) {
        setStudentInfoID(data);
        console.log('set ettim Student Info ID:', studentInfoID);
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
      if (
        data !== null &&
        data !== undefined &&
        sendingInstitutionInfoID === 0
      ) {
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
      if (
        data !== null &&
        data !== undefined &&
        receivingInstitutionInfoID === 0
      ) {
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
      if (
        data !== null &&
        data !== undefined &&
        proposedMobilityProgrammeID === 0
      ) {
        setProposedMobilityProgrammeID(data);
      } else {
        throw new Error('No data received for proposed mobility programme ID');
      }
    } catch (error) {
      console.error('Error generating proposed mobility programme ID:', error);
      // Handle error: display an error message to the user or perform other error handling tasks
    }
  }

  useEffect(() => {
    setStudentInfoID(Number(studentInfoId) || studentInfoID);
    setProposedMobilityProgrammeID(
      Number(proposedMobilityProgrammeId) || studentInfoID
    );
    setSendingInstitutionInfoID(
      Number(sendingInstitutionInfoId) || studentInfoID
    );
    setReceivingInstitutionInfoID(
      Number(receivingInstitutionInfoId) || studentInfoID
    );
    setUrlSetted(true);
  }, [
    studentInfoId,
    proposedMobilityProgrammeId,
    sendingInstitutionInfoId,
    receivingInstitutionInfoId,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Student Info Id:', studentInfoId);
        console.log(
          'Proposed Mobility Programme Id:',
          proposedMobilityProgrammeId
        );

        await Promise.all([
          handleGetStudentInfoById(),
          studentInfoID === 0 && handleGenerateNewIdForStudentInfo(),
          (omobilityID === '' ||
            omobilityID === undefined ||
            omobilityID === null) &&
            handleGenerateOmobilityId(),
          (learningAgreementID === 0 ||
            learningAgreementID === undefined ||
            learningAgreementID === null) &&
            handleGenerateNewIdForLearningAgreement(),
          sendingInstitutionInfoID === 0 &&
            handleGenerateNewIdForSendingInstitutionInfo(),
          receivingInstitutionInfoID === 0 &&
            handleGenerateNewIdForReceivingInstitutionInfo(),
          proposedMobilityProgrammeID === 0 &&
            handleGenerateNewIdForProposedMobilityProgramme(),
        ]);
      } catch (error) {
        console.error('Error generating data:', error);
        // Set an error state variable and display an error message to the user
      } finally {
        // Set a loading state variable to false to indicate that the data fetching is complete
      }
    };
    if (urlSetted) {
      console.log('url setted');

      fetchData();
    }
  }, [urlSetted]);

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
            studentInfo={studentInfo}
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
