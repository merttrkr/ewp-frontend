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
  const HeadingColor = useColorModeValue('gray.600', 'gray.300');
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
        <Flex gap={5} p='5'>
          <Stack w='50%'>
            <TextInput
              placeHolder='placeholder..'
              name='IIA-15'
              label='Hareketliliğin Başlangıç Tarihi'
            />
          </Stack>
          <Stack w='50%'>
            <TextInput
              placeHolder='placeholder..'
              name='IIA-15'
              label='Hareketliliğin Bitiş Tarihi'
            />
          </Stack>
        </Flex>
        <Flex direction={'column'} rowGap={3} p={5}>
          <Text fontSize={'md'} fontWeight={'bold'} color={HeadingColor}>
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
          <Text fontSize={'md'} fontWeight={'bold'} color={HeadingColor}>
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
        <Flex direction={'column'} rowGap={5} pt={'10'} pl={5}>
          <Text fontSize={'md'} fontWeight={'bold'} color={HeadingColor}>
            Derslerin Toplam Kredi Değeri
          </Text>
          <Flex justify={'space-between'} gap={5}>
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
