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
  const [IIACode, setIIACode] = useState('');
  const [IIAID, setIIAID] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
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
      const data = await GenerateIdsForBothOrganizationAndPartnerOrganization(
        'https://localhost:5001/spGenerateIdsForBothOrganizationAndPartnerOrganization'
      ); // Call the fetchData function
      console.log(
        'GenerateIdsForBothOrganizationAndPartnerOrganization:',
        data
      );
      handleInsertEmptyRowToBilateralAgreement(data.newOrganizationInfoId);
      handleInsertEmptyRowToBilateralAgreement(
        data.newPartnerOrganizationInfoId
      );
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
      await InsertEmptyRowToOrganizationInfo(
        '  //https://localhost:5001/spInsertEmptyRowToOrganizationInfo?organizationInfo_id=' +
          id
      );
    };
    insertEmptyRowToOrganizationInfo();
  }

  function onSubmit(values: FormData) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        values.IIA_ID = IIAID;
        values.IIA_Code = IIACode;
        alert(JSON.stringify(values, null));
        resolve();
      });
    });
  }
  const handleSelectChangeContact = (value: string) => {
    setValue('contact_persons', value);
  };
  const handleAuthorizedSignerSelectChangeContact = (value: string) => {
    setValue('authorized_signotary', value);
  };
  const handleSelectChangeDepartment = (value: string) => {
    setValue('departmant_name', value);
  };
  const handleSelectChangeInstitution = (value: string) => {
    setValue('hei_id', value);
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
              id='instution_name'
              register={register('hei_id', {
                required: 'This is required',
              })}
              placeHolder='placeholder..'
              selectLabel='Kurum / Üniversite Adı'
              onChange={handleSelectChangeInstitution}
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
              placeHolder='placeholder...'
              id='authorized_signotary'
              selectLabel='Anlaşmayı İmzalayacak Yetkili'
              register={register('authorized_signotary', {
                required: 'This is required',
              })}
              onChange={handleAuthorizedSignerSelectChangeContact}
            />
            <SelectContact
              id='contact_persons'
              register={register('contact_persons', {
                required: 'This is required',
              })}
              placeHolder='placeholder...'
              selectLabel='İletişim Kurulabilecek Yetkililer'
              onChange={handleSelectChangeContact}
            />
          </Stack>
          <Stack w='50%' spacing={4} p='5'>
            <SelectDepartment
              id='departmant_name'
              register={register('departmant_name', {
                required: 'This is required',
              })}
              placeHolder='...'
              selectLabel='Departman / Bölüm Adı'
              onChange={handleSelectChangeDepartment}
            />
            <TextInput2
              isDisabled
              placeholder={IIAID}
              id='IIA_ID'
              label='İkili Anlaşma IDsi (IIA-ID)'
              error={errors.IIA_ID?.message}
              register={register('IIA_ID')}
            />
            <DatePickerInput datePickerInputLabel='İmzalanma Tarihi' />

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
