import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import TextInput2 from '../form-components/inputs/TextInput2';
import DatePickerInput from '../form-components/inputs/DatePickerInput';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
//selectboxes
import SelectContact from '../form-components/selectboxes/SelectContact';
import SelectDepartment from '../form-components/selectboxes/SelectDepartment';
import SelectInstitution from '../form-components/selectboxes/SelectInstitution';
import useCreate from '@/hooks/create/useCreate';
import useUpdate from '@/hooks/update/useUpdate';
import { IdForBothResponse } from '@/models/response/idForBothResponse';
import { Contact } from '@/models/response/contactResponse';
import { OrganizationInfoFormRequest } from '@/models/request/organizationInfoFormRequest';
import { Department } from '@/models/response/departmentResponse';
import { InstitutionInfo } from '@/models/response/institutionInfoResponse';
import { OrganizationRequestToIIA } from '@/models/request/organizationRequestToIIA';

type InstitutionInformationFormProps = {
  pageName: string;
  subText: string;
};

type FormData = {
  hei_id: string;
  contact_persons: string;
  departmant_name: string;
  IIA_Code: string;
  IIA_ID: string;
  authorized_signotary: string;
  signing_date: string;
};

export default function InstitutionInformationForm({
  pageName,
  subText,
}: InstitutionInformationFormProps) {
  const {
    GenerateIIACode,
    GenerateIIAID,
    GenerateBilateralAgreementID,
    GenerateIdsForBothOrganizationAndPartnerOrganization,
    GenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition,
  } = useCreate();

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
  } = useUpdate();
  //colors
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  //use states
  //values of the form
  const [institution, setInstitution] = useState('');
  const [department, setDepartment] = useState('');
  const [authorizedSignotary, setAuthorizedSignotary] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [IIACode, setIIACode] = useState('');
  const [IIAID, setIIAID] = useState('');
  //values from generate functions
  const [authorizedSignotaryPersonID, setauthorizedSignotaryPersonID] =
    useState(0);
  const [contactPersonID, setContactPersonID] = useState(0);
  const [departmentID, setDepartmentID] = useState(0);
  const [institutionID, setInstitutionId] = useState(0);
  const [newOrganizationInfoId, setNewOrganizationInfoId] = useState(0);
  const [newPartnerOrganizationInfoId, setNewPartnerOrganizationInfoId] =
    useState(0);
  const [isPartnerValue, setIsPartnerValue] = useState(0);
  const [bilateralAgreementID, setBilateralAgreementID] = useState(0);
  //date picker input state
  const [startDate, setStartDate] = useState('');

  //useForm hook
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<FormData>();

  // fetch functions

  async function handleIIACode() {
    const fetchInitialData = async () => {
      const data = await GenerateIIACode(
        'https://localhost:5001/spGenerateIIACode'
      ); // Call the fetchData function
      if (data) {
        setIIACode(data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
  }
  async function handleIIAID() {
    const fetchInitialData = async () => {
      const data = await GenerateIIAID(
        'https://localhost:5001/spGenerateIIAId'
      ); // Call the fetchData function
      if (data) {
        setIIAID(data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
  }

  async function handleIDForBoth() {
    const fetchInitialData = async () => {
      const data: IdForBothResponse = (
        await GenerateIdsForBothOrganizationAndPartnerOrganization(
          'https://localhost:5001/spGenerateIdsForBothOrganizationAndPartnerOrganization'
        )
      )[0]; // Call the fetchData function

      setNewOrganizationInfoId(data.newOrganizationInfoId);
      setNewPartnerOrganizationInfoId(data.newPartnerOrganizationInfoId);
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
      setBilateralAgreementID(data);
     
    };
    fetchBilateralAgreementID();
  }

  async function handleInsertEmptyRowToBilateralAgreement(id: number) {
    const insertEmptyRowToBilateralAgreement = async () => {
      await InsertEmptyRowToBilateralAgreement(
        'https://localhost:5001/spInsertEmptyRowToBilateralAgreement?bilateralAgreement_id=' +
          id
      );
    };
    insertEmptyRowToBilateralAgreement();
  }

  async function handleInsertEmptyRowToOrganizationInfo(id: number) {
    const insertEmptyRowToOrganizationInfo = async () => {
      
      await InsertEmptyRowToOrganizationInfo(
        'https://localhost:5001/spInsertEmptyRowToOrganizationInfo?organizationInfo_id=' +
          id
      );
    };
    insertEmptyRowToOrganizationInfo();
  }

  async function handleSetSigningPerson() {
    const setSigningPerson = async () => {
      await SetSigningPerson(
        'https://localhost:5001/spSetSigningPerson?organizationInfo_id=' +
          newOrganizationInfoId +
          '&signingPerson_id=' +
          authorizedSignotaryPersonID
      );
    };
    setSigningPerson();
  }

  async function handleAddOrganizationContactInfo() {
    const setAddOrganizationContactInfo = async () => {
      await AddOrganizationContactInfo(
        'https://localhost:5001/spAddOrganizationContactInfo?organizationInfo_id=' +
          newOrganizationInfoId +
          '&contact_id=' +
          contactPersonID
      );
    };
    setAddOrganizationContactInfo();
  }

  async function handleSetUniversityIdOfOrganizationInfo() {
    const setUniversityIdOfOrganizationInfo = async () => {
      await SetUniversityIdOfOrganizationInfo(
        'https://localhost:5001/spSetUniversityIdOfOrganizationInfo?hei_id=' +
          institution +
          '&organizationInfo_id=' +
          newOrganizationInfoId
      );
    };
    setUniversityIdOfOrganizationInfo();
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

  async function handleSaveOrganizationInfo() {
    const saveOrganizationInfoData = async () => {
      const request: OrganizationInfoFormRequest = {
        id: newOrganizationInfoId,
        university_id: institutionID,
        universityDepartment_id: departmentID,
        signingDate: startDate,
        isPartner: isPartnerValue,
        IIACode: IIACode,
        IIAId: IIAID,
        bilateralAgreement_id: bilateralAgreementID,
      };

      await SaveOrganizationInfo(request);
    };
    saveOrganizationInfoData();
  }

  async function handleAddOrganizationInfoToBilateralAgreement() {
    const addOrganizationInfoToBilateralAgreementData = async () => {
      const request: OrganizationRequestToIIA = {
        organizationInfoId: newOrganizationInfoId,
        isPartner: isPartnerValue == 0 ? 'false' : 'true',
        bilateralAgreementId: bilateralAgreementID,
      };

      await AddOrganizationInfoToBilateralAgreement(request);
    };
    addOrganizationInfoToBilateralAgreementData();
  }
  async function handleSetCreatorOfBilateralAgreement() {
    const setCreatorOfBilateralAgreement = async () => {
      await SetCreatorOfBilateralAgreement(
        'https://localhost:5001/spSetCreatorOfBilateralAgreement?bilateralAgreement_id=' +
          bilateralAgreementID
      );
    };
    setCreatorOfBilateralAgreement();
  }

  //submit function
  function onSubmit(values: FormData) {
    values.signing_date = startDate;
    values.IIA_ID = IIAID;
    values.IIA_Code = IIACode;
    
    return new Promise<void>(async (resolve, reject) => {
      try {
  
        await handleIDForBoth();
        console.log('new org id: ', newOrganizationInfoId);
        
        await handleIDForBothCollaborationCondition();
        console.log('new partner org id: ', newPartnerOrganizationInfoId);
        
        await handleGenerateBilateralAgreementID();
  
        await handleInsertEmptyRowToBilateralAgreement(bilateralAgreementID);
        await handleInsertEmptyRowToOrganizationInfo(newOrganizationInfoId);
        await handleInsertEmptyRowToOrganizationInfo(newPartnerOrganizationInfoId);
  
        await handleSetUniversityIdOfOrganizationInfo();
        await handleSetSigningPerson();
  
        await handleAddOrganizationContactInfo();
        await handleUpdateDateOfBilateralAgreement();
        await handleSaveOrganizationInfo();
        await handleAddOrganizationInfoToBilateralAgreement();
        await handleSetCreatorOfBilateralAgreement();
  
        resolve();
      } catch (error) {
        alert('Error');
        console.log(error);
        reject(error);
      }
    });
  }
  

  //onChange functions
  const handleSelectChangeInstitution = (value: InstitutionInfo | null) => {
    if (value) {
      setValue('hei_id', value.heiId);
      setInstitution(value.heiId);
      setInstitutionId(value.uniqueId);
    } else {
      setValue('hei_id', '');
      setInstitution('');
    }
  };

  const handleSelectChangeContact = (value: Contact | null) => {
    if (value) {
      setValue('contact_persons', value.fullName);
      setContactPerson(value.fullName);
      setContactPersonID(value.id);
    } else {
      setValue('contact_persons', ''); // or any default value you want
      setContactPerson(''); // or any default value you want
    }
  };
  const handleAuthorizedSignerSelectChangeContact = (value: Contact | null) => {
    if (value) {
      setValue('authorized_signotary', value.fullName);
      setAuthorizedSignotary(value.fullName);
      setauthorizedSignotaryPersonID(value.id);
    } else {
      setValue('authorized_signotary', ''); // or any default value you want
      setAuthorizedSignotary(''); // or any default value you want
    }
  };
  const handleSelectChangeDepartment = (value: Department | null) => {
    if (value) {
      setValue('departmant_name', value.organizationalUnitName);
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
      py={3}
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
        onSubmit={handleSubmit(onSubmit)}
        as='form'
        mt={10}
        boxShadow={'lg'}
        padding={5}
        bg={FormBackground}
        borderRadius={'xl'}
      >
        <Flex>
          <Stack w='50%' spacing={4} p='5'>
            <SelectInstitution
              apiURL='https://localhost:5001/spGetUniversityNamesForOrganization?uniShortName=all'
              id='instution_name'
              register={register('hei_id', {
                required: 'This is required',
              })}
              placeHolder='placeholder..'
              selectLabel='Kurum / Üniversite Adı'
              onChange={handleSelectChangeInstitution}
              error={errors.hei_id?.message}
            />
            <TextInput2
              isDisabled
              placeholder={IIACode}
              id='IIA_Code'
              label='İkili Anlaşma Kodu'
              error={errors.IIA_Code?.message}
              register={register('IIA_Code')}
            />
            <SelectContact
              id='contact_persons'
              error={errors.contact_persons?.message}
              register={register('contact_persons', {
                required: 'This is required',
              })}
              placeholder='placeholder...'
              selectLabel='İletişim Kurulabilecek Yetkililer'
              onChange={handleSelectChangeContact}
              param={institution}
            />
            <SelectContact
              placeholder='placeholder...'
              id='authorized_signotary'
              selectLabel='Anlaşmayı İmzalayacak Yetkili'
              error={errors.authorized_signotary?.message}
              register={register('authorized_signotary', {
                required: 'This is required',
              })}
              onChange={handleAuthorizedSignerSelectChangeContact}
              param={institution}
            />
          </Stack>
          <Stack w='50%' spacing={4} p='5'>
            <SelectDepartment
              id='departmant_name'
              register={register('departmant_name', {
                required: 'This is required',
              })}
              placeHolder='placeholder...'
              selectLabel='Departman / Bölüm Adı'
              onChange={handleSelectChangeDepartment}
              param={institution}
              error={errors.departmant_name?.message}
            />
            <TextInput2
              isDisabled
              placeholder={IIAID}
              id='IIA_ID'
              label='İkili Anlaşma IDsi (IIA-ID)'
              error={errors.IIA_ID?.message}
              register={register('IIA_ID')}
            />
            <DatePickerInput
              datePickerInputLabel='İmzalanma Tarihi'
              startDate={startDate}
              setStartDate={setStartDate}
            />

            <Flex w={'full'} bg={'gray.100'}></Flex>
          </Stack>
        </Flex>
        <Flex gap={3} justifyContent='flex-end' pr={4} mt={8}>
          <Button variant='autoWidthFull' width={130} onClick={handleIIACode}>
            IIA Code Oluştur
          </Button>
          <Button variant='autoWidthFull' width={130} onClick={handleIIAID}>
            IIA ID Oluştur
          </Button>
        </Flex>
        <Flex gap={3} justifyContent='flex-end' pr={4} mt={8}>
          <Button variant='submit' type='submit'>
            Kaydet
          </Button>
          <Button variant='clear' type='reset'>
            Temizle
          </Button>
        </Flex>
      </Box>
    </Stack>
  );
}
