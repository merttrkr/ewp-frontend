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
} from '@chakra-ui/react';

import SelectAutoComplete from '@/components/form-components/SelectAutoComplete';
import TextInput from '@/components/form-components/TextInput';
import CheckBoxInput from '@/components/form-components/CheckBoxInput';
import DisplayText from '../form-components/DisplayText';
import DatePickerInput from '../form-components/DatePickerInput';
type StudentInformationFormProps = {
  pageName: String;
};

export default function StudentInformationForm({
  pageName,
}: StudentInformationFormProps) {
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');

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
      >
        <Flex p='5'>
          <SelectAutoComplete
            placeHolder='placeholder..'
            selectLabel='Seçilmiş Hareketlilik (Mobilite) Tipi'
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
            <DatePickerInput datePickerInputLabel='Öğrencinin Doğum Tarihi' />
            <TextInput
              placeHolder='test@gmail.com'
              label='Öğrencinin E-postası'
              name='eposta'
            />

            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='ISCED Kodu ve Konu Alanları'
            />
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
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Öğrencinin Öğrenim Seviyesi'
            />

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
      </Box>
    </Stack>
  );
}
