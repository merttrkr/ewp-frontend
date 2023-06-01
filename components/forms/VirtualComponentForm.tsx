import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';

import AddComponentModal from './AddComponentModal';
import { BiTrash } from 'react-icons/bi';
import SelectAutoComplete from '@/components/form-components/SelectAutoComplete';

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
        display='flex'
        flexDirection='column'
        gap={10}
      >
        <Flex direction={'column'}>
          <Flex direction={'column'} rowGap={3} p={5}>
            <Text fontSize={'lg'} fontWeight={'bold'} color={HeadingColor}>
              Alıcı Kurumda Çalışılması Planlanılan Komponentler (Dersler) -
              Tablo C
            </Text>
            <AddComponentModal
              placeHolder='Ders Ekle +'
              tableType='C'
            ></AddComponentModal>
            <Text fontSize={'md'} fontWeight={'bold'} color={HeadingColor}>
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
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                  </Tr>
                  <Tr>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
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
                    <Th></Th>
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
                    <Td>
                      <IconButton
                        colorScheme='blue'
                        aria-label='delete button'
                        icon={<BiTrash />}
                        height={8}
                        borderRadius='md'
                      />
                    </Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <IconButton
                        colorScheme='blue'
                        aria-label='delete button'
                        icon={<BiTrash />}
                        height={8}
                        borderRadius='md'
                      />
                    </Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                    <Td>placeholder</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>

          <Flex pl={5}>
            <Text fontSize={'md'} fontWeight={'bold'} color={HeadingColor}>
              Derslerin Toplam Kredi Değeri:
            </Text>
            <Text>0</Text>
          </Flex>

          <Flex direction={'column'} rowGap={5} pt={'10'} pl={5}>
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
        </Flex>
        <Flex justify={'right'} gap={2}>
          <Button variant='submit'>Kaydet</Button>
          <Button variant='clear'>Sıfırla</Button>
        </Flex>
      </Box>
    </Stack>
  );
}
