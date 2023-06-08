import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import SelectAutoComplete from '@/components/form-components/SelectAutoComplete';
import TextInput from '@/components/form-components/inputs/TextInput';
import CheckBoxInput from '@/components/form-components/inputs/CheckBoxInput';
import useRead from '@/hooks/read/useRead';
import { useForm } from 'react-hook-form';
import SelectInstitution from '../form-components/selectboxes/SelectInstitution';
import { Contact } from '@/models/response/contactResponse';
import { OrganizationInfoFormRequest } from '@/models/request/organizationInfoFormRequest';
import { Department } from '@/models/response/departmentResponse';
import { InstitutionInfo } from '@/models/response/institutionInfoResponse';
import { OrganizationRequestToIIA } from '@/models/request/organizationRequestToIIA';
import { useState } from 'react';
type InstitutionConditionsFormProps = {
  pageName: String;
  subText: String;
};

type FormData = {
  sender_hei_id: string;
  receiver_hei_id: string;
  sender_department: string;
  receiver_department: string;
  sender_contact_person: string;
  receiver_contact_person: string;
  starting_academic_year: string;
  ending_academic_year: string;
  //annual_quota: number;
  annual_mobility_amount: number;
  annual_total_month_amount: number;
  isCoEducational: number;
  educationTypeAndLevel: string;
  language: string;
  language_level: string;
  ISCED_code_and_fields: string;
  other_info: string;
};

