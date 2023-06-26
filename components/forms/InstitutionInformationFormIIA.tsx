import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import TextInput from '../form-components/inputs/TextInput';
import { set, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
//selectboxes
import SelectContact from '../form-components/selectboxes/SelectContact';
import SelectDepartment from '../form-components/selectboxes/SelectDepartment';
import SelectInstitution from '../form-components/selectboxes/SelectInstitution';
import useCreate from '@/hooks/create/useCreate';
import useUpdate from '@/hooks/update/useUpdate';
import { Contact } from '@/models/response/contactResponse';
import { OrganizationInfoFormRequest } from '@/models/request/organizationInfoFormRequest';
import { Department } from '@/models/response/departmentResponse';
import { InstitutionInfo } from '@/models/response/institutionInfoResponse';
import { OrganizationRequestToIIA } from '@/models/request/organizationRequestToIIA';
import getFormattedDate from '@/helper/currentDate';
import { useToast } from '@chakra-ui/react';
import { OrganizationInfo } from '@/models/response/organizationInfoResponse';
import useRead from '@/hooks/read/useRead';
import DateInput from '../form-components/inputs/DateInput';
import { log, time } from 'console';

type InstitutionInformationFormProps = {
  pageName: string;
  subText: string;
  bilateralAgreementID: number;
  organizationInfoId: number;
  isPartnerValue: number;
  saveState: number;
  onSave: () => void;
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
  organizationInfoId,
  bilateralAgreementID,
  isPartnerValue,
  saveState,
  onSave,
}: InstitutionInformationFormProps) {
  const { GetOrganizationInfo } = useRead();

  const { GenerateIIACode, GenerateIIAID } = useCreate();
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
  } = useUpdate();
  //colors
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const FormBackground = useColorModeValue('gray.50', 'gray.600');
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
  const [contactPersonID, setContactPersonID] = useState<number[]>([]);
  const [departmentID, setDepartmentID] = useState(0);
  const [institutionID, setInstitutionId] = useState(0);

  const [organizationInfo, setOrganizationInfo] = useState<OrganizationInfo>();
  const [signingDateInp, setSigningDateInp] = useState<string>('');

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
      if (organizationInfoId != 0 && authorizedSignotaryPersonID != 0) {
        await SetSigningPerson(
          'https://localhost:5001/spSetSigningPerson?organizationInfo_id=' +
            organizationInfoId +
            '&signingPerson_id=' +
            authorizedSignotaryPersonID
        );
      }
    };
    setSigningPerson();
  }

  async function handleAddOrganizationContactInfo() {
    const addContactPromises = contactPersonID.map(async (item) => {
      if (organizationInfoId != 0 && item != 0) {
        await AddOrganizationContactInfo(
          'https://localhost:5001/spAddOrganizationContactInfo?organizationInfo_id=' +
            organizationInfoId +
            '&contact_id=' +
            item
        );
      }
    });

    try {
      await Promise.all(addContactPromises);
      // All requests completed successfully
      // Add any additional logic here
    } catch (error) {
      console.error('Error: ' + error);
      // Error occurred during one or more requests
      // Handle or log the error as needed
    }
  }

  async function handleSetUniversityIdOfOrganizationInfo() {
    const setUniversityIdOfOrganizationInfo = async () => {
      if (institutionID != 0 && organizationInfoId != 0) {
        await SetUniversityIdOfOrganizationInfo(
          'https://localhost:5001/spSetUniversityIdOfOrganizationInfo?hei_id=' +
            institution +
            '&organizationInfo_id=' +
            organizationInfoId
        );
      }
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
        id: organizationInfoId,
        university_id: institutionID,
        universityDepartment_id: departmentID,
        signingDate: signingDateInp,
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
        organizationInfoId: organizationInfoId,
        isPartner: isPartnerValue == 0 ? '0' : '1',
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
    values.IIA_ID = IIAID;
    values.IIA_Code = IIACode;

    return new Promise<void>(async (resolve, reject) => {
      try {
        await handleInsertEmptyRowToBilateralAgreement(bilateralAgreementID);
        await handleInsertEmptyRowToOrganizationInfo(organizationInfoId);
        await handleSetUniversityIdOfOrganizationInfo();
        await handleSetSigningPerson();
        await handleAddOrganizationContactInfo();
        await handleUpdateDateOfBilateralAgreement();
        await handleSaveOrganizationInfo();
        await handleAddOrganizationInfoToBilateralAgreement();
        await handleSetCreatorOfBilateralAgreement();
        onSave();

        toast({
          title: 'Kayıt Başarılı.',
          description: 'Kurum bilgileri başarıyla kaydedildi.',
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

  const handleSelectChangeContact = (value: Contact | Contact[] | null) => {
    if (Array.isArray(value)) {
      const contactPersonNames = value
        .map((contact) => contact.fullName)
        .join(', ');
      setValue('contact_persons', contactPersonNames);
      setContactPerson(contactPersonNames);
      const contactPersonIDs = value.map((contact) => contact.id);
      setContactPersonID(contactPersonIDs);
    } else if (value) {
      setValue('contact_persons', value.fullName);
      setContactPerson(value.fullName);
      setContactPersonID(Array(value.id));
    } else {
      setValue('contact_persons', ''); // or any default value you want
      setContactPerson(''); // or any default value you want
      setContactPersonID([]); // or any default value you want
    }
  };

  const handleAuthorizedSignerSelectChangeContact = (
    value: Contact | Contact[] | null
  ) => {
    if (value && !Array.isArray(value)) {
      setValue('authorized_signotary', value.fullName);
      setAuthorizedSignotary(value.fullName);

      setauthorizedSignotaryPersonID(value.id);
    } else {
      setValue('authorized_signotary', ''); // or any default value you want
      setAuthorizedSignotary(''); // or any default value you want
      setauthorizedSignotaryPersonID(0); // or any default value you want
    }
  };

  const handleSelectChangeDepartment = (value: Department | null) => {
    if (value?.organizationalUnitName && value?.id) {
      setValue('departmant_name', value.organizationalUnitName);
      setDepartment(value.organizationalUnitName);
      setDepartmentID(value.id);
    }
  };

  useEffect(() => {
    handleGetOrganizationInfo();
  }, [organizationInfoId]);

  useEffect(() => {
    if (
      organizationInfo != undefined &&
      Object.keys(organizationInfo).length !== 0
    ) {
      setValue('hei_id', organizationInfo?.heiId);
      setValue('departmant_name', organizationInfo?.ounitName);
      setValue('IIA_Code', organizationInfo?.IIACode);
      setValue('IIA_ID', organizationInfo?.IIAID);
      setValue('authorized_signotary', organizationInfo?.signingPersonFullName);
      setValue('signing_date', organizationInfo?.signingDate);
      setInstitution(organizationInfo?.heiId);
      setDepartment(organizationInfo?.ounitName);
      setIIACode(organizationInfo?.IIACode);
      setIIAID(organizationInfo?.IIAID);
      setSigningDateInp(organizationInfo?.signingDate);
      setAuthorizedSignotary(organizationInfo?.signingPersonFullName);
      setContactPerson(organizationInfo?.signingPersonFullName);
    }
  }, [organizationInfo]);

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
    if (organizationInfoId != 0) {
      fetchInitialData();
    }
  }

  const handleSigningDateChange = (value: string) => {
    if (value !== '') {
      setValue('signing_date', value); // You can format the date value as needed
      setSigningDateInp(value);
    } else {
      setValue('signing_date', ''); // or any default value you want
      setSigningDateInp('');
    }
  };

  return (
    <Stack
      marginBottom={['20', null, '0']}
      px={[3, 6]}
      py={[2, 3]}
      w={['100%', null, 'auto']}
      bg={HeaderBackground}
      borderBottom='1px'
      borderColor={BorderColor}
      borderRadius={'xl'}
    >
      <Box pl={[3, 6]} py={[2, 4]}>
        <Heading as='h3' size='md' fontWeight={'medium'} color={HeadingColor}>
          {pageName}
        </Heading>
        <Text>{subText}</Text>
      </Box>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        as='form'
        mt={[6, 10]}
        boxShadow={'lg'}
        padding={[3, 5]}
        bg={FormBackground}
        borderRadius={'xl'}
      >
        <Flex direction={['column', 'row']}>
          <Stack w={['100%', '50%']} spacing={4} p={[2, 5]}>
            <SelectInstitution
              inputValue={institution}
              apiURL='https://localhost:5001/spGetUniversityNamesForOrganization?uniShortName='
              id='instution_name'
              register={register('hei_id', {
                required: 'This is required',
              })}
              placeHolder={institution}
              selectLabel='Kurum / Üniversite Adı'
              onChange={handleSelectChangeInstitution}
              error={errors.hei_id?.message}
            />
            <TextInput
              isDisabled
              placeholder={IIACode}
              id='IIA_Code'
              label='İkili Anlaşma Kodu'
              error={errors.IIA_Code?.message}
              register={register('IIA_Code')}
            />
            <SelectContact
              isMultiple
              id='contact_persons'
              error={errors.contact_persons?.message}
              register={register('contact_persons')}
              placeholder={contactPerson}
              selectLabel='İletişim Kurulabilecek Yetkililer'
              onChange={handleSelectChangeContact}
              param={institution}
            />
            <SelectContact
              placeholder={authorizedSignotary}
              id='authorized_signotary'
              selectLabel='Anlaşmayı İmzalayacak Yetkili'
              error={errors.authorized_signotary?.message}
              register={register('authorized_signotary')}
              onChange={handleAuthorizedSignerSelectChangeContact}
              param={institution}
            />
          </Stack>
          <Stack w={['100%', '50%']} spacing={4} p={[2, 5]}>
            <SelectDepartment
              inputValue={department}
              id='departmant_name'
              register={register('departmant_name')}
              placeHolder={department}
              selectLabel='Departman / Bölüm Adı'
              onChange={handleSelectChangeDepartment}
              param={institution}
              error={errors.departmant_name?.message}
            />
            <TextInput
              isDisabled
              placeholder={IIAID}
              id='IIA_ID'
              label='İkili Anlaşma IDsi (IIA-ID)'
              error={errors.IIA_ID?.message}
              register={register('IIA_ID')}
            />
            <DateInput
              id='signing_date'
              register={register('signing_date', {
                required: 'This is required',
              })}
              placeholder={signingDateInp}
              label='İmzalanma Tarihi'
              onChange={handleSigningDateChange}
              error={errors.signing_date?.message}
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
