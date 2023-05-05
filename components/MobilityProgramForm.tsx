import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import SelectAutoComplete from '@/components/form-components/SelectAutoComplete';
import TextInput from './form-components/TextInput';
import DatePickerInput from './form-components/DatePickerInput';

type MobilityProgramFormProps = {
  pageName: String;
};

export default function MobilityProgramForm({
  pageName,
}: MobilityProgramFormProps) {
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
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
        <Heading
          as='h3'
          size='md'
          fontWeight={'medium'}
          noOfLines={1}
          color={HeadingColor}
        >
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
        <Flex>
          <Stack w='50%' spacing={4} p='5'>
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Kurum / Üniversite Adı'
            />
            <TextInput
              placeHolder='placeholder..'
              name='IIA-15'
              label='İkili Anlaşma Kodu (IIA-Kodu)'
            />
            <TextInput
              placeHolder='placeholder..'
              name='Mert Türker'
              label='Anlaşmayı İmzalayacak Yetkili'
            />

            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='İletişim Kurulabilecek Yetkililer'
            />
          </Stack>
          <Stack w='50%' spacing={4} p='5'>
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Departman / Bölüm Adı'
            />
            <TextInput
              placeHolder='placeholder..'
              name='IIA-15'
              label='İkili Anlaşma IDsi (IIA-ID)'
            />
            <DatePickerInput datePickerInputLabel='İmzalanma Tarihi' />
            <Flex w={'full'} bg={'gray.100'}></Flex>
          </Stack>
        </Flex>
        <TableContainer>
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        <Flex gap={3} justifyContent={'right'} pr={4} mt={'8'}>
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
