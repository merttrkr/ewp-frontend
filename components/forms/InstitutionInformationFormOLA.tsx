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

type SendingInstitutionInformationFormProps = {
  pageName: String;
};

export default function SendingInstitutionInformationForm({
  pageName,
}: SendingInstitutionInformationFormProps) {
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');

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
          <Heading
            as='h3'
            size='md'
            fontWeight={'medium'}
            noOfLines={1}
            color={HeadingColor}
          >
            Gönderen {pageName}
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
          <Flex>
            <Stack w='50%' spacing={4} p='5'>
              <TextInput
                label='Kurum / Üniversite Adı'
                placeHolder='Selcuk University'
                name='sendingInstitutionName'
              />
              <SelectAutoComplete
                placeHolder='placeholder..'
                selectLabel='Departman / Bölüm Adı'
              />
              <TextInput
                placeHolder='Test Test'
                label='Akademik Personelin İsmi'
                name='personalName'
              />
              <TextInput
                placeHolder='Test Test'
                label='Akademik Personelin Soy İsmi'
                name='personalSurname'
              />
              <TextInput
                placeHolder='test@gmail.com'
                label='Akademik Personelin E-postası'
                name='personalEposta'
              />
            </Stack>
            <Stack w='50%' spacing={4} p='5'>
              <TextInput
                placeHolder='Test Test'
                label='İdari Personelin İsmi'
                name='personalName'
              />
              <TextInput
                placeHolder='Test Test'
                label='İdari Personelin Soy İsmi'
                name='personalSurname'
              />
              <TextInput
                placeHolder='test@gmail.com'
                label='İdari Personelin E-postası'
                name='personalEposta'
              />

              <TextInput
                placeHolder='placeholder..'
                name='0'
                label='Telefon Numarası (E164 Formatında Belirtiniz)'
              />
              <TextInput placeHolder='placeholder..' name='0' label='Dahili' />
            </Stack>
          </Flex>
          <Flex gap={3} justifyContent={'right'} pr={4} mt={'8'}>
            <Button variant='submit'>Kaydet</Button>
            <Button variant='clear'>Sıfırla</Button>
          </Flex>
        </Box>
      </Stack>
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
          <Heading
            as='h3'
            size='md'
            fontWeight={'medium'}
            noOfLines={1}
            color={HeadingColor}
          >
            Alıcı {pageName}
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
          <Flex>
            <Stack w='50%' spacing={4} p='5'>
              <TextInput
                label='Kurum / Üniversite Adı'
                placeHolder='Selcuk University'
                name='sendingInstitutionName'
              />
              <SelectAutoComplete
                placeHolder='placeholder..'
                selectLabel='Departman / Bölüm Adı'
              />
              <TextInput
                placeHolder='Test Test'
                label='Akademik Personelin İsmi'
                name='personalName'
              />
              <TextInput
                placeHolder='Test Test'
                label='Akademik Personelin Soy İsmi'
                name='personalSurname'
              />
              <TextInput
                placeHolder='test@gmail.com'
                label='Akademik Personelin E-postası'
                name='personalEposta'
              />
            </Stack>
            <Stack w='50%' spacing={4} p='5'>
              <TextInput
                placeHolder='Test Test'
                label='İdari Personelin İsmi'
                name='personalName'
              />
              <TextInput
                placeHolder='Test Test'
                label='İdari Personelin Soy İsmi'
                name='personalSurname'
              />
              <TextInput
                placeHolder='test@gmail.com'
                label='İdari Personelin E-postası'
                name='personalEposta'
              />

              <TextInput
                placeHolder='placeholder..'
                name='0'
                label='Telefon Numarası (E164 Formatında Belirtiniz)'
              />
              <TextInput placeHolder='placeholder..' name='0' label='Dahili' />
            </Stack>
          </Flex>
          <Flex gap={3} justifyContent={'right'} pr={4} mt={'8'}>
            <Button variant='submit'>Kaydet</Button>
            <Button variant='clear'>Sıfırla</Button>
          </Flex>
        </Box>
      </Stack>
    </Flex>
  );
}
