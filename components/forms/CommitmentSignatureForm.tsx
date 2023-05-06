import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import TextInput from '@/components/form-components/TextInput';

type CommitmentSignatureFormProps = {
  pageName: String;
};

export default function CommitmentSignatureForm({
  pageName,
}: CommitmentSignatureFormProps) {
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');

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
        <Flex gap={3} justifyContent={'right'} pr={4} mt={'8'}>
          <Button variant='submit'>Kaydet</Button>
          <Button variant='clear'>Sıfırla</Button>
        </Flex>
      </Box>
    </Stack>
  );
}
