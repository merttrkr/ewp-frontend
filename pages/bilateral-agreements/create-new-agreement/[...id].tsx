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
import { IdForBothCollaborationConditionResponse } from '@/models/response/idForBothCollaborationConditionResponse';
import InstitutionConditionsForm from '@/components/forms/InstitutionConditionsForm';
import InstitutionInformationFormIIA from '@/components/forms/InstitutionInformationFormIIA';
import PreviewOrSaveForm from '@/components/forms/PreviewOrSaveForm';
import useRead from '@/hooks/read/useRead';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function TabComponent() {
  const router = useRouter();
  const { id } = router.query;

  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');

  const [newCollaborationConditionId, setNewCollaborationConditionId] = useState(0);
  const [newPartnerCollaborationConditionId, setNewPartnerCollaborationConditionId] = useState(0);
  const [newOrganizationInfoId, setNewOrganizationInfoId] = useState(0);
  const [newPartnerOrganizationInfoId, setNewPartnerOrganizationInfoId] = useState(0);
  const [bilateralAgreementID, setBilateralAgreementID] = useState(0);
  const [bilateralAgreementState, setBilateralAgreementState] = useState('');
  const [saveState, setSaveState] = useState(0);

  const { CheckIfBilateralAgreementIsInEffect } = useRead();
  const {
    GenerateBilateralAgreementID,
    GenerateIdsForBothOrganizationAndPartnerOrganization,
    GenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition,
  } = useCreate();
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        console.log('id', id);
  
        const ids = id[0].split(',').map(Number);
        const [
          organizationInfoId,
          partnerOrganizationInfoId,
          collaborationConditionId,
          partnerCollaborationConditionId,
          agreementId,
        ] = ids;
        console.log('ids', ids);
  
        setNewOrganizationInfoId(organizationInfoId || 0);
        setNewPartnerOrganizationInfoId(partnerOrganizationInfoId || 0);
        setNewCollaborationConditionId(collaborationConditionId || 0);
        setNewPartnerCollaborationConditionId(partnerCollaborationConditionId || 0);
        setBilateralAgreementID(agreementId || 0);
  
        console.log('partnerCollaborationConditionId', organizationInfoId);
        console.log('partnerOrganizationInfoId', partnerOrganizationInfoId);
        console.log('collaborationConditionId', collaborationConditionId);
        console.log('partnerCollaborationConditionId', partnerCollaborationConditionId);
        console.log('agreementId', agreementId);
  
        // Check if any ID is missing and generate new states
        if (organizationInfoId === 0 || partnerOrganizationInfoId === 0) {
          handleIDForBoth();
        }
        if (collaborationConditionId === 0 || partnerCollaborationConditionId === 0) {
          handleIDForBothCollaborationCondition();
        }
        if (agreementId === 0) {
          handleGenerateBilateralAgreementID();
        }
  
        console.log('updated partnerCollaborationConditionId', organizationInfoId);
        console.log('updated partnerOrganizationInfoId', partnerOrganizationInfoId);
        console.log('updated collaborationConditionId', collaborationConditionId);
        console.log('updated partnerCollaborationConditionId', partnerCollaborationConditionId);
        console.log('updated agreementId', agreementId);
      }
    };
  
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchBilateralAgreementState = async () => {
      const data = await CheckIfBilateralAgreementIsInEffect(
        `https://localhost:5001/spCheckIfBilateralAgreementIsInEffect?bilateralAgreement_id=${bilateralAgreementID}`
      );

      if (data) {
        setBilateralAgreementState(data);
      }
    };

    if (bilateralAgreementID) {
      fetchBilateralAgreementState();
    }
  }, [bilateralAgreementID]);

  const handleIDForBoth = async () => {
    const data = await GenerateIdsForBothOrganizationAndPartnerOrganization(
      'https://localhost:5001/spGenerateIdsForBothOrganizationAndPartnerOrganization'
    );

    if (data) {
      if (newOrganizationInfoId === 0) {
        
        
        setNewOrganizationInfoId(data[0].newOrganizationInfoId);
      }
      if (newPartnerOrganizationInfoId === 0) {
        setNewPartnerOrganizationInfoId(data[0].newPartnerOrganizationInfoId);
      }
    }
  };

  const handleGenerateBilateralAgreementID = async () => {
    const data = await GenerateBilateralAgreementID(
      'https://localhost:5001/spGenerateBilateralAgreementId'
    );

    if (data) {
      if (bilateralAgreementID === 0) {
        setBilateralAgreementID(data);
      }
    }
  };

  const handleIDForBothCollaborationCondition = async () => {
    const data = await GenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition(
      'https://localhost:5001/spGenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition'
    );

    if (data) {
      if (newCollaborationConditionId === 0) {
        console.log('newCollaborationConditionId: '+ newCollaborationConditionId +'data[0].newOrganizationCollaborationConditionId: ' +data[0].newOrganizationCollaborationConditionId);
        setNewCollaborationConditionId(data[0].newOrganizationCollaborationConditionId);
      }
      if (newPartnerCollaborationConditionId === 0) {
        console.log('newPartnerCollaborationConditionId: '+ newPartnerCollaborationConditionId +'data[0].newPartnerOrganizationCollaborationConditionId): ' 
        + data[0].newPartnerOrganizationCollaborationConditionId);

        setNewPartnerCollaborationConditionId(data[0].newPartnerOrganizationCollaborationConditionId);
      }
    }
  };

  const handleSaveStateUpdate = () => {
    setSaveState((prevState) => prevState + 1);
  };
  useEffect(() => { 
    console.log('newCollaborationConditionId: '+ newCollaborationConditionId);
    console.log('newPartnerCollaborationConditionId: '+ newPartnerCollaborationConditionId);
    console.log('newOrganizationInfoId: '+ newOrganizationInfoId);
    console.log('newPartnerOrganizationInfoId: '+ newPartnerOrganizationInfoId);
    console.log('bilateralAgreementID: '+ bilateralAgreementID);

  }, [newCollaborationConditionId, newPartnerCollaborationConditionId, newOrganizationInfoId, newPartnerOrganizationInfoId, bilateralAgreementID]);
  return (
    <Tabs variant="colorful" colorScheme="gray">
      <TabList>
        <Tab>Partner Kurumların Bilgileri</Tab>
        <Tab>Partner Kurumların İş Birliği Koşulları</Tab>
        <Tab>Ön İzleme / Kaydetme</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <InstitutionInformationFormIIA
            onSave={handleSaveStateUpdate}
            saveState={saveState}
            pageName="Kurum Bilgilerim"
            subText="Lütfen kurumunuzun bilgilerini doldurunuz."
            organizationInfoId={newOrganizationInfoId}
            isPartnerValue={0}
            bilateralAgreementID={bilateralAgreementID}
          />
          <InstitutionInformationFormIIA
            onSave={handleSaveStateUpdate}
            saveState={saveState}
            pageName="Partner Kurum Bilgileri"
            subText="Lütfen partner kurumun bilgilerini doldurunuz."
            organizationInfoId={newPartnerOrganizationInfoId}
            isPartnerValue={1}
            bilateralAgreementID={bilateralAgreementID}
          />
        </TabPanel>
        <TabPanel>
          <InstitutionConditionsForm
            saveState={saveState}
            pageName="Kurumuma Ait Koşullar"
            subText="Lütfen kurumunuza ait koşulları doldurunuz."
            collaborationConditionId={newCollaborationConditionId}
            bilateralAgreementID={bilateralAgreementID}
            organizationInfoId={newOrganizationInfoId}
            partnerOrganizationInfoId={newPartnerOrganizationInfoId}
            partnerCollaborationConditionId={newPartnerCollaborationConditionId}
            isPartnerValue={0}
          />
          <InstitutionConditionsForm
            saveState={saveState}
            pageName="Partner Kuruma Ait Koşullar"
            subText="Lütfen partner kuruma ait koşulları doldurunuz."
            collaborationConditionId={newPartnerCollaborationConditionId}
            bilateralAgreementID={bilateralAgreementID}
            organizationInfoId={newPartnerOrganizationInfoId}
            partnerOrganizationInfoId={newOrganizationInfoId}
            partnerCollaborationConditionId={newCollaborationConditionId}
            isPartnerValue={1}
          />
        </TabPanel>
        <TabPanel>
          <PreviewOrSaveForm
            newPartnerCollaborationConditionId={newPartnerCollaborationConditionId}
            newCollaborationConditionId={newCollaborationConditionId}
            saveState={saveState}
            organizationInfoId={newOrganizationInfoId}
            bilateralAgreementID={bilateralAgreementID}
            pageName="Kurumuma Ait Bilgiler"
          />
          <PreviewOrSaveForm
            newPartnerCollaborationConditionId={newPartnerCollaborationConditionId}
            newCollaborationConditionId={newCollaborationConditionId}
            saveState={saveState}
            organizationInfoId={newPartnerOrganizationInfoId}
            bilateralAgreementID={bilateralAgreementID}
            pageName="Partner Kuruma Ait Bilgiler"
          />
          <Flex
            bgColor={HeaderBackground}
            mb={100}
            borderRadius="md"
            height={50}
            flexDirection={["column", "column", "row"]}
            alignItems={["center", "center", "flex-start"]}
            justifyContent={["center", "center", "flex-start"]}
            px={[4, 4, 6]}
            py={[4, 4, 0]}
          >
            <Heading
              pl={6}
              py={4}
              as="h3"
              size="md"
              fontWeight="medium"
              color={HeadingColor}
              textAlign={["center", "center", "left"]}
            >
              Anlaşma Yürürlük Durumu:{" "}
              {bilateralAgreementState === "Hayır" ? "Yürürlükte değil" : "Yürürlükte"}
            </Heading>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
