import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import TextInput from '@/components/form-components/inputs/TextInput';
import DateInput from '../form-components/inputs/DateInput';
import SelectISCED from '../form-components/selectboxes/SelectISCED';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { SubjectArea } from '@/models/response/subjectAreaResponse';
import SelectEducationTypeAndLevel from '../form-components/selectboxes/SelectEducationTypeAndLevel';
import { EducationTypeAndLevel } from '@/models/response/educationTypeAndLevelResponse';
import getFormattedDate from '@/helper/currentDate';
import SelectNationality from '../form-components/selectboxes/SelectNationality';
import { Nationality } from '@/models/response/nationalityResponse';
import { MobilityType } from '@/models/response/mobilityTypeResponse';
import SelectMobilityTypes from '../form-components/selectboxes/SelectMobilityTypes';
import SelectGender from '../form-components/selectboxes/SelectGender';
import { Gender } from '@/models/response/genderResponse';
import useUpdate from '@/hooks/update/useUpdate';
import { StudentInfoRequest } from '@/models/request/studentInfoRequest';
import { StudentInfoResponse } from '@/models/response/studentInfoResponse';

type StudentInformationFormProps = {
  pageName: String;
  omobilityId: string;
  mobilityType: string;
  mobilityTypeId: number;
  studentInfoId: number;
  studentInfo: StudentInfoResponse | undefined;
  learningAgreementID: number;
};
type FormData = {
  education_type_and_level: string;
  isced_code_and_fields: string;
  nationality: string;
  mobility_type: string;
  omobility_id: string;
  gender: string;
  student_name: string;
  isced_explanation: string;
  eur_student_identifier: string;
  student_surname: string;
  student_email: string;
  student_birthdate: string;
};

