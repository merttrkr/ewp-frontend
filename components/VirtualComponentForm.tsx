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
import ModalInput from './form-components/ModalInput';

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
  const TitleColor = useColorModeValue('gray.800', 'gray.200');
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
        <Heading as='h3' size='md' fontWeight={'medium'}>
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
        <Flex direction={'column'} rowGap={5} p={5}>
          <Heading fontSize={'lg'} color={TitleColor}>
            Sanal Ders (Komponent) Ekle - Tablo C
          </Heading>
          <Flex>
            <ModalInput placeHolder='Ders Ekle +' />
          </Flex>
          <Flex direction={'column'} rowGap={3}>
            <Text fontSize={'md'} color={HeadingColor} fontWeight={'bold'}>
              Onaylanmış Teklifler
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
          <Flex direction={'column'} rowGap={3}>
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
          <Flex gap={5}>
            <Text fontSize={'md'} fontWeight={'bold'} color={HeadingColor}>
              Derslerin Toplam Kredi Değeri:
            </Text>
            <Text>0</Text>
          </Flex>
          <Flex justify={'right'} gap={2}>
            <Button variant='submit'>Kaydet</Button>
            <Button variant='clear'>Sıfırla</Button>
          </Flex>
        </Flex>
      </Box>
    </Stack>
  );
}
