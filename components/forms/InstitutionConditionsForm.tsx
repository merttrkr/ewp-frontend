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

import TextInput from '@/components/form-components/inputs/TextInput';
import CheckBoxInput from '@/components/form-components/inputs/CheckBoxInput';
import useRead from '@/hooks/read/useRead';
import { set, useForm } from 'react-hook-form';
import SelectInstitution from '../form-components/selectboxes/SelectInstitution';
import { Contact } from '@/models/response/contactResponse';
import { Department } from '@/models/response/departmentResponse';
import { InstitutionInfo } from '@/models/response/institutionInfoResponse';
import { use, useEffect, useState } from 'react';
import SelectDepartment from '../form-components/selectboxes/SelectDepartment';
import SelectContact from '../form-components/selectboxes/SelectContact';
import SelectAcademicYear from '../form-components/selectboxes/SelectAcademicYear';
import { AcademicYearInfo } from '@/models/response/academicYearResponse';
import SelectISCED from '../form-components/selectboxes/SelectISCED';
import { SubjectArea } from '@/models/response/subjectAreaResponse';
import SelectCollaborationCondition from '../form-components/selectboxes/SelectCollaborationCondition';
import { CollaborationConditionType } from '@/models/response/collaborationConditionTypeResponse';
import SelectEducationTypeAndLevel from '../form-components/selectboxes/SelectEducationTypeAndLevel';
import { EducationTypeAndLevel } from '@/models/response/educationTypeAndLevelResponse';
import SelectLanguage from '../form-components/selectboxes/SelectLanguage';
import { Language } from '@/models/response/languageResponse';
import { LanguageLevel } from '@/models/response/languageLevelResponse';
import SelectLanguageLevel from '../form-components/selectboxes/SelectLanguageLevel';
import useUpdate from '@/hooks/update/useUpdate';
import { CollaborationConditionRequest } from '@/models/request/collaborationConditionRequest';
import { useToast } from '@chakra-ui/react';
import { IdForBothCollaborationConditionResponse } from '@/models/response/idForBothCollaborationConditionResponse';
import { OrganizationInfo } from '@/models/response/organizationInfoResponse';
import { CollaborationConditionResponse } from '@/models/response/collaborationConditionResponse';
type InstitutionConditionsFormProps = {
  pageName: String;
  subText: String;
  collaborationConditionId: number;
  bilateralAgreementID: number;
  isPartnerValue: number;
  organizationInfoId: number;
  partnerOrganizationInfoId: number;
  partnerCollaborationConditionId: number;
  saveState: number;
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
  annual_mobility_amount: number;
  annual_total_month_amount: number;
  is_coeducational: number;
  education_type_and_level: string;
  language: string;
  language_level: string;
  isced_code_and_fields: string;
  other_info: string;
};

