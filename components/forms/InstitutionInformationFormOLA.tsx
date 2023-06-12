import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
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
import useCreate from '@/hooks/create/useCreate';

type InstitutionInformationFormProps = {
  pageName: String;
  heiId?: string;
  heiName?: string;
};

type FormData = {
  hei_id: string;
  department_name: string;
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
}: InstitutionInformationFormProps) {
  const [formValues, setFormValues] = useState<FormData>({
    hei_id: '',
    department_name: '',
    academic_personal_name: '',
    academic_personal_surname: '',
    academic_personal_eposta: '',
    administrative_personal_name: '',
    administrative_personal_surname: '',
    administrative_personal_eposta: '',
    phone_number: '',
    extension: '',
  });

  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const [universityId, setUniversityId] = useState(heiId);
  const [universityName, setUniversityName] = useState(heiName);
  const [department, setDepartment] = useState('');
  const [departmentID, setDepartmentID] = useState(0);

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
  }, [heiId]);
  console.log('universityId başta', universityId);
  console.log('universityName başta', universityName);
  function onSubmit(values: FormData) {
    return new Promise<void>(async (resolve, reject) => {
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
        console.log(error);
        reject(error);
      }
    });
  }
  const handleSelectChangeDepartment = (value: Department | null) => {
    if (value) {
      setValue('department_name', value.organizationalUnitName);
      setDepartment(value.organizationalUnitName);
      setDepartmentID(value.id);
    } else {
      setValue('department_name', ''); // or any default value you want
      setDepartment(''); // or any default value you want
    }
  };
  const handleSelectChangeInstitution = (value: InstitutionInfo | null) => {
    if (value) {
      setValue('hei_id', value.heiId);
      setUniversityId(value.heiId);
      setUniversityName(value.UniName);
      console.log('universityId ', universityId);
      console.log('universityName ', universityName);
    } else {
      setValue('hei_id', ''); // or any default value you want
      setDepartment(''); // or any default value you want
    }
  };

  return (
    <Flex direction={'column'}>
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
          <Flex>
            <Stack w='50%' spacing={4} p='5'>
              <SelectInstitution
                apiURL='https://localhost:5001/spGetUniversityNamesForOrganization?uniShortName=all'
                id='instution_name'
                register={register('hei_id')}
                placeHolder={heiName}
                selectLabel='Kurum / Üniversite Adı'
                onChange={handleSelectChangeInstitution}
                error={errors.hei_id?.message}
              />
              <SelectDepartment
                id='departmant_name'
                register={register('department_name')}
                placeHolder=''
                selectLabel='Departman / Bölüm Adı'
                onChange={handleSelectChangeDepartment}
                param={universityId}
                error={errors.department_name?.message}
              />
              <TextInput
                id='academic_personal_name'
                label='Akademik Personelin İsmi'
                placeholder={formValues.academic_personal_name}
                error={errors.academic_personal_name?.message}
                register={register('academic_personal_name')}
              />

              <TextInput
                id='academic_personal_surname'
                label='Akademik Personelin Soy İsmi'
                placeholder={formValues.academic_personal_surname}
                error={errors.academic_personal_surname?.message}
                register={register('academic_personal_surname')}
              />

              <TextInput
                id='academic_personal_eposta'
                label='Akademik Personelin E-postası'
                placeholder={formValues.academic_personal_eposta}
                error={errors.academic_personal_eposta?.message}
                register={register('academic_personal_eposta')}
              />
            </Stack>
            <Stack w='50%' spacing={4} p='5'>
              <TextInput
                id='administrative_personal_name'
                label='İdari Personelin İsmi'
                placeholder={formValues.administrative_personal_name}
                error={errors.administrative_personal_name?.message}
                register={register('administrative_personal_name')}
              />

              <TextInput
                id='administrative_personal_surname'
                label='İdari Personelin Soy İsmi'
                placeholder={formValues.administrative_personal_surname}
                error={errors.administrative_personal_surname?.message}
                register={register('administrative_personal_surname')}
              />
              <Box height={1}></Box>
              <TextInput
                id='administrative_personal_eposta'
                label='İdari Personelin E-postası'
                placeholder={formValues.administrative_personal_eposta}
                error={errors.administrative_personal_eposta?.message}
                register={register('administrative_personal_eposta')}
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
    </Flex>
  );
}
