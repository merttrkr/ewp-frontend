import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import SelectAutoComplete from '@/components/form-components/SelectAutoComplete';
import TextInput from '@/components/form-components/inputs/TextInput';
import DatePickerInput from '../form-components/inputs/DatePickerInput';
import SelectISCED from '../form-components/selectboxes/SelectISCED';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { SubjectArea } from '@/models/response/subjectAreaResponse';
import SelectEducationTypeAndLevel from '../form-components/selectboxes/SelectEducationTypeAndLevel';
import { EducationTypeAndLevel } from '@/models/response/educationTypeAndLevelResponse';
import getFormattedDate from '@/helper/currentDate';
import SelectNationality from '../form-components/selectboxes/SelectNationality';
import { Nationality } from '@/models/response/nationalityResponse';
import { MobilityType } from '@/models/response/mobilityTypeResponse';
import SelectMobilityTypes from '../form-components/selectboxes/SelectMobilityTypes';
type StudentInformationFormProps = {
  pageName: String;
};
type FormData = {
  education_type_and_level: string;
  isced_code_and_fields: string;
  nationality: string;
  mobility_type: string;
  omobility_id: string;
  gender: string;
  student_name: string;
  isced_explanation: string;
  eur_student_identifier: string;
  student_surname: string;
  student_email: string;
};

export default function StudentInformationForm({
  pageName,
}: StudentInformationFormProps) {
  //useForm hook
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<FormData>();

  //color
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const toast = useToast();
  //filed states
  const [ISCEDCodeAndFields, setISCEDCodeAndFields] = useState('');
  const [ISCEDCodeAndFieldsID, setISCEDCodeAndFieldsID] = useState(0);
  const [educationTypeAndLevel, setEducationTypeAndLevel] = useState('');
  const [educationTypeAndLevelID, setEducationTypeAndLevelID] = useState(0);
  const [selectedNationality, setSelectedNationality] = useState('');
  const [selectedNationalityID, setSelectedNationalityID] = useState(0);
  const [selectedMobilityType, setSelectedMobilityType] = useState('');
  const [selectedMobilityTypeID, setSelectedMobilityTypeID] = useState(0);
  const [startDate, setStartDate] = useState(getFormattedDate());
  //submit
  function onSubmit(values: FormData) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        alert(JSON.stringify(values, null));
        console.log('values: ', values);

        toast({
          title: 'Kayıt Başarılı.',
          description: 'Öğrenciye Ait Bilgiler başarıyla kaydedildi.',
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

  const handleSelectChangeMobilityType = (value: MobilityType | null) => {
    if (value) {
      setValue('mobility_type', value.mobilityType);
      setSelectedMobilityType(value.mobilityType);
      setSelectedMobilityTypeID(value.id);
    } else {
      setValue('mobility_type', ''); // or any default value you want
      setSelectedMobilityType('');
    }
  };

  const handleSelectChangeNationality = (value: Nationality | null) => {
    if (value) {
      setValue('nationality', value.nationality);
      setSelectedNationality(value.nationality);
      setSelectedNationalityID(value.id);
    } else {
      setValue('nationality', ''); // or any default value you want
      setSelectedNationality('');
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

  return (
    <Stack
      marginBottom='20'
      px={6}
      py='3'
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
        <Flex p='5'>
          <SelectMobilityTypes
            selectLabel='Seçilmiş Hareketlilik (Mobilite) Tipi'
            placeholder=''
            register={register('mobility_type')} // Replace with your form registration method
            onChange={handleSelectChangeMobilityType}
            error={errors.mobility_type?.message} // Replace with your form error handling
          />
        </Flex>

        <Flex>
          <Stack w='50%' spacing={4} p='5'>
            <TextInput
              id='omobility_id'
              label='Omobility id'
              placeholder='DENEME-ID-2'
              isDisabled
              error={errors.omobility_id?.message}
              register={register('omobility_id')}
            />
            <TextInput
              id='student_name'
              placeholder=''
              label='Öğrencinin İsmi'
              error={errors.student_name?.message}
              register={register('student_name')}
            />

            <SelectAutoComplete
              placeHolder='Kadın'
              selectLabel='Öğrencinin Cinsiyet'
            />
            <DatePickerInput
              startDate={startDate}
              setStartDate={setStartDate}
              datePickerInputLabel='Öğrencinin Doğum Tarihi'
            />
            <TextInput
              placeholder='test@gmail.com'
              label='Öğrencinin E-postası'
              id='student_email'
              error={errors.student_email?.message}
              register={register('student_email')}
            />
            <SelectISCED
              id='isced_code_and_fields'
              error={errors.isced_code_and_fields?.message}
              register={register('isced_code_and_fields')}
              placeholder={ISCEDCodeAndFields}
              selectLabel='ISCED Kodu ve Konu Alanları'
              onChange={handleISCEDchange}
            ></SelectISCED>
          </Stack>
          <Stack w='50%' spacing={4} p='5'>
            <TextInput
              placeholder=''
              label='Öğrencinin Soy İsmi'
              id='student_surname'
              error={errors.student_surname?.message}
              register={register('student_surname')}
            />
            <SelectNationality
              id='nationality'
              error={errors.nationality?.message}
              register={register('nationality', {
                required: 'This is required',
              })}
              selectLabel='Öğrencinin Ulusu'
              placeholder=''
              onChange={handleSelectChangeNationality}
            />
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
            <TextInput
              placeholder=''
              id='eur_student_identifier'
              label='European Student Identifier'
              error={errors.eur_student_identifier?.message}
              register={register('eur_student_identifier')}
            />
            <TextInput
              placeholder=''
              label='ISCED Explanation'
              id='isced_explanation'
              error={errors.isced_explanation?.message}
              register={register('isced_explanation')}
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
