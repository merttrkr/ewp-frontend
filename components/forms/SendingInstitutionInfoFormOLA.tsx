import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import TextInput from '@/components/form-components/inputs/TextInput';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import SelectDepartment from '../form-components/selectboxes/SelectDepartment';
import { Department } from '@/models/response/departmentResponse';
import { InstitutionInfo } from '@/models/response/institutionInfoResponse';
import SelectInstitution from '../form-components/selectboxes/SelectInstitution';
import useRead from '@/hooks/read/useRead';
import useUpdate from '@/hooks/update/useUpdate';
import { SendingInstitutionInfo } from '@/models/request/sendingInstitutionInfoRequest';
import { SendingInstitutionInfoResponse } from '@/models/response/sendingInstitutionInfoResponse';

type InstitutionInformationFormProps = {
  pageName: String;
  heiId?: string;
  heiName?: string;
  institutionInfoID?: number;
  learningAgreementId: number;
  sendingInstitutionInfoId: number;
  sendingInstitutionInfo?: SendingInstitutionInfoResponse;
};

type FormData = {
  hei_id: string;
  department_id: number;
  academic_personal_name: string;
  academic_personal_surname: string;
  academic_personal_eposta: string;
  administrative_personal_name: string;
  administrative_personal_surname: string;
  administrative_personal_eposta: string;
  phone_number: string;
  extension: string;
};