export default function StudentInformationForm({
  studentInfo,
  pageName,
  omobilityId,
  mobilityType,
  mobilityTypeId,
  studentInfoId,
  learningAgreementID,
}: StudentInformationFormProps) {
  //useForm hook
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<FormData>();
  const {
    InsertEmptyRowToStudentInfo,
    SaveStudentInfo,
    SaveStudentInfoIdToLearningAgreementTable,
  } = useUpdate();
  //color
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const toast = useToast();
  //filed states
  const [ISCEDCodeAndFields, setISCEDCodeAndFields] = useState('');
  const [ISCEDCodeAndFieldsID, setISCEDCodeAndFieldsID] = useState(0);
  const [educationTypeAndLevel, setEducationTypeAndLevel] = useState('');
  const [educationTypeAndLevelID, setEducationTypeAndLevelID] = useState(0);
  const [selectedNationality, setSelectedNationality] = useState('');
  const [selectedNationalityID, setSelectedNationalityID] = useState(0);
  const [selectedMobilityType, setSelectedMobilityType] = useState('');
  const [selectedMobilityTypeID, setSelectedMobilityTypeID] = useState(0);
  const [gender, setGender] = useState('');
  const [genderID, setGenderID] = useState(0);
  const [studentBirthdate, setStudentBirthdate] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentSurname, setStudentSurname] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [eurStudentIdentifier, setEurStudentIdentifier] = useState('');
  const [iscedExplanation, setIscedExplanation] = useState('');
  const [omobility_id, setOmobility_id] = useState('');
  const [mobility_type, setMobility_type] = useState('');
  const [mobility_type_id, setMobility_type_id] = useState(0);
  const [subjectAreaId, setSubjectAreaId] = useState(0);

  async function handleSaveStudentInfoIdToLearningAgreementTable() {
    const fetchSaveStudentInfoIdToLearningAgreementTable = async () => {
      const url =
        'https://localhost:5001/spSaveStudentInfoIdToLearningAgreementTable?studentInfo_id=' +
        studentInfoId +
        '&learningAgreement_id=' +
        learningAgreementID;
      try {
        await SaveStudentInfoIdToLearningAgreementTable(url);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    if (studentInfoId !== 0 && learningAgreementID !== 0) {
      fetchSaveStudentInfoIdToLearningAgreementTable();
    }
  }

  async function handleInsertEmptyRowToStudentInfo() {
    const insertEmptyRowToStudentInfo = async () => {
      const url =
        'https://localhost:5001/spInsertEmptyRowToStudentInfo?studentInfo_id=' +
        studentInfoId +
        '&mobilityType_id=' +
        mobilityTypeId;
      try {
        await InsertEmptyRowToStudentInfo(url);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    if (
      studentInfoId &&
      studentInfoId !== 0 &&
      mobilityTypeId &&
      mobilityTypeId !== 0
    ) {
      insertEmptyRowToStudentInfo();
    }
  }

  async function handleSaveStudentInfo(values: FormData) {
    const saveStudentInfo = async () => {
      const request: StudentInfoRequest = {
        studentInfo_id: studentInfoId,
        mobilityType_id: mobilityTypeId,
        name: values.student_name,
        surname: values.student_surname,
        gender_id: genderID,
        nationality_id: selectedNationalityID,
        birthdate: studentBirthdate,
        educationTypeAndLevel_id: educationTypeAndLevelID,
        email: values.student_email,
        subjectArea_id: ISCEDCodeAndFieldsID,
        subjectAreaDescription: values.isced_explanation,
        global_id: values.eur_student_identifier,
        omobility_id: omobilityId,
      };

      await SaveStudentInfo(request);
    };

    saveStudentInfo();
  }

  useEffect(() => {
    handleInsertEmptyRowToStudentInfo().then(() =>
      handleSaveStudentInfoIdToLearningAgreementTable()
    );
  }, [studentInfoId]);

  //submit
  function onSubmit(values: FormData) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await handleSaveStudentInfo(values);
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
  }

  const handleSelectChangeMobilityType = (value: MobilityType | null) => {
    if (value) {
      setValue('mobility_type', value.mobilityType);
      setSelectedMobilityType(value.mobilityType);
      setSelectedMobilityTypeID(value.id);
    } else {
      setValue('mobility_type', ''); // or any default value you want
      setSelectedMobilityType('');
    }
  };

  const handleSelectChangeNationality = (value: Nationality | null) => {
    if (value) {
      setValue('nationality', value.nationality);
      setSelectedNationality(value.nationality);
      setSelectedNationalityID(value.id);
    } else {
      setValue('nationality', ''); // or any default value you want
      setSelectedNationality('');
    }
  };
  const handleISCEDchange = (value: SubjectArea | null) => {
    if (value) {
      setValue('isced_code_and_fields', value.subjectArea);
      setISCEDCodeAndFields(value.subjectArea);
      setISCEDCodeAndFieldsID(value.subjectAreaId);
    } else {
      setValue('isced_code_and_fields', '');
      setISCEDCodeAndFields(''); // or any default value you want
    }
  };

  const handleEducationTypeAndLevelChange = (
    value: EducationTypeAndLevel | null
  ) => {
    if (value) {
      setValue('education_type_and_level', value.educationTypeAndLevel);
      setEducationTypeAndLevel(value.educationTypeAndLevel);
      setEducationTypeAndLevelID(value.educationTypeAndLevel_id);
    } else {
      setValue('education_type_and_level', '');
      setEducationTypeAndLevel(''); // or any default value you want
    }
  };

  const handleGenderChange = (value: Gender | null) => {
    if (value) {
      setValue('gender', value.genderName);
      setGender(value.genderName);
      setGenderID(value.id);
    } else {
      setValue('gender', ''); // or any default value you want
      setGender('');
    }
  };

  const handleStudentBirthdateChange = (value: string) => {
    if (value !== '') {
      setValue('student_birthdate', value); // You can format the date value as needed
      setStudentBirthdate(value);
    } else {
      setValue('student_birthdate', ''); // or any default value you want
      setStudentBirthdate('');
    }
  };
  useEffect(() => {
    if (studentInfo != undefined && Object.keys(studentInfo).length !== 0) {
      setValue('student_name', studentInfo.name);
      setValue('student_surname', studentInfo.surname);
      setValue('student_email', studentInfo.email);
      setValue('eur_student_identifier', studentInfo.globalId);
      setValue('isced_explanation', studentInfo.subjectAreaDescription);
      setValue('student_birthdate', studentInfo.birthdate?.split('T')[0]);
      setValue('omobility_id', studentInfo.omobility_id);
      setEducationTypeAndLevelID(studentInfo.educationTypeAndLevel_id);
      setGenderID(studentInfo.gender_id);
      setStudentBirthdate(studentInfo.birthdate?.split('T')[0]);
      setValue('omobility_id', omobilityId);
      setOmobility_id(omobilityId);
      setSelectedNationalityID(studentInfo.nationality_id);
      setSubjectAreaId(studentInfo.subjectArea_id);
    }
  }, [studentInfo]);

  return (
    <Stack
      marginBottom='20'
      px={[2, 6]} // Responsive padding on small and larger screens
      py='3'
      w='100%'
      bg={HeaderBackground}
      marginLeft={0}
      borderBottom='1px'
      borderColor={BorderColor}
      borderRadius={'xl'}
    >
      <Box pl={[2, 6]} py={4}>
        <Heading as='h3' size='md' fontWeight={'medium'} color={HeadingColor}>
          {pageName}
        </Heading>
      </Box>

      <Box
        as={'form'}
        mt={10}
        boxShadow={'lg'}
        padding={[2, 5]}
        bg={FormBackground}
        borderRadius={'xl'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex w={'100%'} p={[2, 5]}>
          <SelectMobilityTypes
            inputValue={mobilityTypeId}
            isDisabled
            selectLabel='Seçilmiş Hareketlilik (Mobilite) Tipi'
            placeholder={mobilityType}
            register={register('mobility_type')} // Replace with your form registration method
            onChange={handleSelectChangeMobilityType}
            error={errors.mobility_type?.message} // Replace with your form error handling
          />
        </Flex>

        <Flex flexWrap={['wrap', null, 'nowrap']}>
          <Stack w={['100%', '50%']} spacing={4} p={[2, 5]}>
            <TextInput
              id='omobility_id'
              label='Omobility Id'
              placeholder={omobilityId}
              isDisabled
              error={errors.omobility_id?.message}
              register={register('omobility_id')}
            />
            <TextInput
              id='student_name'
              placeholder=''
              label='Öğrencinin İsmi'
              error={errors.student_name?.message}
              register={register('student_name')}
            />

            <SelectGender
              inputValue={genderID}
              id='gender'
              error={errors.gender?.message}
              register={register('gender')}
              placeholder={gender}
              selectLabel='Öğrencinin Cinsiyeti'
              onChange={handleGenderChange}
            ></SelectGender>

            <DateInput
              id='student_birthdate'
              register={register('student_birthdate')}
              placeholder={studentBirthdate}
              label='Öğrencinin Doğum Tarihi'
              onChange={handleStudentBirthdateChange}
              error={errors.student_birthdate?.message}
            />

            <TextInput
              placeholder={studentEmail}
              label='Öğrencinin E-postası'
              id='student_email'
              error={errors.student_email?.message}
              register={register('student_email')}
            />
            <SelectISCED
              inputValue={subjectAreaId}
              id='isced_code_and_fields'
              error={errors.isced_code_and_fields?.message}
              register={register('isced_code_and_fields')}
              placeholder={ISCEDCodeAndFields}
              selectLabel='ISCED Kodu ve Konu Alanları'
              onChange={handleISCEDchange}
            ></SelectISCED>
          </Stack>
          <Stack w={['100%', '50%']} spacing={4} p={[2, 5]}>
            <TextInput
              placeholder=''
              label='Öğrencinin Soy İsmi'
              id='student_surname'
              error={errors.student_surname?.message}
              register={register('student_surname')}
            />
            <SelectNationality
              inputValue={selectedNationalityID}
              id='nationality'
              error={errors.nationality?.message}
              register={register('nationality', {
                required: 'This is required',
              })}
              selectLabel='Öğrencinin Ulusu'
              placeholder={selectedNationality}
              onChange={handleSelectChangeNationality}
            />
            <SelectEducationTypeAndLevel
              inputValue={educationTypeAndLevelID}
              id='education_type_and_level'
              register={register('education_type_and_level', {
                required: 'This is required',
              })}
              placeholder={educationTypeAndLevel}
              selectLabel='Öğrenim Seviyesi'
              onChange={handleEducationTypeAndLevelChange}
              error={errors.education_type_and_level?.message}
            ></SelectEducationTypeAndLevel>
            <TextInput
              placeholder={eurStudentIdentifier}
              id='eur_student_identifier'
              label='European Student Identifier'
              error={errors.eur_student_identifier?.message}
              register={register('eur_student_identifier', {
                required: 'This is required',
              })}
            />
            <TextInput
              placeholder=''
              label='ISCED Explanation'
              id='isced_explanation'
              error={errors.isced_explanation?.message}
              register={register('isced_explanation', {
                required: 'This is required',
              })}
            />
          </Stack>
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
