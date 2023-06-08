import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  Text,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

import useCreate from '@/hooks/create/useCreate';
import { IdForBothResponse } from '@/models/response/idForBothResponse';
import { useState } from 'react';
import InstitutionConditionsForm from '@/components/forms/InstitutionConditionsForm';
import InstitutionInformationFormIIA from '@/components/forms/InstitutionInformationFormIIA';
import PreviewOrSaveForm from '@/components/forms/PreviewOrSaveForm';
import useRead from '@/hooks/read/useRead';


export default function TabComponent() {
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const [newOrganizationInfoId, setNewOrganizationInfoId] = useState(0);
  const [newPartnerOrganizationInfoId, setNewPartnerOrganizationInfoId] =
    useState(0);
  const [bilateralAgreementID, setBilateralAgreementID] = useState(0);
  const [bilateralAgreementState, setbilateralAgreementState] = useState('');
  const {
    GenerateBilateralAgreementID,
    GenerateIdsForBothOrganizationAndPartnerOrganization,
    GenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition,
  } = useCreate();
  const {
    
    CheckIfBilateralAgreementIsInEffect,
  } = useRead();
  async function handleIDForBoth() {
    const fetchInitialData = async () => {
      const data: IdForBothResponse = (
        await GenerateIdsForBothOrganizationAndPartnerOrganization(
          'https://localhost:5001/spGenerateIdsForBothOrganizationAndPartnerOrganization'
        )
      )[0]; // Call the fetchData function
      if (data) {
        setNewOrganizationInfoId(data.newOrganizationInfoId);
        setNewPartnerOrganizationInfoId(data.newPartnerOrganizationInfoId);
      }
    };
    fetchInitialData();
  }

  async function handleIDForBothCollaborationCondition() {
    const fetchCollaborationConditionData = async () => {
      const data =
        await GenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition(
          'https://localhost:5001/spGenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition'
        );
    };
    fetchCollaborationConditionData();
  }

  async function handleGenerateBilateralAgreementID() {
    const fetchBilateralAgreementID = async () => {
      const data = await GenerateBilateralAgreementID(
        'https://localhost:5001/spGenerateBilateralAgreementId'
      );
      if (data) {
        setBilateralAgreementID(data);
      }
    };
    fetchBilateralAgreementID();
  }
  async function handleCheckIfBilateralAgreementIsInEffect() {
    const fetchBilateralAgreementIsInEffect = async () => {
    
      const data = await CheckIfBilateralAgreementIsInEffect(
        'https://localhost:5001/spCheckIfBilateralAgreementIsInEffect?bilateralAgreement_id=' + bilateralAgreementID
      );
      if (data) {
        setbilateralAgreementState(data);
        console.log("--------",data);
      }
    };
    fetchBilateralAgreementIsInEffect();
  }

  
  handleIDForBoth();
  handleIDForBothCollaborationCondition();
  handleGenerateBilateralAgreementID();
  handleCheckIfBilateralAgreementIsInEffect();
  return (
    <Tabs variant='colorful' colorScheme='gray'>
      <TabList>
        <Tab>Partner Kurumların Bilgileri</Tab>
        <Tab>Partner Kurumların İş Birliği Koşulları</Tab>
        <Tab>Ön İzleme / Kaydetme</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <InstitutionInformationFormIIA
            pageName='Kurum Bilgilerim'
            subText={'Lütfen kurumunuzun bilgilerini doldurunuz.'}
            organizationInfoId={newOrganizationInfoId}
            isPartnerValue={0}
            bilateralAgreementID={bilateralAgreementID}
          />
          <InstitutionInformationFormIIA
            pageName='Partner Kurum Bilgileri'
            subText={'Lütfen partner kurumun bilgilerini doldurunuz.'}
            organizationInfoId={newPartnerOrganizationInfoId}
            isPartnerValue={1}
            bilateralAgreementID={bilateralAgreementID}
          />
        </TabPanel>
        <TabPanel>
          <InstitutionConditionsForm
            pageName='Kurumuma Ait Koşullar'
            subText={'Lütfen kurumunuza ait koşulları doldurunuz.'}
          />
          <InstitutionConditionsForm
            pageName='Partner Kuruma Ait Koşullar'
            subText={'Lütfen partner kuruma ait koşulları doldurunuz.'}
          />
        </TabPanel>
        <TabPanel>
          <PreviewOrSaveForm pageName='Kurumuma Ait Bilgiler' />
          <PreviewOrSaveForm pageName='Partner Kuruma Ait Bilgiler' />
          <Flex
            bgColor={HeaderBackground}
            mb={'100'}
            borderRadius={'md'}
            height={50}
          >
            <Heading
              pl={6}
              py={4}
              as='h3'
              size='md'
              fontWeight={'medium'}
              color={HeadingColor}
            >
               Anlaşma Yürürlük Durumu: {bilateralAgreementState === 'Hayır' ? 'Yürürlükte değil' : 'Yürürlükte'}
            </Heading>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
