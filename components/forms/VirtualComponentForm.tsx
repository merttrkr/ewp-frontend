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

import AddComponentModal from './AddComponentModal';
import { BiTrash } from 'react-icons/bi';
import { LanguageLevel } from '@/models/response/languageLevelResponse';
import { Language } from '@/models/response/languageResponse';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SelectLanguage from '../form-components/selectboxes/SelectLanguage';
import SelectLanguageLevel from '../form-components/selectboxes/SelectLanguageLevel';
import useRead from '@/hooks/read/useRead';
import useUpdate from '@/hooks/update/useUpdate';
import { Course } from '@/models/response/courseResponse';
import useDelete from '@/hooks/delete/useDelete';
import useCreate from '@/hooks/create/useCreate';

type VirtualComponentFormProps = {
  pageName: String;
  pmpID: number;
  learningAgreementID: number;
  virtualComponentID: number;
};
type FormData = {
  link: string;
  mobility_start_date: string;
  mobility_end_date: string;
  language: string;
  language_level: string;
};
export default function VirtualComponentForm({
  virtualComponentID,
  pageName,
  pmpID,
  learningAgreementID,
}: VirtualComponentFormProps) {
  const {
    GetTableCApprovedCoursesForChangeProposals,
    GetTableCNotApprovedCoursesForChangeProposals,
    GetTotalCourseCreditsForTableC,
  } = useRead();
  const {
    InsertEmptyRowToVirtualComponent,
    SaveVirtualComponent,
    SaveVirtualComponentIdToLearningAgreementTable,
    SaveLanguageId,
    SaveLanguageLevelId,
    SavePlannedStartingDateOfMobility,
    SavePlannedEndDateOfMobility,
  } = useUpdate();

  const { RemoveVirtualCourseById } = useDelete();
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.300');
  //usestates

  const [language, setLanguage] = useState('');
  const [languageID, setLanguageID] = useState(0);
  const [languageLevel, setLanguageLevel] = useState('');
  const [languageLevelID, setLanguageLevelID] = useState(0);
  const [addControl, setAddControl] = useState(0);
  const [deleteControl, setDeleteControl] = useState(0);
  const [tableCNotApprovedArray, setTableCNotApprovedArray] = useState<
    Course[]
  >([]);
  const [tableCApprovedArray, setTableCApprovedArray] = useState<Course[]>([]);
  const [totalCCourseCredits, setTotalCCourseCredits] = useState(0);

  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<FormData>();
  // save mobility dates
  const handleSavePlannedStartingDateOfMobility = async (date: string) => {
    try {
      const request = `https://localhost:5001/spSavePlannedStartingDateOfMobility?pmp_id=${pmpID}&plannedStartingDateOfMobility=${date}`;
      await SavePlannedStartingDateOfMobility(request);
    } catch (error) {
      console.error('Error saving planned starting date:', error);
    }
  };

  const handleSavePlannedEndDateOfMobility = async (date: string) => {
    try {
      const request = `https://localhost:5001/spSavePlannedEndDateOfMobility?pmp_id=${pmpID}&plannedEndDateOfMobility=${date}`;
      await SavePlannedEndDateOfMobility(request);
    } catch (error) {
      console.error('Error saving planned end date:', error);
    }
  };
  //save language
  const handleSaveLanguageId = async () => {
    try {
      const request =
        `https://localhost:5001/spSaveLanguageId?pmp_id=${pmpID}&language_id=` +
        languageID;
      await SaveLanguageId(request);
    } catch (error) {
      console.error('Error saving lang id:', error);
    }
  };

  const handleSaveLanguageLevelId = async () => {
    try {
      const request =
        `https://localhost:5001/spSaveLanguageLevelId?pmp_id='+${pmpID}+'&languageLevel_id=` +
        languageLevelID;
      await SaveLanguageLevelId(request);
    } catch (error) {
      console.error('Error saving lang level id:', error);
    }
  };

  async function handleRemoveVirtualCoursesById(courseId: number) {
    const fetchRemoveVirtualCoursesById = async () => {
      const requestUrl =
        'https://localhost:5001/spRemoveVirtualCoursesById?virtualCourse_id=' +
        courseId;
      try {
        await RemoveVirtualCourseById(requestUrl);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if (courseId != 0) {
      fetchRemoveVirtualCoursesById();
    }
  }
  async function handleInsertEmptyRowToVirtualComponent() {
    const fetchInsertEmptyRowToVirtualComponent = async () => {
      const requestUrl =
        'https://localhost:5001/spInsertEmptyRowToVirtualComponent?virtualComponent_id=' +
        virtualComponentID;

      try {
        await InsertEmptyRowToVirtualComponent(requestUrl);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if (virtualComponentID != 0) {
      fetchInsertEmptyRowToVirtualComponent();
    }
  }

  const handleGetTableCNotApprovedCourses = async () => {
    try {
      const courses = await GetTableCNotApprovedCoursesForChangeProposals(
        'https://localhost:5001/spGetTableCNotApprovedCoursesForChangeProposals?virtualComponent_id=' +
          virtualComponentID
      );
      setTableCNotApprovedArray(courses);
    } catch (error) {
      console.error('Error fetching table C courses:', error);
    }
  };

  const handleGetTableCApprovedCourses = async () => {
    try {
      const courses = await GetTableCApprovedCoursesForChangeProposals(
        'https://localhost:5001/spGetTableCApprovedCoursesForChangeProposals?pmp_id=' +
          pmpID
      );
      setTableCApprovedArray(courses);
    } catch (error) {
      console.error('Error fetching table C courses:', error);
    }
  };
  const handleGetTotalCourseCreditsForTableC = async () => {
    try {
      const totalCredits = await GetTotalCourseCreditsForTableC(
        'https://localhost:5001/spGetTotalCourseCreditsForTableC?pmp_id=' +
          pmpID
      );
      setTotalCCourseCredits(totalCredits);
    } catch (error) {
      console.error('Error fetching total course credits for Table C:', error);
    }
  };

  async function handleSaveVirtualComponent() {
    const fetchSaveVirtualComponent = async () => {
      const requestUrl =
        'https://localhost:5001/spSaveVirtualComponent?virtualComponent_id=' +
        virtualComponentID;

      try {
        const result = await SaveVirtualComponent(requestUrl);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if (virtualComponentID != 0) {
      fetchSaveVirtualComponent();
    }
  }
  async function handleSaveVirtualComponentIdToLearningAgreementTable() {
    const fetchSaveVirtualComponentIdToLearningAgreementTable = async () => {
      const requestUrl =
        'https://localhost:5001/spSaveVirtualComponentIdToLearningAgreementTable?virtualComponent_id=' +
        virtualComponentID +
        '&learningAgreement_id=' +
        learningAgreementID;
      try {
        const result = await SaveVirtualComponentIdToLearningAgreementTable(
          requestUrl
        );
        console.log(
          'Saved virtual comp to la  virtual comp id: ' + virtualComponentID
        );
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if (virtualComponentID != 0) {
      fetchSaveVirtualComponentIdToLearningAgreementTable();
    }
  }

  useEffect(() => {
    handleInsertEmptyRowToVirtualComponent();
    handleSaveVirtualComponent();
    handleSaveVirtualComponentIdToLearningAgreementTable();
    handleGetTableCNotApprovedCourses();
    handleGetTableCApprovedCourses();
    handleGetTotalCourseCreditsForTableC();
  }, [virtualComponentID]);

  useEffect(() => {
    //when you add or delete
    handleGetTableCNotApprovedCourses();
    handleGetTotalCourseCreditsForTableC();
  }, [addControl, deleteControl]);

  const handleDeleteComponent = (component: Course) => {
    handleRemoveVirtualCoursesById(component.id);
    setDeleteControl((prevAddControl) => prevAddControl + 1);
  };

  const onSubmit = async (values: FormData) => {
    await handleSavePlannedStartingDateOfMobility(values.mobility_start_date);
    await handleSavePlannedEndDateOfMobility(values.mobility_end_date);
    await handleSaveLanguageId();
    await handleSaveLanguageLevelId();
    return new Promise<void>(async (resolve, reject) => {
      try {
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
        reject(error);
      }
    });
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex direction={'column'}>
          <Flex direction={'column'} rowGap={3} p={5}>
            <Text fontSize={'lg'} fontWeight={'bold'} color={HeadingColor}>
              Alıcı Kurumda Çalışılması Planlanılan Komponentler (Dersler) -
              Tablo C
            </Text>
            <AddComponentModal
              placeholder='Ders Ekle +'
              tableType='C'
              onAdd={() => {
                setAddControl((prevAddControl) => prevAddControl + 1);
              }}
              pmpID={pmpID}
              virtualComponentID={virtualComponentID}
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
                  {tableCApprovedArray.map((row) => (
                    <Tr key={row.id}>
                      <Td>{row.courseTitle}</Td>
                      <Td>{row.courseCreditType}</Td>
                      <Td>{row.courseCreditValue}</Td>
                      <Td>{row.numberOfTerms}</Td>
                      <Td>{row.totalNumberOfTerms}</Td>
                      <Td>{row.courseCode}</Td>
                      <Td>{row.recognitionConditions}</Td>
                      <Td>{row.courseShortDescription}</Td>
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
                    <Th>Dersi Tanımlayan Kısa Açıklama</Th>
                    <Th>Durumu</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tableCNotApprovedArray.map((row) => (
                    <Tr key={row.id}>
                      <Td>
                        <IconButton
                          colorScheme='blue'
                          aria-label='delete button'
                          icon={<BiTrash />}
                          height={8}
                          borderRadius='md'
                          onClick={() => handleDeleteComponent(row)}
                        />
                      </Td>
                      <Td>{row.courseTitle}</Td>
                      <Td>{row.courseCreditType}</Td>
                      <Td>{row.courseCreditValue}</Td>
                      <Td>{row.numberOfTerms}</Td>
                      <Td>{row.totalNumberOfTerms}</Td>
                      <Td>{row.courseCode}</Td>
                      <Td>{row.recognitionConditions}</Td>
                      <Td>{row.courseShortDescription}</Td>
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
            <Text>{totalCCourseCredits}</Text>
          </Flex>
        </Flex>
        <Flex justify={'right'} gap={2}>
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