export default function InstitutionInformationForm({
  pageName,
  heiId = '',
  heiName = '',
  institutionInfoID = 0,
  learningAgreementId,
  sendingInstitutionInfoId,
  sendingInstitutionInfo,
}: InstitutionInformationFormProps) {
  const { GetUniversityFullname } = useRead();
  const {
    InsertEmptyRowToSendingInstitutionInfo,
    SaveSendingInstitutionInfo,
    SaveSendingInstitutionInfoIdToLearningAgreementTable,
  } = useUpdate();
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const [universityId, setUniversityId] = useState(heiId);
  const [universityName, setUniversityName] = useState(heiName);
  const [department, setDepartment] = useState('');
  const [departmentID, setDepartmentID] = useState(0);
  const [institutionInfoId, setInstitutionInfoId] = useState(institutionInfoID);
  const toast = useToast();

  //useForm hook
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<FormData>();

  useEffect(() => {
    if (heiId != '') {
      setUniversityId(heiId);
    }
    if (heiName != '') {
      setUniversityName(heiName);
    }
    if (institutionInfoID != 0) {
      setInstitutionInfoId(institutionInfoID);
    }
  }, [heiId]);

  async function handleSaveSendingInstitutionInfoIdToLearningAgreementTable() {
    const saveSendingInstitutionInfoIdToLearningAgreementTable = async () => {
      const requestUrl =
        'https://localhost:5001/spSaveSendingInstitutionInfoIdToLearningAgreementTable?sendingInstitutionInfo_id=' +
        sendingInstitutionInfoId +
        '&learningAgreement_id=' +
        learningAgreementId;
      try {
        await SaveSendingInstitutionInfoIdToLearningAgreementTable(requestUrl);
        console.log(
          'Saved sending institution id to LA :',
          sendingInstitutionInfoId
        );
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    if (sendingInstitutionInfoId !== 0 && learningAgreementId !== 0) {
      saveSendingInstitutionInfoIdToLearningAgreementTable();
    }
  }

  async function handleInsertEmptyRowToSendingInstitutionInfo() {
    const insertEmptyRowToSendingInstitutionInfo = async () => {
      await InsertEmptyRowToSendingInstitutionInfo(
        'https://localhost:5001/spInsertEmptyRowToSendingInstitutionInfo?sendingInstitutioInfo_id=' +
          sendingInstitutionInfoId
      );
    };
    insertEmptyRowToSendingInstitutionInfo();
  }

  async function handleSaveSendingInstitutionInfo(values: FormData) {
    const saveSendingInstitutionInfo = async () => {
      const request: SendingInstitutionInfo = {
        sendingInstitutionInfo_id: sendingInstitutionInfoId,
        hei_id: heiId != '' ? heiId : values.hei_id,
        universityDepartment_id: values.department_id,
        academicPersonnelName: values.academic_personal_name,
        academicPersonnelSurname: values.academic_personal_surname,
        academicPersonnelEmail: values.academic_personal_eposta,
        administrativePersonnelName: values.administrative_personal_name,
        administrativePersonnelSurname: values.administrative_personal_surname,
        administrativePersonnelEmail: values.administrative_personal_eposta,
        phoneNumberE164: values.phone_number,
        phoneNumberExt: values.extension,
      };

      await SaveSendingInstitutionInfo(request);
    };

    saveSendingInstitutionInfo();
  }
  useEffect(() => {
    handleInsertEmptyRowToSendingInstitutionInfo().then(() =>
      handleSaveSendingInstitutionInfoIdToLearningAgreementTable()
    );
  }, [sendingInstitutionInfoId]);

  function onSubmit(values: FormData) {
    return new Promise<void>(async (resolve, reject) => {
      await handleSaveSendingInstitutionInfo(values);

      try {
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
  const handleSelectChangeDepartment = (value: Department | null) => {
    if (value) {
      setValue('department_id', value.id);
      setDepartment(value.organizationalUnitName);
      setDepartmentID(value.id);
    } else {
      setValue('department_id', 0); // or any default value you want
      setDepartment(''); // or any default value you want
    }
  };
  const handleSelectChangeInstitution = (value: InstitutionInfo | null) => {
    if (value) {
      setValue('hei_id', value.heiId);
      setUniversityId(value.heiId);
      setUniversityName(value.UniName);
      setInstitutionInfoId(value.uniqueId);
    } else {
      setValue('hei_id', ''); // or any default value you want
      setDepartment(''); // or any default value you want
    }
  };

  useEffect(() => {
    if (
      sendingInstitutionInfo != undefined &&
      Object.keys(sendingInstitutionInfo).length !== 0
    ) {
      setValue('department_id', sendingInstitutionInfo.universityDepartment_id);
      setDepartmentID(sendingInstitutionInfo.universityDepartment_id);
      setValue(
        'academic_personal_name',
        sendingInstitutionInfo.academicPersonnelContactName
      );
      setValue(
        'academic_personal_surname',
        sendingInstitutionInfo.academicPersonnelContactSurname
      );
      setValue(
        'academic_personal_eposta',
        sendingInstitutionInfo.academicPersonnelContactEmail
      );
      setValue(
        'administrative_personal_name',
        sendingInstitutionInfo.administrativePersonnelContactName
      );
      setValue(
        'administrative_personal_surname',
        sendingInstitutionInfo.administrativePersonnelContactSurname
      );
      setValue(
        'administrative_personal_eposta',
        sendingInstitutionInfo.administrativePersonnelContactEmail
      );
      setValue('phone_number', sendingInstitutionInfo.phoneNumberE164);
      setValue('extension', sendingInstitutionInfo.phoneNumberExt);
    }
  }, [sendingInstitutionInfo]);

  return (
    <Stack
      marginBottom={['20', null, '0']}
      px={[3, 6]}
      py={[2, 3]}
      w={['100%', null, 'auto']}
      bg={HeaderBackground}
      borderBottom='1px'
      borderColor={BorderColor}
      borderRadius='xl'
    >
      <Box pl={[3, 6]} py={[2, 4]}>
        <Heading as='h3' size='md' fontWeight={'medium'} color={HeadingColor}>
          {pageName}
        </Heading>
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
        <Flex flexWrap={['wrap', null, 'nowrap']}>
          <Stack w={['100%', '50%']} spacing={4} p={[2, 5]}>
            <SelectInstitution
              inputValue={universityId}
              apiURL='https://localhost:5001/spGetUniversityNamesForOrganization?uniShortName=all'
              id='instution_name'
              register={
                (register('hei_id'),
                {
                  required: 'This is required',
                })
              }
              placeHolder={heiName}
              selectLabel='Kurum / Üniversite Adı'
              onChange={handleSelectChangeInstitution}
              error={errors.hei_id?.message}
            />
            <SelectDepartment
              inputValue={departmentID}
              id='department_id'
              register={
                register('department_id',
                {
                  required: 'This is required',
                })}
              placeHolder={department}
              selectLabel='Departman / Bölüm Adı'
              onChange={handleSelectChangeDepartment}
              param={universityId}
              error={errors.department_id?.message}
            />
            <TextInput
              id='academic_personal_name'
              label='Akademik Personelin İsmi'
              placeholder=''
              error={errors.academic_personal_name?.message}
              register={register('academic_personal_name', {
                required: 'This is required',
              })}
            />

            <TextInput
              id='academic_personal_surname'
              label='Akademik Personelin Soy İsmi'
              placeholder=''
              error={errors.academic_personal_surname?.message}
              register={
                register('academic_personal_surname',
                {
                  required: 'This is required',
                })
              }
            />

            <TextInput
              id='academic_personal_eposta'
              label='Akademik Personelin E-postası'
              placeholder=''
              error={errors.academic_personal_eposta?.message}
              register={
                register('academic_personal_eposta',
                {
                  required: 'This is required',
                })
              }
            />
          </Stack>
          <Stack w={['100%', '50%']} spacing={4} p={[2, 5]}>
            <TextInput
              id='administrative_personal_name'
              label='İdari Personelin İsmi'
              placeholder=''
              error={errors.administrative_personal_name?.message}
              register={
                register('administrative_personal_name',
                {
                  required: 'This is required',
                })
              }
            />

            <TextInput
              id='administrative_personal_surname'
              label='İdari Personelin Soy İsmi'
              placeholder=''
              error={errors.administrative_personal_surname?.message}
              register={
                register('administrative_personal_surname',
                {
                  required: 'This is required',
                })
              }
            />
            <Box height={1}></Box>
            <TextInput
              id='administrative_personal_eposta'
              label='İdari Personelin E-postası'
              placeholder=''
              error={errors.administrative_personal_eposta?.message}
              register={
                register('administrative_personal_eposta',
                {
                  required: 'This is required',
                })
              }
            />

            <TextInput
              id='phone_number'
              label='Telefon Numarası (E164 Formatında Belirtiniz)'
              placeholder=''
              error={errors.phone_number?.message}
              register={
                register('phone_number',
                {
                  required: 'This is required',
                })
              }
            />
            <TextInput
              id='extension'
              label='Dahili'
              placeholder=''
              error={errors.extension?.message}
              register={
                register('extension',
                {
                  required: 'This is required',
                })
              }
            />
          </Stack>
        </Flex>
        <Flex gap={3} justifyContent={'right'} pr={4} mt={'8'}>
          <Button variant='submit' type='submit'>
            Kaydet
          </Button>
          <Button variant='clear' type='reset'>
            Sıfırla
          </Button>
        </Flex>
      </Box>
    </Stack>
  );
}
