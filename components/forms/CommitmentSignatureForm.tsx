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
type CommitmentSignatureFormProps = {
  pageName: String;
  subText: String;
};

export default function CommitmentSignatureForm({
  pageName,
  subText,
}: CommitmentSignatureFormProps) {
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const ButtonColor = useColorModeValue('#20558B', '#0E3051');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const apos = "'";

  const ButtonHoverColor = useColorModeValue('#9C1F23', 'gray.600');
  return (
    <Stack
      margin='5'
      marginBottom='20'
      px={6}
      py={6}
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
        as={'form'}
        mt={10}
        boxShadow={'lg'}
        padding={5}
        bg={FormBackground}
        borderRadius={'xl'}
      >
        <HStack pl={5}>
          <Box w={'50%'}>
            <Heading
              as='text'
              size='sm'
              fontWeight={'normal'}
              color={HeadingColor}
            >
              Gönderen Kurumdaki Sorumlu Kişinin İmza Bilgileri
            </Heading>
          </Box>

          <Box w={'50%'}>
            <Heading
              as='text'
              size='sm'
              fontWeight={'normal'}
              color={HeadingColor}
            >
              Gönderen Kurumdaki Sorumlu Kişinin İmza Bilgileri
            </Heading>
          </Box>
        </HStack>

        <Flex>
          <Stack w='50%' spacing={4} p='5'>
            <TextInput
              placeHolder='Test Test'
              label='Sorumlu Kişinin Adı Soyadı'
              name='personalName'
            />
            <TextInput
              placeHolder='Test Test'
              label='Mevkisi / Pozisyonu'
              name='personalSurname'
            />
            <TextInput
              placeHolder='test@gmail.com'
              label='E-postası'
              name='personalEposta'
            />
          </Stack>

          <Stack w='50%' spacing={4} p='5'>
            <TextInput
              placeHolder='Test Test'
              label='Sorumlu Kişinin Adı Soyadı'
              name='personalName'
            />
            <TextInput
              placeHolder='Test Test'
              label='Mevkisi / Pozisyonu'
              name='personalSurname'
            />
            <TextInput
              placeHolder='test@gmail.com'
              label='E-postası'
              name='personalEposta'
            />
          </Stack>
        </Flex>
      </Box>
    </Stack>
  );
}
