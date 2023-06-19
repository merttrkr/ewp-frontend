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
import { ReceivingInstitutionInfo } from '@/models/request/receivingInstitutionInfoRequest';
import SelectAcademicYear from '../form-components/selectboxes/SelectAcademicYear';
import { AcademicYearInfo } from '@/models/response/academicYearResponse';

type ReceivingInstitutionInfoFormProps = {
  pageName: String;
  institutionInfoID?: number;
  learningAgreementId: number;
  receivingInstitutionInfoId: number;
};

type FormData = {
  hei_id: string;
  academic_year: string;
  department_id: number;
  academic_personal_name: string;
  academic_personal_surname: string;
  academic_personal_eposta: string;
  phone_number: string;
  extension: string;
};

export default function ReceivingInstitutionInfoForm({
  pageName,
  institutionInfoID = 0,
  learningAgreementId,
  receivingInstitutionInfoId,
}: ReceivingInstitutionInfoFormProps) {
  const [formValues, setFormValues] = useState<FormData>({
    hei_id: '',
    department_id: 0,
    academic_year: '',
    academic_personal_name: '',
    academic_personal_surname: '',
    academic_personal_eposta: '',
    phone_number: '',
    extension: '',
  });
  const { GetUniversityFullname } = useRead();
  const {
    InsertEmptyRowToReceivingInstitutionInfo,
    SaveReceivingInstitutionInfoIdToLearningAgreementTable,
    SaveReceivingInstitutionInfo,
  } = useUpdate();
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const [universityId, setUniversityId] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [department, setDepartment] = useState('');
  const [departmentID, setDepartmentID] = useState(0);
  const [institutionInfoId, setInstitutionInfoId] = useState(institutionInfoID);
  const [academicYear, setAcademicYear] = useState('');
  const [academicYearID, setAcademicYearID] = useState(0);
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
    if (institutionInfoID != 0) {
      setInstitutionInfoId(institutionInfoID);
    }
  }, [institutionInfoID]);

  async function handleGetUniversityFullname() {
    /*const fetchUniversityFullname = async () => {
      await GetUniversityFullname(
        'https://localhost:5001/spGetUniversityFullname?sendingInstitutionInfoId=' +
          institutionInfoId
      );
    };
    fetchUniversityFullname();*/
  }

  async function handleSaveReceivingInstitutionInfoIdToLearningAgreementTable() {
    const saveReceivingInstitutionInfoIdToLearningAgreementTable = async () => {
      await SaveReceivingInstitutionInfoIdToLearningAgreementTable(
        'https://localhost:5001/spSaveReceivingInstitutionInfoIdToLearningAgreementTable?receivingInstitutionInfo_id=' +
          receivingInstitutionInfoId +
          '&learningAgreement_id=' +
          learningAgreementId
      );
    };
    saveReceivingInstitutionInfoIdToLearningAgreementTable();
  }

  async function handleInsertEmptyRowToReceivingInstitutionInfo() {
    const insertEmptyRowToReceivingInstitutionInfo = async () => {
      await InsertEmptyRowToReceivingInstitutionInfo(
        'https://localhost:5001/spInsertEmptyRowToReceivingInstitutionInfo?receivingInstitutionInfo_id=' +
          receivingInstitutionInfoId
      );
    };
    insertEmptyRowToReceivingInstitutionInfo();
  }

  async function handleSaveReceivingInstitutionInfo(values: FormData) {
    const saveReceivingInstitutionInfo = async () => {
      const request: ReceivingInstitutionInfo = {
        receivingInstitutionInfo_id: receivingInstitutionInfoId,
        university_id: institutionInfoId,
        universityDepartment_id: values.department_id,
        academicYear_id: academicYearID,
        academicPersonnelName: values.academic_personal_name,
        academicPersonnelSurname: values.academic_personal_surname,
        academicPersonnelEmail: values.academic_personal_eposta,
        phoneNumberE164: values.phone_number,
        phoneNumberExt: values.extension,
      };

      await SaveReceivingInstitutionInfo(request);
    };

    saveReceivingInstitutionInfo();
  }

  function onSubmit(values: FormData) {
    return new Promise<void>(async (resolve, reject) => {
      console.log('uni hei receiving:', universityId);
      console.log('receiving inst id:', receivingInstitutionInfoId);
      await handleInsertEmptyRowToReceivingInstitutionInfo();
      await handleSaveReceivingInstitutionInfo(values);
      console.log('learningAgreementID', learningAgreementId);
      await handleSaveReceivingInstitutionInfoIdToLearningAgreementTable();
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
  const handleAcademicYearChange = (value: AcademicYearInfo | null) => {
    if (value) {
      setValue('academic_year', value.academicYear);
      setAcademicYear(value.academicYear);
      setAcademicYearID(value.academicYear_id);
    } else {
      setValue('academic_year', '');
      setAcademicYear(''); // or any default value you want
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
              apiURL='https://localhost:5001/spGetUniversityNamesForOrganization?uniShortName=all'
              id='instution_name'
              register={register('hei_id')}
              placeHolder={''}
              selectLabel='Kurum / Üniversite Adı'
              onChange={handleSelectChangeInstitution}
              error={errors.hei_id?.message}
            />
            <SelectDepartment
              id='department_id'
              register={register('department_id')}
              placeHolder=''
              selectLabel='Departman / Bölüm Adı'
              onChange={handleSelectChangeDepartment}
              param={universityId}
              error={errors.department_id?.message}
            />
            <SelectAcademicYear
              id='academic_year'
              error={errors.academic_year?.message}
              register={register('academic_year')}
              placeholder=''
              selectLabel='Öğrenim Anlaşmasının Geçerli Olacağı Akademik Yıl'
              onChange={handleAcademicYearChange}
            />
          </Stack>
          <Stack w={['100%', '50%']} spacing={4} p={[2, 5]}>
            <TextInput
              id='academic_personal_name'
              label='Yetkilinin İsmi'
              placeholder={formValues.academic_personal_name}
              error={errors.academic_personal_name?.message}
              register={register('academic_personal_name')}
            />
            <TextInput
              id='academic_personal_surname'
              label='Yetkilinin Soy İsmi'
              placeholder={formValues.academic_personal_surname}
              error={errors.academic_personal_surname?.message}
              register={register('academic_personal_surname')}
            />

            <TextInput
              id='academic_personal_eposta'
              label='Yetkilinin E-postası'
              placeholder={formValues.academic_personal_eposta}
              error={errors.academic_personal_eposta?.message}
              register={register('academic_personal_eposta')}
            />
            <TextInput
              id='phone_number'
              label='Telefon Numarası (E164 Formatında Belirtiniz)'
              placeholder={formValues.phone_number}
              error={errors.phone_number?.message}
              register={register('phone_number')}
            />
            <TextInput
              id='extension'
              label='Dahili'
              placeholder={formValues.extension}
              error={errors.extension?.message}
              register={register('extension')}
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
