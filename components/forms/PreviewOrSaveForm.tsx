import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import DisplayText from '../form-components/DisplayText';
import useRead from '@/hooks/read/useRead';
import { OrganizationInfo } from '@/models/response/organizationInfoResponse';
import { useEffect, useState } from 'react';
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
type PreviewOrSaveFormProps = {
  pageName: String;
  bilateralAgreementID: number;
  organizationInfoId: number;

};

export default function PreviewOrSaveForm({
  pageName,
  organizationInfoId,
}: PreviewOrSaveFormProps) {
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const [organizationInfo, setOrganizationInfo] = useState<OrganizationInfo>();
  const [contactPerson, setContactPerson] = useState([] as string[] );
  useEffect(() => {
    handleGetOrganizationInfo();
    handleGetSelectedContactInfoOfOrganizationInfo();
  }, []);


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
    if(organizationInfoId != 0){
      fetchInitialData();
    }
    
  }
  async function handleGetSelectedContactInfoOfOrganizationInfo() {
    const fetchInitialData = async () => {
      console.log('organizationInfoId handleGetSelectedContactInfoOfOrganizationInfo : ', organizationInfoId);
      
      const data = await GetSelectedContactInfoOfOrganizationInfo(
        'https://localhost:5001/spGetSelectedContactInfoOfOrganizationInfo?organizationInfo_id=' +
        organizationInfoId
      ); // Call the GetSelectedContactInfoOfOrganizationInfo function
      if (data && data.length > 0) {
        console.log('data: ', data); // Process the fetched data
        // Assuming the fetched data is an array of contact persons
        const senderContactPersons = data.map((contactPerson: string) => contactPerson);
        setContactPerson(senderContactPersons);
      }

    };
    if(organizationInfoId != 0){
      fetchInitialData();
    }
 
  }
  


  return (
    <Stack
      marginBottom='20'
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
      <Flex gap={3} justifyContent={'center'} p={6}>
        <Button variant='condition' type='submit'>
          Anlaşmayı Taslak Olarak Kaydet
        </Button>
        <Button variant='autoWidthFull' type='reset'>
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
        <Flex>
          <Stack w='50%' spacing={4} p='5'>
            <DisplayText
              label={'Kurum / Üniversite Adı'}
              content={organizationInfo?.uniName ?? 'NOT FOUND'}
            ></DisplayText>
            <DisplayText
              label={'İkili Anlaşma Kodu (IIA-Kodu)'}
              content={organizationInfo?.IIACode ?? 'NOT FOUND'}
            ></DisplayText>
            <DisplayText
              label={'Anlaşmayı İmzalayacak Yetkili'}
              content={organizationInfo?.signingPersonFullName ?? 'NOT FOUND'}
            ></DisplayText>
            <DisplayText
              label={'İletişim Kurulabilecek Yetkililer'}
              content={contactPerson.join(', ')  ?? 'NOT FOUND'}
            ></DisplayText>
          </Stack>
          <Stack w='50%' spacing={4} p='5'>
            <DisplayText
              label={'Departman / Bölüm Adı'}
              content={organizationInfo?.ounitName ?? 'NOT FOUND'}
            ></DisplayText>
            <DisplayText
              label={'İkili Anlaşma IDsi (IIA-ID)'}
              content={organizationInfo?.IIAID ?? 'NOT FOUND'}
            ></DisplayText>
            <DisplayText 
            label='İmzalanma Tarihi' 
            content={ organizationInfo?.signingDate ?? 'NOT FOUND'} 
            />
            <Flex w={'full'} bg={'gray.100'}></Flex>
          </Stack>
        </Flex>
      </Box>
    </Stack>
  );
}
