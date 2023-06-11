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

import SelectAutoComplete from '@/components/form-components/SelectAutoComplete';
import TextInput from '@/components/form-components/inputs/TextInput1';
import CheckBoxInput from '@/components/form-components/inputs/CheckBoxInput';
import DisplayText from '../form-components/DisplayText';
import DatePickerInput from '../form-components/inputs/DatePickerInput';
import SelectISCED from '../form-components/selectboxes/SelectISCED';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { SubjectArea } from '@/models/response/subjectAreaResponse';
import SelectEducationTypeAndLevel from '../form-components/selectboxes/SelectEducationTypeAndLevel';
import { EducationTypeAndLevel } from '@/models/response/educationTypeAndLevelResponse';
type StudentInformationFormProps = {
  pageName: String;
};
type FormData = {
  education_type_and_level: string;
  isced_code_and_fields: string;
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
          <SelectAutoComplete
            placeHolder='placeholder..'
            selectLabel='Seçilmiş Hareketlilik (Mobilite) Tipi'
            isDisabled
          />
        </Flex>

        <Flex>
          <Stack w='50%' spacing={4} p='5'>
            <TextInput
              label='Omobility-id'
              placeHolder='DENEME-ID-2'
              name='omobilityId'
              isDisabled
            />
            <TextInput
              placeHolder='Test Test'
              label='Öğrencinin İsmi'
              name='name'
            />

            <SelectAutoComplete
              placeHolder='Kadın'
              selectLabel='Öğrencinin Cinsiyet'
            />
            <DatePickerInput
              startDate=''
              setStartDate={Date}
              datePickerInputLabel='Öğrencinin Doğum Tarihi'
            />
            <TextInput
              placeHolder='test@gmail.com'
              label='Öğrencinin E-postası'
              name='eposta'
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
              placeHolder='Test Test'
              label='Öğrencinin Soy İsmi'
              name='name'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Öğencinin Ulusu'
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
              placeHolder='placeholder..'
              name='0'
              label='European Student Identifer (Öğrencinin Global ID`si)'
              isDisabled
            />
            <TextInput
              placeHolder='placeholder..'
              name='0'
              label='ISCED Açıklaması'
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
