import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import TextInput2 from '../form-components/TextInput2';
import DatePickerInput from '../form-components/DatePickerInput';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
//selectboxes
import SelectContact from '../form-components/selectboxes/SelectContact';
import SelectDepartment from '../form-components/selectboxes/SelectDepartment';
import SelectInstitution from '../form-components/selectboxes/SelectInstitution';
import useCreate from '@/hooks/create/useCreate';
import useUpdate from '@/hooks/update/useUpdate';
import { IdForBothResponse } from '@/models/idForBothResponse';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  signing_date: any;
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
  } = useUpdate();
  //colors
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const [institution, setInstitution] = useState('');
  const [department, setDepartment] = useState('');
  const [authorizedSignotary, setAuthorizedSignotary] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [IIACode, setIIACode] = useState('');
  const [IIAID, setIIAID] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<FormData>();

  function handleIIACode() {
    const fetchInitialData = async () => {
      const data = await await GenerateIIACode(
        'https://localhost:5001/spGenerateIIACode'
      ); // Call the fetchData function
      console.log('IIA CODE hook:', data);
      if (data) {
        setIIACode(data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
  }
  function handleIIAID() {
    const fetchInitialData = async () => {
      const data = await await GenerateIIAID(
        'https://localhost:5001/spGenerateIIAId'
      ); // Call the fetchData function
      console.log('IIA Id hook:', data);
      if (data) {
        setIIAID(data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
    //deneme
    handleIDForBoth();
    handleIDForBothCollaborationCondition();
    handleGenerateBilateralAgreementID();
  }

  function handleIDForBoth() {
    const fetchInitialData = async () => {
      const data: IdForBothResponse = (
        await GenerateIdsForBothOrganizationAndPartnerOrganization(
          'https://localhost:5001/spGenerateIdsForBothOrganizationAndPartnerOrganization'
        )
      )[0]; // Call the fetchData function
      console.log(
        'GenerateIdsForBothOrganizationAndPartnerOrganization hereee:',
        data
      );
      handleInsertEmptyRowToOrganizationInfo(data.newOrganizationInfoId);
      handleInsertEmptyRowToOrganizationInfo(data.newPartnerOrganizationInfoId);
    };
    fetchInitialData();
  }

  function handleIDForBothCollaborationCondition() {
    const fetchCollaborationConditionData = async () => {
      const data =
        await GenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition(
          'https://localhost:5001/spGenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition'
        );
      console.log(
        'GenerateIdsForBothOrganizationAndPartnerOrganizationCollaborationCondition:',
        data
      );
    };
    fetchCollaborationConditionData();
  }

  function handleGenerateBilateralAgreementID() {
    const fetchBilateralAgreementID = async () => {
      const data = await GenerateBilateralAgreementID(
        'https://localhost:5001/spGenerateBilateralAgreementId'
      );
      console.log('GenerateBilateralAgreementID:', data);
      //handleInsertEmptyRowToBilateralAgreement(data);
    };
    fetchBilateralAgreementID();
  }

  function handleInsertEmptyRowToBilateralAgreement(id: number) {
    const insertEmptyRowToBilateralAgreement = async () => {
      await InsertEmptyRowToBilateralAgreement(
        'https://localhost:5001/spInsertEmptyRowToBilateralAgreement?bilateralAgreement_id=' +
          id
      );
    };
    insertEmptyRowToBilateralAgreement();
  }

  function handleInsertEmptyRowToOrganizationInfo(id: number) {
    const insertEmptyRowToOrganizationInfo = async () => {
      console.log(
        'url' +
          'https://localhost:5001/spInsertEmptyRowToOrganizationInfo?organizationInfo_id=' +
          id
      );
      await InsertEmptyRowToOrganizationInfo(
        'https://localhost:5001/spInsertEmptyRowToOrganizationInfo?organizationInfo_id=' +
          id
      );
    };
    insertEmptyRowToOrganizationInfo();
  }

  function onSubmit(values: FormData) {
    console.log('submitted');

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('datee: ', startDate);
        values.signing_date = startDate;
        values.IIA_ID = IIAID;
        values.IIA_Code = IIACode;
        alert(JSON.stringify(values, null));
        resolve();
      });
    });
  }
  const handleSelectChangeContact = (value: string) => {
    setValue('contact_persons', value);
    setContactPerson(value);
  };
  const handleAuthorizedSignerSelectChangeContact = (value: string) => {
    setValue('authorized_signotary', value);
    setAuthorizedSignotary(value);
  };
  const handleSelectChangeDepartment = (value: string) => {
    setValue('departmant_name', value);
    setDepartment(value);
  };
  const handleSelectChangeInstitution = (value: string) => {
    setValue('hei_id', value);
    setInstitution(value);
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
             apiURL= 'https://localhost:5001/spGetUniversityNamesForOrganization?uniShortName=all'
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
