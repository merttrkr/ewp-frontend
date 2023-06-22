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
  useToast,
} from '@chakra-ui/react';

import TextInput from '../form-components/inputs/TextInput';
import DateInput from '../form-components/inputs/DateInput';
import { BiTrash } from 'react-icons/bi';
import AddComponentModal from './AddComponentModal';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { LanguageLevel } from '@/models/response/languageLevelResponse';
import { Language } from '@/models/response/languageResponse';
import SelectLanguage from '../form-components/selectboxes/SelectLanguage';
import SelectLanguageLevel from '../form-components/selectboxes/SelectLanguageLevel';
import useRead from '@/hooks/read/useRead';
import { Course } from '@/models/response/courseResponse';
import useUpdate from '@/hooks/update/useUpdate';
import { MobilityProgrammeRequest } from '@/models/request/mobilityProgrammeRequest';

type MobilityProgramFormLongTermProps = {
  pageName: String;
  pmpID: number;
};
type FormData = {
  mobility_start_date: string;
  mobility_end_date: string;
  language: string;
  language_level: string;
  link_a: string;
  link_b: string;
};
export default function MobilityProgramFormLongTerm({
  pageName,
  pmpID,
}: MobilityProgramFormLongTermProps) {
  const {
    GetTableANotApprovedCoursesForChangeProposals,
    GetTableAApprovedCoursesForChangeProposals,
    GetTableBNotApprovedCoursesForChangeProposals,
    GetTableBApprovedCoursesForChangeProposals,
    GetTotalCourseCreditsForTableA,
    GetTotalCourseCreditsForTableB,
  } = useRead();
  const {
    InsertEmptyRowToProposedMobilityProgramme,
    SavePlannedStartingDateOfMobility,
    SavePlannedEndDateOfMobility,
    SaveProposedMobilityProgramme,
  } = useUpdate();
  //use states
  const [mobilityStartDate, setMobilityStartDate] = useState('');
  const [mobilityEndDate, setMobilityEndDate] = useState('');
  const [language, setLanguage] = useState('');
  const [languageID, setLanguageID] = useState(0);
  const [languageLevel, setLanguageLevel] = useState('');
  const [languageLevelID, setLanguageLevelID] = useState(0);
  const [tableANotApprovedArray, setTableANotApprovedArray] = useState<
    Course[]
  >([]);
  const [tableAApprovedArray, setTableAApprovedArray] = useState<Course[]>([]);
  const [tableBNotApprovedArray, setTableBNotApprovedArray] = useState<
    Course[]
  >([]);
  const [tableBApprovedArray, setTableBApprovedArray] = useState<Course[]>([]);
  const [totalACourseCredits, setTotalACourseCredits] = useState(0);
  const [totalBCourseCredits, setTotalBCourseCredits] = useState(0);
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<FormData>();

  async function handleInsertEmptyRowToProposedMobilityProgramme() {
    const fetchInsertEmptyRowToProposedMobilityProgramme = async () => {
      const requestUrl =
        'https://localhost:5001/spInsertEmptyRowToProposedMobilityProgramme?pmp_id=' +
        pmpID;

      try {
        const result = await InsertEmptyRowToProposedMobilityProgramme(
          requestUrl
        );
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if (pmpID != 0) {
      fetchInsertEmptyRowToProposedMobilityProgramme();
    }
  }

  const handleGetTableANotApprovedCourses = async () => {
    try {
      const courses = await GetTableANotApprovedCoursesForChangeProposals(
        'https://localhost:5001/spGetTableANotApprovedCoursesForChangeProposals?pmp_id=' +
          pmpID
      );
      setTableANotApprovedArray(courses);
    } catch (error) {
      console.error('Error fetching table A courses:', error);
    }
  };

  const handleGetTableBNotApprovedCourses = async () => {
    try {
      const courses = await GetTableBNotApprovedCoursesForChangeProposals(
        'https://localhost:5001/spGetTableBNotApprovedCoursesForChangeProposals?pmp_id=' +
          pmpID
      );
      setTableBNotApprovedArray(courses);
    } catch (error) {
      console.error('Error fetching table B courses:', error);
    }
  };
  const handleGetTableAApprovedCourses = async () => {
    try {
      const courses = await GetTableAApprovedCoursesForChangeProposals(
        'https://localhost:5001/spGetTableAApprovedCoursesForChangeProposals?pmp_id=' +
          pmpID
      );
      setTableAApprovedArray(courses);
    } catch (error) {
      console.error('Error fetching table A courses:', error);
    }
  };

  const handleGetTableBApprovedCourses = async () => {
    try {
      const courses = await GetTableBApprovedCoursesForChangeProposals(
        'https://localhost:5001/spGetTableBApprovedCoursesForChangeProposals?pmp_id=' +
          pmpID
      );
      setTableBApprovedArray(courses);
    } catch (error) {
      console.error('Error fetching table B courses:', error);
    }
  };
  const handleGetTotalCourseCreditsForTableA = async () => {
    try {
      const totalCourseCredits = await GetTotalCourseCreditsForTableA(
        'https://localhost:5001/spGetTotalCourseCreditsForTableA?pmp_id=' +
          pmpID
      );
      setTotalACourseCredits(totalCourseCredits);
    } catch (error) {
      console.error('Error fetching total course credits for Table A:', error);
    }
  };

  const handleGetTotalCourseCreditsForTableB = async () => {
    try {
      const totalCourseCredits = await GetTotalCourseCreditsForTableB(
        'https://localhost:5001/spGetTotalCourseCreditsForTableB?pmp_id=' +
          pmpID
      );
      setTotalBCourseCredits(totalCourseCredits);
    } catch (error) {
      console.error('Error fetching total course credits for Table B:', error);
    }
  };

  const handleSavePlannedStartingDateOfMobility = async (date: string) => {
    try {
      const request = `https://localhost:5001/spSavePlannedStartingDateOfMobility?pmp_id=${pmpID}&plannedStartingDateOfMobility=${date}`;
      await SavePlannedStartingDateOfMobility(request);
      setMobilityStartDate(date);
    } catch (error) {
      console.error('Error saving planned starting date:', error);
    }
  };

  const handleSavePlannedEndDateOfMobility = async (date: string) => {
    try {
      const request = `https://localhost:5001/spSavePlannedEndDateOfMobility?pmp_id=${pmpID}&plannedEndDateOfMobility=${date}`;
      await SavePlannedEndDateOfMobility(request);
      setMobilityEndDate(date);
    } catch (error) {
      console.error('Error saving planned end date:', error);
    }
  };

  const handleSaveProposedMobilityProgrammeA = async (values: FormData) => {
    const { link_a, mobility_start_date, mobility_end_date } = values;

    const request: MobilityProgrammeRequest = {
      pmp_id: pmpID,
      plannedStartingDateOfMobility: mobility_start_date,
      plannedEndDateOfMobility: mobility_end_date,
      receivingInstitutionCourseCatalogueLink: link_a,
      language_id: languageID,
      languageLevel_id: languageLevelID,
      provisionsLinkIfEducationUnsuccessful: '',
    };
    try {
      const result = await SaveProposedMobilityProgramme(request);
      // Handle the result if needed
    } catch (error) {
      console.error('Error saving proposed mobility program:', error);
    }
  };

  const handleSaveProposedMobilityProgrammeB = async (values: FormData) => {
    const { link_b, mobility_start_date, mobility_end_date } = values;

    const request: MobilityProgrammeRequest = {
      pmp_id: pmpID,
      plannedStartingDateOfMobility: mobility_start_date,
      plannedEndDateOfMobility: mobility_end_date,
      receivingInstitutionCourseCatalogueLink: link_b,
      language_id: languageID,
      languageLevel_id: languageLevelID,
      provisionsLinkIfEducationUnsuccessful: '',
    };

    try {
      const result = await SaveProposedMobilityProgramme(request);
      // Handle the result if needed
    } catch (error) {
      console.error('Error saving proposed mobility program:', error);
    }
  };

  useEffect(() => {
    handleGetTableANotApprovedCourses();
    handleGetTableBNotApprovedCourses();
    handleGetTableAApprovedCourses();
    handleGetTableBApprovedCourses();
    handleGetTotalCourseCreditsForTableA(); // Call the new function
    handleGetTotalCourseCreditsForTableB(); // Call the new function
  }, []);

  const onSubmit = (values: FormData) => {
    return new Promise<void>(async (resolve, reject) => {
      await handleInsertEmptyRowToProposedMobilityProgramme();
      await handleSavePlannedStartingDateOfMobility(values.mobility_start_date);
      await handleSavePlannedEndDateOfMobility(values.mobility_end_date);
      await handleSaveProposedMobilityProgrammeA(values);
      await handleSaveProposedMobilityProgrammeB(values);
      try {
        toast({
          title: 'Kayıt Başarılı.',
          description: 'Uzun Dönem Mobilite başarıyla kaydedildi.',
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
        reject(error);
      }
    });
  };

  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.300');

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

  const handleAddComponentA = (component: Course) => {
    const newArray: Course[] = [...tableANotApprovedArray, component];
    setTableANotApprovedArray(newArray);
  };
  const handleDeleteComponentA = (component: Course) => {
    const newArray: Course[] = tableANotApprovedArray.filter(
      (item) => item !== component
    );
    setTableANotApprovedArray(newArray);
  };
  const handleAddComponentB = (component: Course) => {
    const newArray: Course[] = [...tableBNotApprovedArray, component];
    setTableBNotApprovedArray(newArray);
  };
  const handleDeleteComponentB = (component: Course) => {
    const newArray: Course[] = tableBNotApprovedArray.filter(
      (item) => item !== component
    );
    setTableBNotApprovedArray(newArray);
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
              Alıcı Kurumda Çalışılması Planlanılan Komponentler (Dersler) -
              Tablo A
            </Text>
            <AddComponentModal
              placeholder='Ders Ekle +'
              tableType='A'
              pmpID={pmpID}
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
                    <Th>Durumu</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tableAApprovedArray.map((row) => (
                    <Tr key={row.id}>
                      <Td>{row.courseTitle}</Td>
                      <Td>{row.courseCreditType}</Td>
                      <Td>{row.courseCreditValue}</Td>
                      <Td>{row.numberOfTerms}</Td>
                      <Td>{row.totalNumberOfTerms}</Td>
                      <Td>{row.courseCode}</Td>
                      <Td>{row.status}</Td>
                    </Tr>
                  ))}
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
                    <Th>Durumu</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tableANotApprovedArray.map((row) => (
                    <Tr key={row.id}>
                      <Td>
                        <IconButton
                          colorScheme='blue'
                          aria-label='delete button'
                          icon={<BiTrash />}
                          height={8}
                          borderRadius='md'
                          onClick={() => handleDeleteComponentA(row)}
                        />
                      </Td>
                      <Td>{row.courseTitle}</Td>
                      <Td>{row.courseCreditType}</Td>
                      <Td>{row.courseCreditValue}</Td>
                      <Td>{row.numberOfTerms}</Td>
                      <Td>{row.totalNumberOfTerms}</Td>
                      <Td>{row.courseCode}</Td>
                      <Td>{row.status}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>

          <Flex pl={5} gap={4}>
            <Text fontSize={'md'} fontWeight={'bold'} color={HeadingColor}>
              Derslerin Toplam Kredi Değeri:
            </Text>
            <Text>{totalACourseCredits}</Text>
          </Flex>

          <Flex direction={'column'} rowGap={5} pt={'10'} pl={5}>
            <TextInput
              label='Alıcı Kurumdaki Kurs Kataloğu Linki'
              placeholder='www.iyte.edu.tr'
              id='link_a'
              error={errors.link_a?.message}
              register={register('link_a')}
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

        <Flex direction={'column'}>
          <Flex direction={'column'} rowGap={3} p={5}>
            <Text fontSize={'lg'} fontWeight={'bold'} color={HeadingColor}>
              Alıcı Kurumda Çalışılması Planlanılan Komponentler (Dersler) -
              Tablo B
            </Text>
            <AddComponentModal
              placeholder='Ders Ekle +'
              tableType='B'
              pmpID={pmpID}
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
                    <Th>Durumu</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tableBApprovedArray.map((row) => (
                    <Tr key={row.id}>
                      <Td>{row.courseTitle}</Td>
                      <Td>{row.courseCreditType}</Td>
                      <Td>{row.courseCreditValue}</Td>
                      <Td>{row.numberOfTerms}</Td>
                      <Td>{row.totalNumberOfTerms}</Td>
                      <Td>{row.courseCode}</Td>
                      <Td>{row.recognitionConditions}</Td>
                      <Td>{row.status}</Td>
                    </Tr>
                  ))}
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
                    <Th>Durumu</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tableBNotApprovedArray.map((row) => (
                    <Tr key={row.id}>
                      <Td>
                        <IconButton
                          colorScheme='blue'
                          aria-label='delete button'
                          icon={<BiTrash />}
                          height={8}
                          borderRadius='md'
                          onClick={() => handleDeleteComponentB(row)}
                        />
                      </Td>
                      <Td>{row.courseTitle}</Td>
                      <Td>{row.courseCreditType}</Td>
                      <Td>{row.courseCreditValue}</Td>
                      <Td>{row.numberOfTerms}</Td>
                      <Td>{row.totalNumberOfTerms}</Td>
                      <Td>{row.courseCode}</Td>
                      <Td>{row.recognitionConditions}</Td>
                      <Td>{row.status}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>

          <Flex pl={5} gap={4}>
            <Text fontSize={'md'} fontWeight={'bold'} color={HeadingColor}>
              Derslerin Toplam Kredi Değeri:
            </Text>
            <Text>{totalBCourseCredits}</Text>
          </Flex>

          <Flex direction={'column'} rowGap={5} pt={'10'} pl={5}>
            <TextInput
              label='Alıcı Kurumdaki Kurs Kataloğu Linki'
              placeholder='www...'
              id='link_b'
              error={errors.link_b?.message}
              register={register('link_b')}
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