export default function InstitutionConditionsForm({
  pageName,
  subText,
}: InstitutionConditionsFormProps) {
  //get hooks
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

  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  //states
  const [senderInstitutionID, setSenderInstitutionID] = useState(0);
  const [senderInstitution, setSenderInstitution] = useState('');
  const [receiverInstitutionID, setReceiverInstitutionID] = useState(0);
  const [receiverInstitution, setReceiverInstitution] = useState('');
  const [senderDepartmentID, setSenderDepartmentID] = useState(0);
  const [senderDepartment, setSenderDepartment] = useState('');
  const [receiverDepartmentID, setReceiverDepartmentID] = useState(0);
  const [receiverDepartment, setReceiverDepartment] = useState('');
  const [senderContactPerson, setSenderContactPerson] = useState('');
  const [receiverContactPerson, setReceiverContactPerson] = useState('');
  const [startingAcademicYear, setStartingAcademicYear] = useState('');
  const [endingAcademicYear, setEndingAcademicYear] = useState('');
  const [annualMobilityAmount, setAnnualMobilityAmount] = useState(0);
  const [annualTotalMonthAmount, setAnnualTotalMonthAmount] = useState(0);
  const [isCoEducational, setIsCoEducational] = useState(0);
  const [educationTypeAndLevel, setEducationTypeAndLevel] = useState('');
  const [language, setLanguage] = useState('');
  const [languageLevel, setLanguageLevel] = useState('');
  const [ISCEDCodeAndFields, setISCEDCodeAndFields] = useState('');
  const [otherInfo, setOtherInfo] = useState('');
  //useForm hook
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<FormData>();

  async function handleGetCollaborationConditionTypes() {
    const fetchInitialData = async () => {
      const data = await GetCollaborationConditionTypes(
        'https:localhost:5001/spGetCollaborationConditionTypes'
      ); // Call the fetchData function
      if (data) {
        console.log('data: ', data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
  }
  async function handleGetLanguages() {
    const fetchInitialData = async () => {
      const data = await GetLanguages('https://localhost:5001/spGetLanguages'); // Call the GetLanguages function
      if (data) {
        console.log('data: ', data); // Process the fetched data
      }
    };
    fetchInitialData();
  }

  async function handleGetLanguageLevels() {
    const fetchInitialData = async () => {
      const data = await GetLanguageLevels(
        'https://localhost:5001/spGetLanguageLevels'
      ); // Call the GetLanguageLevels function
      if (data) {
        console.log('data: ', data); // Process the fetched data
      }
    };
    fetchInitialData();
  }

  async function handleGetSubjectAreas() {
    const fetchInitialData = async () => {
      const data = await GetSubjectAreas(
        'https://localhost:5001/spGetSubjectAreas'
      ); // Call the GetSubjectAreas function
      if (data) {
        console.log('data: ', data); // Process the fetched data
      }
    };
    fetchInitialData();
  }
  async function handleGetEducationTypesAndLevels() {
    const fetchInitialData = async () => {
      const data = await GetEducationTypesAndLevels(
        'https://localhost:5001/spGetEducationTypesAndLevels'
      ); // Call the GetEducationTypesAndLevels function
      if (data) {
        console.log('data: ', data); // Process the fetched data
      }
    };
    fetchInitialData();
  }

  async function handleGetAcademicYearInfo() {
    const fetchInitialData = async () => {
      const data = await GetAcademicYearInfo(
        'https://localhost:5001/spGetAcademicYearInfo'
      ); // Call the GetAcademicYearInfo function
      if (data) {
        console.log('data: ', data); // Process the fetched data
      }
    };
    fetchInitialData();
  }

  async function handleGetSelectedContactInfoOfOrganizationInfo() {
    const organizationInfo = 21;
    const fetchInitialData = async () => {
      const data = await GetSelectedContactInfoOfOrganizationInfo(
        'https://localhost:5001/spGetSelectedContactInfoOfOrganizationInfo?organizationInfo_id=' +
          organizationInfo
      ); // Call the GetSelectedContactInfoOfOrganizationInfo function
      if (data) {
        console.log('data: ', data); // Process the fetched data
      }
    };
    fetchInitialData();
  }

  async function handleGetOrganizationInfo() {
    const organizationInfo = 21;
    const fetchInitialData = async () => {
      const data = await GetOrganizationInfo(
        'https://localhost:5001/spGetOrganizationInfo2?organizationInfo_id=' +
          organizationInfo
      ); // Call the GetOrganizationInfo function
      if (data) {
        console.log('data: ', data); // Process the fetched data
      }
    };
    fetchInitialData();
  }

  //onChange functions
  const handleSenderInstitutionChange = (value: InstitutionInfo | null) => {
    if (value) {
      setValue('sender_hei_id', value.heiId);
      setSenderInstitution(value.heiId);
      setSenderInstitutionID(value.uniqueId);
    } else {
      setValue('sender_hei_id', '');
      setSenderInstitution('');
    }
  };
  const handleSenderDepartmentChange = (value: Department | null) => {
    if (value) {
      setValue('sender_department', value.organizationalUnitName);
      setDepartment(value.organizationalUnitName);
      setDepartmentID(value.id);
    } else {
      setValue('departmant_name', ''); // or any default value you want
      setDepartment(''); // or any default value you want
    }
  };

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
    >
      <Box pl={6} py={4}>
        <Heading as='h3' size='md' fontWeight={'medium'} color={HeadingColor}>
          {pageName}
        </Heading>
        <Text>{subText}</Text>
      </Box>

      <Box
        as={'form'}
        mt={10}
        boxShadow={'lg'}
        padding={5}
        bg={FormBackground}
        borderRadius={'xl'}
      >
        <Flex p='5'>
          <SelectAutoComplete
            placeHolder='placeholder..'
            selectLabel='Koşul Seçiniz'
          />
        </Flex>

        <Flex>
          <Stack w='50%' spacing={4} p='5'>
            <SelectInstitution
              apiURL='https://localhost:5001/spGetUniversityNamesForOrganization?uniShortName=all'
              id='sender_instution_name'
              register={register('sender_hei_id', {
                required: 'This is required',
              })}
              placeHolder='placeholder..'
              selectLabel='Gönderen Kurum / Üniversite Adı'
              onChange={handleSenderInstitutionChange}
              error={errors.sender_hei_id?.message}
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Alıcı Kurum / Üniversite'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Gönderen Kurumdaki İletişim Kurulabilecek Yetkililer'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Hangi Akademik Yıllar Arasında Başlıyor ?'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Yıl Bazında Hareketlilik (mobilite) Sayısı'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='ISCED Kodu ve Konu Alanları'
            />
            <TextInput
              placeHolder='placeholder..'
              name='0'
              label='Yıl Bazında Toplam Ay sayısı'
            />
          </Stack>
          <Stack w='50%' spacing={4} p='5'>
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Gönderen Kurumun İlgili Bölümü / Departmanı'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Alıcı Kurumun İlgili Bölümü / Departmanı'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Hangi Akademik Yıllar Arasında Bitiyor ?'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Gönderen Kurumun İlgili Bölümü / Departmanı'
            />
            <CheckBoxInput
              placeHolder='Karma'
              checkBoxInputLabel='Karma Eğitim Olacaksa Aşağıdaki Kutucuğu İşaretleyiniz'
            />
            <HStack spacing={4}>
              <SelectAutoComplete
                placeHolder='placeholder..'
                selectLabel='İstenilen Yabancı Dil'
              />
              <Box w={'50%'}>
                <SelectAutoComplete
                  placeHolder='placeholder..'
                  selectLabel='Seviyesi'
                />
              </Box>
            </HStack>
          </Stack>
        </Flex>
        <Flex p='5'>
          <SelectAutoComplete
            placeHolder='placeholder..'
            selectLabel='Öğrenim Seviyesini Seçiniz'
          />
        </Flex>

        <Flex gap={3} justifyContent={'right'} pr={4} mt={'8'}>
          <Button variant='submit'>Kaydet</Button>
          <Button variant='condition'>Aynı Koşulları Partnerime De Ekle</Button>
          <Button variant='clear'>Clear</Button>
        </Flex>
      </Box>
    </Stack>
  );
}