export default function InstitutionConditionsForm({
  pageName,
  subText,
  collaborationConditionId,
  bilateralAgreementID,
  isPartnerValue,
  organizationInfoId,
  partnerOrganizationInfoId,
  partnerCollaborationConditionId,
  saveState,
}: InstitutionConditionsFormProps) {
  //get hooks
  const {
    GetSelectedContactInfoOfOrganizationInfo,
    GetOrganizationInfo,
    GetOrganizationCollaborationCondition,
  } = useRead();

  const toast = useToast();
  const {
    InsertEmptyRowToCollaborationCondition,
    AddLanguageSkillForCollaborationCondition,
    UpdateDateOfBilateralAgreement,
    SaveCollaborationCondition,
    AddCollaborationConditionToBilateralAgreement,
  } = useUpdate();

  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const FormBackground = useColorModeValue('gray.50', 'gray.600');
  //states
  const [conditionType, setConditionType] = useState('');
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
  const [educationTypeAndLevelID, setEducationTypeAndLevelID] = useState(0);
  const [language, setLanguage] = useState('');
  const [languageID, setLanguageID] = useState(0);
  const [languageLevel, setLanguageLevel] = useState('');
  const [languageLevelID, setLanguageLevelID] = useState(0);
  const [ISCEDCodeAndFields, setISCEDCodeAndFields] = useState('');
  const [ISCEDCodeAndFieldsID, setISCEDCodeAndFieldsID] = useState(0);
  const [collaborationCondition, setCollaborationCondition] =
    useState<CollaborationConditionResponse[]>();
  const [partnerCollaborationCondition, setPartnerCollaborationCondition] =
    useState<CollaborationConditionResponse[]>();
  const [organizationInfo, setOrganizationInfo] = useState<OrganizationInfo>();
  const [partnerOrganizationInfo, setPartnerOrganizationInfo] =
    useState<OrganizationInfo>();
  const [annualTotalMonthAmount, setAnnualTotalMonthAmount] = useState('');
  const [annualMobilityAmount, setAnnualMobilityAmount] = useState('');
  const [otherInfo, setOtherInfo] = useState('');
  //useForm hook
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<FormData>();

  async function handleInsertEmptyRowToCollaborationCondition() {
    const insertEmptyRowToCollaborationCondition = async () => {
      const requestUrl =
        'https://localhost:5001/spInsertEmptyRowToCollaborationCondition?collaborationCondition_id=' +
        collaborationConditionId;

      try {
        const result = await InsertEmptyRowToCollaborationCondition(requestUrl);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if (collaborationConditionId != 0) {

      insertEmptyRowToCollaborationCondition();
    }
  }
  async function handleGetOrganizationCollaborationCondition() {
    const requestUrl =
      'https://localhost:5001/spGetOrganizationCollaborationCondition?organizationCollaborationCondition_id=' +
      collaborationConditionId;

    try {
      setCollaborationCondition(
        await GetOrganizationCollaborationCondition(requestUrl)
      );
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async function handleGetPartnerOrganizationCollaborationCondition() {
    const requestUrl =
      'https://localhost:5001/spGetOrganizationCollaborationCondition?organizationCollaborationCondition_id=' +
      partnerCollaborationConditionId;

    try {
      setPartnerCollaborationCondition(
        await GetOrganizationCollaborationCondition(requestUrl)
      );
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    if (
      collaborationConditionId ||
      organizationInfoId ||
      partnerOrganizationInfoId ||
      partnerCollaborationConditionId
    ) {
      handleGetOrganizationCollaborationCondition();
      handleGetOrganizationInfo();
      handleGetPartnerOrganizationInfo();
      handleGetPartnerOrganizationCollaborationCondition();
    }
  }, [
    saveState,
    collaborationConditionId,
    organizationInfoId,
    partnerOrganizationInfoId,
    partnerCollaborationConditionId,
  ]);

  useEffect(() => {
    if (collaborationCondition && organizationInfo && partnerOrganizationInfo) {

      setSenderInstitution(organizationInfo?.heiId);

      setReceiverInstitution(partnerOrganizationInfo?.heiId);
      setSenderDepartment(organizationInfo?.ounitName);
      setReceiverDepartment(partnerOrganizationInfo?.ounitName);
      setStartingAcademicYear(
        collaborationCondition[0]?.academicYear.split(' - ')[0]
      );
      setEndingAcademicYear(
        collaborationCondition[0]?.academicYear.split(' - ')[1]
      );
      setAnnualTotalMonthAmount(collaborationCondition[0]?.annualTotalMonths);
      setAnnualMobilityAmount(collaborationCondition[0]?.annualQuota);
      setOtherInfo(collaborationCondition[0]?.otherInfo);
      setEducationTypeAndLevel(
        collaborationCondition[0]?.educationTypeAndLevel
      );
      setISCEDCodeAndFields(collaborationCondition[0]?.subjectArea);
      handleGetSelectedContactInfoOfOrganizationInfo();
      handleGetSelectedPartnerContactInfoOfOrganizationInfo();
    }
  }, [
    organizationInfo,
    partnerOrganizationInfo,
    collaborationCondition,
    partnerCollaborationCondition,
  ]);

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
    if (organizationInfoId != 0) {
      fetchInitialData();
    }
  }

  async function handleAddLanguageSkillForCollaborationCondition() {
    const addLanguageSkillForCollaborationCondition = async () => {
      const requestUrl =
        'https://localhost:5001/spAddLanguageSkillForCollaborationCondition?collaborationCondition_id=' +
        collaborationConditionId +
        '&lang_id=' +
        languageID +
        '&langLevel_id=' +
        languageLevelID;
      try {
        await AddLanguageSkillForCollaborationCondition(requestUrl);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (collaborationConditionId && languageID != 0 && languageLevelID != 0) {
      addLanguageSkillForCollaborationCondition();
    }
  }
  async function handleUpdateDateOfBilateralAgreement() {
    const updateDateOfBilateralAgreement = async () => {
      const requestUrl =
        'https://localhost:5001/spUpdateLastUpdateDateOfBilateralAgremeent?bilateralAgreement_id=' +
        bilateralAgreementID;

      try {
        await UpdateDateOfBilateralAgreement(requestUrl);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if (bilateralAgreementID) {
      updateDateOfBilateralAgreement();
    }
  }

  async function handleSaveCollaborationCondition(
    annualQuota: number,
    otherInfo: string,
    annualTotalMonths: number
  ) {
    const saveCollaborationCondition = async () => {
      const request: CollaborationConditionRequest = {
        id: collaborationConditionId,
        bilateralAgreement_id: Number(bilateralAgreementID),
        isPartner: isPartnerValue,
        academicYearStart_id: startingAcademicYearID,
        academicYearEnd_id: endingAcademicYearID,
        annualQuota: Number(annualQuota),
        subjectArea_id: ISCEDCodeAndFieldsID,
        subjectAreaDescription: ISCEDCodeAndFields,
        otherInfo: otherInfo,
        annualTotalMonths: Number(annualTotalMonths),
        isCoEducational: isCoEducational,
        educationTypeAndLevel_id: educationTypeAndLevelID,
      };
      try {
        await SaveCollaborationCondition(request);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    saveCollaborationCondition();
  }

  async function handleAddCollaborationConditionToBilateralAgreement() {
    const requestUrl =
      'https://localhost:5001/spAddCollaborationConditionToBilateralAgreement?collaborationCondition_id=' +
      collaborationConditionId +
      '&bilateralAgreement_id=' +
      bilateralAgreementID +
      '&isPartner=' +
      isPartnerValue;
    try {
      await AddCollaborationConditionToBilateralAgreement(requestUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function handleGetSelectedContactInfoOfOrganizationInfo() {
    const fetchInitialData = async () => {
      const data = await GetSelectedContactInfoOfOrganizationInfo(
        'https://localhost:5001/spGetSelectedContactInfoOfOrganizationInfo?organizationInfo_id=' +
        organizationInfoId
      ); // Call the GetSelectedContactInfoOfOrganizationInfo function
      if (data) {
        setSenderContactPerson(data[0]);

      }
    };
    fetchInitialData();
  }
  async function handleGetSelectedPartnerContactInfoOfOrganizationInfo() {
    const fetchInitialData = async () => {
      const data = await GetSelectedContactInfoOfOrganizationInfo(
        'https://localhost:5001/spGetSelectedContactInfoOfOrganizationInfo?organizationInfo_id=' +
        partnerOrganizationInfoId
      ); // Call the GetSelectedContactInfoOfOrganizationInfo function
      if (data) {
        setReceiverContactPerson(data[0]);


      }
    };
    fetchInitialData();
  }

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
    if (organizationInfoId != undefined) {
      fetchInitialData();
    }
  }
  //submit
  function onSubmit(values: FormData) {
    return new Promise<void>(async (resolve, reject) => {
      try {

        await handleInsertEmptyRowToCollaborationCondition();
        await handleAddLanguageSkillForCollaborationCondition();
        await handleUpdateDateOfBilateralAgreement();
        await handleSaveCollaborationCondition(
          values.annual_mobility_amount,
          values.other_info,
          values.annual_total_month_amount
        );
        await handleAddCollaborationConditionToBilateralAgreement();
        toast({
          title: 'Kayıt Başarılı.',
          description: 'İş birliği koşulları başarıyla kaydedildi.',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
        resolve();
      } catch (error) {
        toast({
          title: 'Kayıt Başarısız.',
          description: `${error}`,
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });

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
      setConditionType(value.type);
    } else {
      setValue('condition_type', '');
      setConditionType(''); // or any default value you want
    }
  };
  const handleEducationTypeAndLevelChange = (
    value: EducationTypeAndLevel | null
  ) => {
    if (value) {
      setValue('education_type_and_level', value.educationTypeAndLevel);
      setEducationTypeAndLevel(value.educationTypeAndLevel);
      setEducationTypeAndLevelID(value.educationTypeAndLevel_id);
    } else {
      setValue('education_type_and_level', '');
      setEducationTypeAndLevel(''); // or any default value you want
    }
  };
  const handleLanguageChange = (value: Language | null) => {
    if (value) {
      setValue('language', value.definition);
      setLanguage(value.definition);
      setLanguageID(value.lang_id);
    } else {
      setValue('language', '');
      setLanguage(''); // or any default value you want
    }
  };
  const handleLanguageLevelChange = (value: LanguageLevel | null) => {
    if (value) {
      setValue('language_level', value.code);
      setLanguageLevel(value.code);
      setLanguageLevelID(value.langLevel_id);
    } else {
      setValue('language_level', '');
      setLanguageLevel(''); // or any default value you want
    }
  };

  return (
    <Stack
      marginBottom={['20', null, '0']}
      px={[3, 6]}
      py={[2, 3]}
      w={['100%', null, 'auto']}
      bg={HeaderBackground}
      marginLeft={0}
      borderBottom='1px'
      borderColor={BorderColor}
      borderRadius='xl'
    >
      <Box pl={[3, 6]} py={[2, 4]}>
        <Heading as='h3' size='md' fontWeight={'medium'} color={HeadingColor}>
          {pageName}
        </Heading>
        <Text>{subText}</Text>
      </Box>

      <Box
        as={'form'}
        mt={[6, 10]}
        boxShadow={'lg'}
        padding={[3, 5]}

        bg={FormBackground}
        borderRadius={'xl'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex p='5' w='100%'>
          <SelectCollaborationCondition
            id='condition_type'
            error={errors.condition_type?.message}
            register={register('condition_type')}
            placeholder='Öğrenim'
            selectLabel='Koşul seçiniz'

            onChange={handleConditionChange}
          ></SelectCollaborationCondition>
        </Flex>

        <Flex flexWrap={['wrap', null, 'nowrap']}>
          <Stack w={['100%', '50%']} spacing={4} p={[2, 5]}>
            <SelectInstitution
              apiURL='https://localhost:5001/spGetUniversityNamesForOrganization?uniShortName=all'
              id='sender_instution_name'
              register={register('sender_hei_id')}
              isDisabled
              placeHolder={senderInstitution}
              selectLabel='Gönderen Kurum / Üniversite Adı'
              onChange={handleSenderInstitutionChange}
              error={errors.sender_hei_id?.message}
            />
            <SelectDepartment
              id='sender_departmant'
              register={register('sender_department')}
              placeHolder={senderDepartment}
              selectLabel='Gönderen Kurum Departman / Bölüm Adı'
              isDisabled
              onChange={handleSenderDepartmentChange}
              param={senderInstitution}
              error={errors.sender_department?.message}
            />
            <SelectContact
              id='contact_persons'
              error={errors.sender_contact_person?.message}
              register={register('sender_contact_person')}
              placeholder={senderContactPerson}
              isDisabled
              selectLabel='Gönderen Kurumdaki İletişim Kurulabilecek Yetkililer'
              onChange={handleSenderContactChange}
              param={senderInstitution}
            />
            <SelectAcademicYear
              id='academicYearStart_id'
              error={errors.sender_contact_person?.message}
              register={register('starting_academic_year')}
              placeholder={startingAcademicYear}
              selectLabel='Hangi Akademik Yıllar Arasında Başlıyor ?'
              onChange={handleAcademicYearStartChange}
            />
            <TextInput
              placeholder={annualMobilityAmount}
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
              placeholder={ISCEDCodeAndFields}
              selectLabel='ISCED Kodu ve Konu Alanları'
              onChange={handleISCEDchange}
            ></SelectISCED>
            <SelectEducationTypeAndLevel
              id='education_type_and_level'
              register={register('education_type_and_level', {
                required: 'This is required',
              })}
              placeholder={educationTypeAndLevel}
              selectLabel='Öğrenim Seviyesi'
              onChange={handleEducationTypeAndLevelChange}
              error={errors.education_type_and_level?.message}
            ></SelectEducationTypeAndLevel>
          </Stack>
          <Stack w={['100%', '50%']} spacing={4} p={[2, 5]}>
            <SelectInstitution
              apiURL='https://localhost:5001/spGetUniversityNamesForOrganization?uniShortName=all'
              id='receiver_instution_name'
              register={register('receiver_hei_id')}
              placeHolder={receiverInstitution}
              isDisabled
              selectLabel='Alıcı Kurum / Üniversite Adı'
              onChange={handleReceiverInstitutionChange}
              error={errors.receiver_hei_id?.message}
            />

            <SelectDepartment
              id='receiver_department'
              register={register('receiver_department')}
              placeHolder={receiverDepartment}
              selectLabel='Alıcı Kurum Departman / Bölüm Adı'
              isDisabled
              onChange={handleReceiverDepartmentChange}
              param={receiverInstitution}
              error={errors.receiver_department?.message}
            />
            <SelectContact
              id='contact_persons'
              isDisabled
              error={errors.receiver_contact_person?.message}
              register={register('receiver_contact_person')}
              placeholder={receiverContactPerson}
              selectLabel='Alıcı Kurumdaki İletişim Kurulabilecek Yetkililer'
              onChange={handleReceiverContactChange}
              param={receiverInstitution}
            />

            <SelectAcademicYear
              id='contact_persons'
              error={errors.ending_academic_year?.message}
              register={register('ending_academic_year')}
              placeholder={endingAcademicYear}
              selectLabel='Hangi Akademik Yıllar Arasında Bitiyor ?'
              onChange={handleAcademicYearEndChange}
            />
            <TextInput
              placeholder={annualTotalMonthAmount}
              id='annual_total_month_amount'
              label='Yıl Bazında Toplam Ay Sayısı'
              error={errors.annual_total_month_amount?.message}
              register={register('annual_total_month_amount')}
            />
            <CheckBoxInput
              id='is_coeducational'
              placeholder='Karma'
              checkBoxInputLabel='Karma Eğitim Olacaksa Aşağıdaki Kutucuğu İşaretleyiniz'
              error={errors.is_coeducational?.message}
              register={register('is_coeducational')}
            />
            <HStack spacing={4}>
              <SelectLanguage
                id='language'
                error={errors.language?.message}
                register={register('language', {
                  required: 'This is required',
                })}
                placeholder='İNGİLİZCE'
                selectLabel='Yabancı Dil'
                onChange={handleLanguageChange}
              ></SelectLanguage>

              <Box w={'50%'}>
                <SelectLanguageLevel
                  id='language_level'
                  error={errors.language_level?.message}
                  register={register('language_level', {
                    required: 'This is required',
                  })}
                  placeholder='B1'
                  selectLabel='Seviyesi'
                  onChange={handleLanguageLevelChange}
                ></SelectLanguageLevel>
              </Box>
            </HStack>
          </Stack>
        </Flex>
        <Box pl={5}>
          <TextInput
            placeholder={otherInfo}
            id='other_info'
            label='Diğer belirtmek istediğiniz bilgiler..'
            error={errors.other_info?.message}
            register={register('other_info')}
          />
        </Box>
        <Flex direction={['column', 'row']} gap={2} justifyContent={['center', null, 'right']} alignItems={['flex-start', 'center']} pr={[2, 4]} mt={[6, 8]}>
          <Button whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" variant='condition'>
            Aynı Koşulları Partnerime De Ekle
          </Button>
          <Button variant='submit' type='submit'>
            Kaydet
          </Button>
          <Button variant='clear' type='reset' ml={[0, 2]}>
            Temizle
          </Button>
        </Flex>
      </Box>
    </Stack>
  );
}
