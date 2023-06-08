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
import { Department } from '@/models/response/departmentResponse';
import { InstitutionInfo } from '@/models/response/institutionInfoResponse';
import { useState } from 'react';
import SelectDepartment from '../form-components/selectboxes/SelectDepartment';
import SelectContact from '../form-components/selectboxes/SelectContact';
import SelectAcademicYear from '../form-components/selectboxes/SelectAcademicYear';
import { AcademicYearInfo } from '@/models/response/academicYearResponse';
import SelectISCED from '../form-components/selectboxes/SelectISCED';
import { SubjectArea } from '@/models/response/subjectAreaResponse';
import SelectCollaborationCondition from '../form-components/selectboxes/SelectCollaborationCondition';
import { CollaborationConditionType } from '@/models/response/collaborationConditionTypeResponse';

type InstitutionConditionsFormProps = {
  pageName: String;
  subText: String;
};

type FormData = {
  condition_type: string;
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
  isced_code_and_fields: string;
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
  const [senderContactPersonID, setSenderContactPersonID] = useState(0);
  const [receiverContactPersonID, setReceiverContactPersonID] = useState(0);
  const [startingAcademicYear, setStartingAcademicYear] = useState('');
  const [endingAcademicYear, setEndingAcademicYear] = useState('');
  const [startingAcademicYearID, setStartingAcademicYearID] = useState(0);
  const [endingAcademicYearID, setEndingAcademicYearID] = useState(0);
  const [isCoEducational, setIsCoEducational] = useState(0);
  const [educationTypeAndLevel, setEducationTypeAndLevel] = useState('');
  const [language, setLanguage] = useState('');
  const [languageLevel, setLanguageLevel] = useState('');
  const [ISCEDCodeAndFields, setISCEDCodeAndFields] = useState('');
  const [ISCEDCodeAndFieldsID, setISCEDCodeAndFieldsID] = useState(0);

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
  //submit
  function onSubmit(values: FormData) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        alert(JSON.stringify(values, null));
        console.log('values: ', values);
        resolve();
      } catch (error) {
        alert('Error');
        console.log(error);
        reject(error);
      }
    });
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

  const handleReceiverInstitutionChange = (value: InstitutionInfo | null) => {
    if (value) {
      setValue('receiver_hei_id', value.heiId);
      setReceiverInstitution(value.heiId);
      setReceiverInstitutionID(value.uniqueId);
    } else {
      setValue('receiver_hei_id', '');
      setReceiverInstitution('');
    }
  };

  const handleSenderDepartmentChange = (value: Department | null) => {
    if (value) {
      setValue('sender_department', value.organizationalUnitName);
      setSenderDepartment(value.organizationalUnitName);
      setSenderDepartmentID(value.id);
    } else {
      setValue('sender_department', ''); // or any default value you want
      setSenderDepartment(''); // or any default value you want
    }
  };
  const handleReceiverDepartmentChange = (value: Department | null) => {
    if (value) {
      setValue('receiver_department', value.organizationalUnitName);
      setReceiverDepartment(value.organizationalUnitName);
      setReceiverDepartmentID(value.id);
    } else {
      setValue('receiver_department', ''); // or any default value you want
      setReceiverDepartment(''); // or any default value you want
    }
  };

  const handleSenderContactChange = (value: Contact | null) => {
    if (value) {
      setValue('sender_contact_person', value.fullName);
      setSenderContactPerson(value.fullName);
      setSenderContactPersonID(value.id);
    } else {
      setValue('sender_contact_person', ''); // or any default value you want
      setSenderContactPerson(''); // or any default value you want
    }
  };

  const handleReceiverContactChange = (value: Contact | null) => {
    if (value) {
      setValue('receiver_contact_person', value.fullName);
      setReceiverContactPerson(value.fullName);
      setReceiverContactPersonID(value.id);
    } else {
      setValue('receiver_contact_person', ''); // or any default value you want
      setReceiverContactPerson(''); // or any default value you want
    }
  };

  const handleAcademicYearStartChange = (value: AcademicYearInfo | null) => {
    if (value) {
      setValue('starting_academic_year', value.academicYear);
      setStartingAcademicYear(value.academicYear);
      setStartingAcademicYearID(value.academicYear_id);
    } else {
      setValue('starting_academic_year', '');
      setStartingAcademicYear(''); // or any default value you want
    }
  };

  const handleAcademicYearEndChange = (value: AcademicYearInfo | null) => {
    if (value) {
      setValue('ending_academic_year', value.academicYear);
      setEndingAcademicYear(value.academicYear);
      setEndingAcademicYearID(value.academicYear_id);
    } else {
      setValue('ending_academic_year', '');
      setEndingAcademicYear(''); // or any default value you want
    }
  };

  const handleISCEDchange = (value: SubjectArea | null) => {
    if (value) {
      setValue('isced_code_and_fields', value.subjectArea);
      setISCEDCodeAndFields(value.subjectArea);
      setISCEDCodeAndFieldsID(value.subjectAreaId);
    } else {
      setValue('isced_code_and_fields', '');
      setISCEDCodeAndFields(''); // or any default value you want
    }
  };
  const handleConditionChange = (value: CollaborationConditionType | null) => {
    if (value) {
      setValue('condition_type', value.type);
      setISCEDCodeAndFields(value.type);
      setISCEDCodeAndFieldsID(value.id);
    } else {
      setValue('condition_type', '');
      setISCEDCodeAndFields(''); // or any default value you want
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex p='5' w='100%'>
          <SelectCollaborationCondition
            id='condition_type'
            error={errors.condition_type?.message}
            register={register('condition_type', {
              required: 'This is required',
            })}
            placeholder='placeholder...'
            selectLabel='Koşul seçiniz'
            onChange={handleConditionChange}
          ></SelectCollaborationCondition>
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
            <SelectDepartment
              id='sender_departmant'
              register={register('sender_department', {
                required: 'This is required',
              })}
              placeHolder='placeholder...'
              selectLabel='Gönderen Kurum Departman / Bölüm Adı'
              onChange={handleSenderDepartmentChange}
              param={senderInstitution}
              error={errors.sender_department?.message}
            />
            <SelectContact
              id='contact_persons'
              error={errors.sender_contact_person?.message}
              register={register('sender_contact_person', {
                required: 'This is required',
              })}
              placeholder='placeholder...'
              selectLabel='Gönderen Kurumdaki İletişim Kurulabilecek Yetkililer'
              onChange={handleSenderContactChange}
              param={senderInstitution}
            />
            <SelectAcademicYear
              id='contact_persons'
              error={errors.sender_contact_person?.message}
              register={register('sender_contact_person', {
                required: 'This is required',
              })}
              placeholder='placeholder...'
              selectLabel='Hangi Akademik Yıllar Arasında Başlıyor ?'
              onChange={handleAcademicYearStartChange}
            />
            <TextInput
              placeholder='0'
              id='annual_mobility_amount'
              label='Yıl Bazında Mobilite Sayısı'
              error={errors.annual_mobility_amount?.message}
              register={register('annual_mobility_amount')}
            />
            <SelectISCED
              id='isced_code_and_fields'
              error={errors.isced_code_and_fields?.message}
              register={register('isced_code_and_fields', {
                required: 'This is required',
              })}
              placeholder='placeholder...'
              selectLabel='ISCED Kodu ve Konu Alanları'
              onChange={handleISCEDchange}
            ></SelectISCED>

            <TextInput
              placeholder='Açıklama'
              id='other_info'
              label='Diğer belirtmek istediğiniz bilgiler..'
              error={errors.other_info?.message}
              register={register('other_info')}
            />
          </Stack>
          <Stack w='50%' spacing={4} p='5'>
            <SelectInstitution
              apiURL='https://localhost:5001/spGetUniversityNamesForOrganization?uniShortName=all'
              id='receiver_instution_name'
              register={register('receiver_hei_id', {
                required: 'This is required',
              })}
              placeHolder='placeholder..'
              selectLabel='Alıcı Kurum / Üniversite Adı'
              onChange={handleReceiverInstitutionChange}
              error={errors.receiver_hei_id?.message}
            />

            <SelectDepartment
              id='receiver_department'
              register={register('receiver_department', {
                required: 'This is required',
              })}
              placeHolder='placeholder...'
              selectLabel='Alıcı Kurum Departman / Bölüm Adı'
              onChange={handleReceiverDepartmentChange}
              param={receiverInstitution}
              error={errors.receiver_department?.message}
            />
            <SelectContact
              id='contact_persons'
              error={errors.receiver_contact_person?.message}
              register={register('receiver_contact_person', {
                required: 'This is required',
              })}
              placeholder='placeholder...'
              selectLabel='Alıcı Kurumdaki İletişim Kurulabilecek Yetkililer'
              onChange={handleReceiverContactChange}
              param={receiverInstitution}
            />

            <SelectAcademicYear
              id='contact_persons'
              error={errors.ending_academic_year?.message}
              register={register('ending_academic_year', {
                required: 'This is required',
              })}
              placeholder='placeholder...'
              selectLabel='Hangi Akademik Yıllar Arasında Bitiyor ?'
              onChange={handleAcademicYearEndChange}
            />
            <TextInput
              placeholder='0'
              id='annual_total_month_amount'
              label='Yıl Bazında Toplam Ay Sayısı'
              error={errors.annual_total_month_amount?.message}
              register={register('annual_total_month_amount')}
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
          <Button variant='submit' type='submit'>
            Kaydet
          </Button>
          <Button variant='condition'>Aynı Koşulları Partnerime De Ekle</Button>
          <Button variant='clear' type='reset'>
            Clear
          </Button>
        </Flex>
      </Box>
    </Stack>
  );
}
