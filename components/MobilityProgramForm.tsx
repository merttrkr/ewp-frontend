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
  const TableColor = useColorModeValue('#20558B', 'gray.400');
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
              placeHolder='placeholder..'
              name='IIA-15'
              label='Hareketliliğin Başlangıç Tarihi'
            />
          </Stack>
          <Stack w='50%' spacing={4} p='5'>
            <TextInput
              placeHolder='placeholder..'
              name='IIA-15'
              label='Hareketliliğin Bitiş Tarihi'
            />

            <Flex w={'full'} bg={'gray.100'}></Flex>
          </Stack>
        </Flex>
        <Flex direction={'column'} rowGap={3} p={5}>
          <Text fontSize={'md'} fontWeight={'bold'} color={'gray.600'}>
            Alıcı Kurumda Çalışılması Planlanılan Komponentler(Dersler)
          </Text>
          <TableContainer bg={'gray.200'}>
            <Table variant='striped' size={'sm'} colorScheme='blue'>
              <Thead>
                <Tr>
                  <Th>Dersin Adı</Th>
                  <Th>Dersin Kredi Tipi</Th>
                  <Th>Dersin Kredi Değeri</Th>
                  <Th>Eğitim Dönemi Sayısı</Th>
                  <Th>Toplam Eğitim Dönemi Sayısı</Th>
                  <Th>Dersin Kodu</Th>
                  <Th>
                    Dersin Gönderen Kurumda Sayılması İçin Tanıma Koşulları
                  </Th>
                  <Th>Dersi Tanımlayan Kısa Açıklama</Th>
                  <Th>Durumu</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                  <Td>25.4</Td>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                </Tr>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                  <Td>25.4</Td>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
        <Flex direction={'column'} rowGap={3} p={5}>
          <Text fontSize={'md'} fontWeight={'bold'} color={'gray.600'}>
            Değişiklik Teklifleri
          </Text>
          <TableContainer bg={'gray.200'}>
            <Table variant='striped' size={'sm'} colorScheme='blue'>
              <Thead>
                <Tr>
                  <Th>Dersin Adı</Th>
                  <Th>Dersin Kredi Tipi</Th>
                  <Th>Dersin Kredi Değeri</Th>
                  <Th>Eğitim Dönemi Sayısı</Th>
                  <Th>Toplam Eğitim Dönemi Sayısı</Th>
                  <Th>Dersin Kodu</Th>
                  <Th>
                    Dersin Gönderen Kurumda Sayılması İçin Tanıma Koşulları
                  </Th>
                  <Th>Dersi Tanımlayan Kısa Açıklama</Th>
                  <Th>Durumu</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                  <Td>25.4</Td>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                </Tr>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                  <Td>25.4</Td>
                  <Td>inches</Td>
                  <Td>millimetres</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
        <Flex direction={'column'} columnGap={5} pt={'10'}>
          <Text fontSize={'md'} fontWeight={'bold'} pl={5} color={'gray.600'}>
            Derslerin Toplam Kredi Değeri
          </Text>
          <Flex justify={'space-between'} p={5}>
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Yabancı Dil'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Dil Yeterlilik Seviyesi'
            />
          </Flex>
        </Flex>
      </Box>
    </Stack>
  );
}
