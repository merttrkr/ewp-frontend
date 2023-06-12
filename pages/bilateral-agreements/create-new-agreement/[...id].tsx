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
import { useEffect, useState } from 'react';
import InstitutionConditionsForm from '@/components/forms/InstitutionConditionsForm';
import InstitutionInformationFormIIA from '@/components/forms/InstitutionInformationFormIIA';
import PreviewOrSaveForm from '@/components/forms/PreviewOrSaveForm';
import useRead from '@/hooks/read/useRead';
import { IdForBothCollaborationConditionResponse } from '@/models/response/idForBothCollaborationConditionResponse';
import { useRouter } from 'next/router';

export default function TabComponent() {
  const router = useRouter();
  const { id } = router.query;

  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const [newCollaborationConditionId, setNewCollaborationConditionId] =
    useState(0);
  const [
    newPartnerCollaborationConditionId,
    setNewPartnerCollaborationConditionId,
  ] = useState(0);
  const [newOrganizationInfoId, setNewOrganizationInfoId] = useState(0);
  const [newPartnerOrganizationInfoId, setNewPartnerOrganizationInfoId] =
    useState(0);
  const [bilateralAgreementID, setBilateralAgreementID] = useState(0);
  const [bilateralAgreementState, setbilateralAgreementState] = useState('');
  const [saveState, setSaveState] = useState(0);

  const { CheckIfBilateralAgreementIsInEffect } = useRead();

  async function handleCheckIfBilateralAgreementIsInEffect() {
    const fetchBilateralAgreementIsInEffect = async () => {
      const data = await CheckIfBilateralAgreementIsInEffect(
        'https://localhost:5001/spCheckIfBilateralAgreementIsInEffect?bilateralAgreement_id=' +
          bilateralAgreementID
      );
      if (data) {
        setbilateralAgreementState(data);
      }
    };
    fetchBilateralAgreementIsInEffect();
  }
  useEffect(() => {
    let ids = id?.toString().split(',');
    console.log('ids', ids);

    if (ids !== undefined) {
      setNewOrganizationInfoId(Number(ids[0]));

      setNewPartnerOrganizationInfoId(Number(ids[1]));

      setNewCollaborationConditionId(Number(ids[2]));
      setNewPartnerCollaborationConditionId(Number(ids[3]));
      setBilateralAgreementID(Number(ids[4]));
    }
  }, [id]);

  useEffect(() => {
    handleCheckIfBilateralAgreementIsInEffect();
  }, [bilateralAgreementID]);

  const handleSaveStateUpdate = () => {
    setSaveState((prevState) => prevState + 1);
    console.log('--------x----------', saveState);
  };

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
            onSave={handleSaveStateUpdate}
            saveState={saveState}
            pageName='Kurum Bilgilerim'
            subText={'Lütfen kurumunuzun bilgilerini doldurunuz.'}
            organizationInfoId={newOrganizationInfoId}
            isPartnerValue={0}
            bilateralAgreementID={bilateralAgreementID}
          />
          <InstitutionInformationFormIIA
            onSave={handleSaveStateUpdate}
            saveState={saveState}
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
            collaborationConditionId={newCollaborationConditionId}
            bilateralAgreementID={bilateralAgreementID}
            organizationInfoId={newOrganizationInfoId}
            partnerOrganizationInfoId={newPartnerOrganizationInfoId}
            partnerCollaborationConditionId={newPartnerCollaborationConditionId}
            isPartnerValue={0}
          />
          <InstitutionConditionsForm
            pageName='Partner Kuruma Ait Koşullar'
            subText={'Lütfen partner kuruma ait koşulları doldurunuz.'}
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
            saveState={saveState}
            organizationInfoId={newOrganizationInfoId}
            bilateralAgreementID={bilateralAgreementID}
            pageName='Kurumuma Ait Bilgiler'
          />
          <PreviewOrSaveForm
            saveState={saveState}
            organizationInfoId={newPartnerOrganizationInfoId}
            bilateralAgreementID={bilateralAgreementID}
            pageName='Partner Kuruma Ait Bilgiler'
          />
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
              Anlaşma Yürürlük Durumu:{' '}
              {bilateralAgreementState === 'Hayır'
                ? 'Yürürlükte değil'
                : 'Yürürlükte'}
            </Heading>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
