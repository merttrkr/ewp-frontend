import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
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
  useToast,
} from '@chakra-ui/react';
import SelectAutoComplete from '@/components/form-components/SelectAutoComplete';
import TextInput from '../form-components/inputs/TextInput';
import { BiTrash } from 'react-icons/bi';
import AddComponentModal from './AddComponentModal';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import DateInput from '../form-components/inputs/DateInput';
import { LanguageLevel } from '@/models/response/languageLevelResponse';
import { Language } from '@/models/response/languageResponse';
import SelectLanguage from '../form-components/selectboxes/SelectLanguage';
import SelectLanguageLevel from '../form-components/selectboxes/SelectLanguageLevel';

type MobilityProgramFormDoctoralAndBlendedProps = {
  pageName: String;
};

type FormData = {
  link: string;
  mobility_start_date: string;
  mobility_end_date: string;
  language: string;
  language_level: string;
};

export default function MobilityProgramFormDoctoralAndBlended({
  pageName,
}: MobilityProgramFormDoctoralAndBlendedProps) {
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.300');
  //use states
  const [mobilityStartDate, setMobilityStartDate] = useState('');
  const [mobilityEndDate, setMobilityEndDate] = useState('');
  const [language, setLanguage] = useState('');
  const [languageID, setLanguageID] = useState(0);
  const [languageLevel, setLanguageLevel] = useState('');
  const [languageLevelID, setLanguageLevelID] = useState(0);
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<FormData>();

  const onSubmit = (values: FormData) => {
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
  };
  const handleMobilityStartDateChange = (value: string) => {
    if (value !== '') {
      setValue('mobility_start_date', value);
      setMobilityStartDate(value);
    } else {
      setValue('mobility_start_date', '');
      setMobilityStartDate('');
    }
  };

  const handleMobilityEndDateChange = (value: string) => {
    if (value !== '') {
      setValue('mobility_end_date', value);
      setMobilityEndDate(value);
    } else {
      setValue('mobility_end_date', '');
      setMobilityEndDate('');
    }
  };
  const handleLanguageChange = (value: Language | null) => {
    if (value) {
      setValue('language', value.definition);
      setLanguage(value.definition);
      setLanguageID(value.lang_id);
    } else {
      setValue('language', '');
      setLanguage(''); // or any default value you want
    }
  };
  const handleLanguageLevelChange = (value: LanguageLevel | null) => {
    if (value) {
      setValue('language_level', value.code);
      setLanguageLevel(value.code);
      setLanguageLevelID(value.langLevel_id);
    } else {
      setValue('language_level', '');
      setLanguageLevel(''); // or any default value you want
    }
  };

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
        display='flex'
        flexDirection='column'
        gap={10}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex gap={5} p='5'>
          <Stack w='50%'>
            <DateInput
              id='mobility_start_date'
              register={register('mobility_start_date')}
              placeholder=''
              label='Hareketliliğin Başlangıç Tarihi'
              onChange={handleMobilityStartDateChange}
              error={errors.mobility_start_date?.message}
            />
          </Stack>
          <Stack w='50%'>
            <DateInput
              id='mobility_end_date'
              register={register('mobility_end_date')}
              placeholder=''
              label='Hareketliliğin Bitiş Tarihi'
              onChange={handleMobilityEndDateChange}
              error={errors.mobility_end_date?.message}
            />
          </Stack>
        </Flex>
        <Flex direction={'column'}>
          <Flex direction={'column'} rowGap={3} p={5}>
            <Text fontSize={'lg'} fontWeight={'bold'} color={HeadingColor}>
              Alıcı Kurumda Çalışılması Planlanılan Komponentler (Dersler)
            </Text>
            <AddComponentModal placeholder='Ders Ekle +'></AddComponentModal>
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
            <TextInput
              label='Alıcı Kurumdaki Kurs Kataloğu Linki'
              placeholder='www.iyte.edu.tr'
              id='link'
              error={errors.link?.message}
              register={register('link')}
            ></TextInput>
            <Flex gap={4}>
              <Box w={'50%'}>
                <SelectLanguage
                  id='language'
                  error={errors.language?.message}
                  register={register('language')}
                  placeholder=''
                  selectLabel='Yabancı Dil'
                  onChange={handleLanguageChange}
                ></SelectLanguage>
              </Box>

              <Box w={'50%'}>
                <SelectLanguageLevel
                  id='language_level'
                  error={errors.language_level?.message}
                  register={register('language_level')}
                  placeholder=''
                  selectLabel='Seviyesi'
                  onChange={handleLanguageLevelChange}
                ></SelectLanguageLevel>
              </Box>
            </Flex>
          </Flex>
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
