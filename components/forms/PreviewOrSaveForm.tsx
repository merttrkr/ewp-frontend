import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Toast,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import DisplayText from '../form-components/DisplayText';
import useRead from '@/hooks/read/useRead';
import { OrganizationInfo } from '@/models/response/organizationInfoResponse';
import { useEffect, useState } from 'react';
import useUpdate from '@/hooks/update/useUpdate';

type PreviewOrSaveFormProps = {
  pageName: String;
  bilateralAgreementID: number;
  organizationInfoId: number;
  saveState: number;
  newPartnerCollaborationConditionId: number;
  newCollaborationConditionId: number;
  partnerOrganizationInfoId: number;
};

export default function PreviewOrSaveForm({
  pageName,
  organizationInfoId,
  saveState,
  bilateralAgreementID,
  newPartnerCollaborationConditionId,
  newCollaborationConditionId,
  partnerOrganizationInfoId,
}: PreviewOrSaveFormProps) {
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const [organizationInfo, setOrganizationInfo] = useState<OrganizationInfo>();
  const [partnerOrganizationInfo, setPartnerOrganizationInfo] =
    useState<OrganizationInfo>();
  const [contactPerson, setContactPerson] = useState([] as string[]);
  const toast = useToast();

  const {
    InsertEmptyRowToOrganizationInfo,
    InsertEmptyRowToBilateralAgreement,
    SetSigningPerson,
    AddOrganizationContactInfo,
    SetUniversityIdOfOrganizationInfo,
    UpdateDateOfBilateralAgreement,
    SaveOrganizationInfo,
    AddOrganizationInfoToBilateralAgreement,
    SetCreatorOfBilateralAgreement,
    UpdateStateOfBilateralAgreement,
    sendIIANotification,
  } = useUpdate();

  const {
    GetCollaborationConditionTypes,
    GetLanguages,
    GetLanguageLevels,
    GetSubjectAreas,
    GetEducationTypesAndLevels,
    GetAcademicYearInfo,
    GetSelectedContactInfoOfOrganizationInfo,
    GetOrganizationInfo,
  } = useRead();

  async function handleGetOrganizationInfo() {
    const fetchInitialData = async () => {
      const data = await GetOrganizationInfo(
        'https://localhost:5001/spGetOrganizationInfo2?organizationInfo_id=' +
          organizationInfoId
      ); // Call the GetOrganizationInfo function
      if (data) {
        setOrganizationInfo(data);
      }
    };
    if (organizationInfoId !== 0) {
      fetchInitialData();
    }
  }
  async function handleGetPartnerOrganizationInfo() {
    const fetchInitialData = async () => {
      const data = await GetOrganizationInfo(
        'https://localhost:5001/spGetOrganizationInfo2?organizationInfo_id=' +
          partnerOrganizationInfoId
      ); // Call the GetOrganizationInfo function
      if (data) {
        setPartnerOrganizationInfo(data);
      }
    };
    if (organizationInfoId !== 0) {
      fetchInitialData();
    }
  }

  async function handleGetSelectedContactInfoOfOrganizationInfo() {
    const fetchInitialData = async () => {
      const data = await GetSelectedContactInfoOfOrganizationInfo(
        'https://localhost:5001/spGetSelectedContactInfoOfOrganizationInfo?organizationInfo_id=' +
          organizationInfoId
      ); // Call the GetSelectedContactInfoOfOrganizationInfo function
      if (data && data.length > 0) {
        // Assuming the fetched data is an array of contact persons
        const senderContactPersons = data.map(
          (contactPerson: string) => contactPerson
        );
        setContactPerson(senderContactPersons);
      }
    };
    if (organizationInfoId !== 0) {
      fetchInitialData();
    }
  }
  async function handleIIANotification() {
    const notificationRequest = {
      notifier_hei_id: organizationInfo?.heiId ?? '',
      iia_id: organizationInfo?.IIAID ?? '',
      partner_hei_id: partnerOrganizationInfo?.heiId ?? '',
    };

    try {
      const result = await sendIIANotification(notificationRequest);
      console.log(result); // You can handle the result as needed
    } catch (error) {
      toast({
        title: 'Bildirim Gönderilemedi.',
        description: 'Bildirim Gönderilemedi.',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      console.error(error); // Handle the error if necessary
    }
  }

  async function handleUpdateDateOfBilateralAgreement() {
    const updateDateOfBilateralAgreement = async () => {
      await UpdateDateOfBilateralAgreement(
        'https://localhost:5001/spUpdateLastUpdateDateOfBilateralAgremeent?bilateralAgreement_id=' +
          bilateralAgreementID
      );
    };
    updateDateOfBilateralAgreement();
  }

  async function handleUpdateStateOfBilateralAgreement(state: string) {
    const updateDateOfBilateralAgreement = async () => {
      await UpdateDateOfBilateralAgreement(
        'https://localhost:5001/spUpdateStateOfBilateralAgreement?bilateralAgreement_id=21&new_state=' +
          state +
          bilateralAgreementID
      );
    };
    updateDateOfBilateralAgreement();
  }
  useEffect(() => {
    handleGetOrganizationInfo();
    handleGetSelectedContactInfoOfOrganizationInfo();
    handleGetPartnerOrganizationInfo();
  }, [saveState, organizationInfoId, partnerOrganizationInfoId]);

  function handleSaveAsDraft() {
    handleUpdateStateOfBilateralAgreement('Taslak');
    handleUpdateDateOfBilateralAgreement();
    toast({
      title: 'Kayıt Başarılı.',
      description: 'Anlaşma Taslak olarak kaydedildi.',
      status: 'success',
      position: 'top-right',
      duration: 5000,
      isClosable: true,
    });
  }

  function handlesendNotification() {
    handleUpdateStateOfBilateralAgreement('Teklif');
    handleUpdateDateOfBilateralAgreement();
    toast({
      title: 'Bildirim Gönderildi.',
      description: 'Anlaşma Teklif Bildirimi Gönderildi.',
      status: 'success',
      position: 'top-right',
      duration: 5000,
      isClosable: true,
    });
  }
  return (
    <Stack
      px={6}
      py={6}
      w='100%'
      bg={HeaderBackground}
      marginLeft={0}
      borderBottom='1px'
      borderColor={BorderColor}
      borderRadius={'xl'}
      align={'center'}
    >
      <Heading
        pl={6}
        py={4}
        as='h3'
        size='md'
        fontWeight={'medium'}
        color={HeadingColor}
      >
        {pageName}
      </Heading>
      <Flex
        gap={3}
        direction={['column', 'column', 'row']}
        justifyContent={['center', 'center', 'space-between']}
        p={6}
      >
        <Button
          onClick={handleSaveAsDraft}
          variant='condition'
          type='submit'
          mb={[4, 4, 0]}
        >
          Anlaşmayı Taslak Olarak Kaydet
        </Button>
        <Button
          onClick={handlesendNotification}
          variant='autoWidthFull'
          type='reset'
          mb={[4, 4, 0]}
        >
          Karşı Kuruma Anlaşma Bildirimi Gönder
        </Button>
        <Button variant='autoWidthFull' type='reset'>
          Anlaşmayı Onayla
        </Button>
      </Flex>
      <Box
        w={'full'}
        mt={10}
        boxShadow={'lg'}
        padding={5}
        bg={FormBackground}
        borderRadius={'xl'}
      >
        <Flex direction={['column', 'column', 'row']}>
          <Stack w={['100%', '100%', '50%']} spacing={4} p='5'>
            <DisplayText
              label={'Kurum / Üniversite Adı'}
              content={organizationInfo?.uniName ?? '-'}
            />
            <DisplayText
              label={'İkili Anlaşma Kodu (IIA-Kodu)'}
              content={organizationInfo?.IIACode ?? '-'}
            />
            <DisplayText
              label={'Anlaşmayı İmzalayacak Yetkili'}
              content={organizationInfo?.signingPersonFullName ?? '-'}
            />
            <DisplayText
              label={'İletişim Kurulabilecek Yetkililer'}
              content={contactPerson.join(', ') ?? '-'}
            />
          </Stack>
          <Stack w={['100%', '100%', '50%']} spacing={4} p='5'>
            <DisplayText
              label={'Departman / Bölüm Adı'}
              content={organizationInfo?.ounitName ?? '-'}
            />
            <DisplayText
              label={'İkili Anlaşma IDsi (IIA-ID)'}
              content={organizationInfo?.IIAID ?? '-'}
            />
            <DisplayText
              label='İmzalanma Tarihi'
              content={organizationInfo?.signingDate ?? '-'}
            />
            <Flex w={'full'} bg={'gray.100'}></Flex>
          </Stack>
        </Flex>
      </Box>
    </Stack>
  );
}
