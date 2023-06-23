import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  useDisclosure,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TextInput from '../form-components/inputs/TextInput';
import { useForm } from 'react-hook-form';
import { Course } from '@/models/response/courseResponse';
import useUpdate from '@/hooks/update/useUpdate';
import useCreate from '@/hooks/create/useCreate';
import { CourseRequest } from '@/models/request/courseRequest';
import { VirtualCourseRequest } from '@/models/request/virtualCourseRequest';

type ModalInputProps = {
  placeholder: string;
  tableType?: string;
  pmpID: number;
  onAdd: () => void;
};
type FormData = {
  course_name: string;
  total_term_count: number;
  course_description?: string;
  credit_type: string;
  term_count: number;
  course_code: string;
  recognition_conditions?: string;
  credit_value: number;
};

export default function InitialFocus({
  placeholder,
  tableType,
  pmpID,
  onAdd,
}: ModalInputProps) {
  const { InsertLASelectedCourse, InsertLAVirtualCourse } = useUpdate();
  const { GenerateNewIdForCommitment, GenerateNewIdForVirtualComponent } =
    useCreate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commitmentID, setCommitmentID] = useState(0);
  const [virtualComponentID, setVirtualComponentID] = useState(0);

  const HeadingColor = useColorModeValue('gray.800', 'gray.300');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  async function handleGenerateNewIdForCommitment() {
    try {
      const data = await GenerateNewIdForCommitment(
        'https://localhost:5001/spGenerateNewIdForCommitment'
      );
      if (data !== null && data !== undefined) {
        setCommitmentID(data);
      } else {
        throw new Error('No data received for commitment ID');
      }
    } catch (error) {
      console.error('Error generating commitment ID:', error);
      // Handle error: display an error message to the user or perform other error handling tasks
    }
  }

  async function handleGenerateNewIdForVirtualComponent() {
    const fetchNewIdForVirtualComponent = async () => {
      try {
        const data = await GenerateNewIdForVirtualComponent(
          'https://localhost:5001/spGenerateNewIdForVirtualComponent'
        );
        if (data) {
          console.log('virtual comp id generated ', data);
          setVirtualComponentID(data);
        }
      } catch (error) {
        // Handle error
        console.error('Error generating ID for virtual component:', error);
      }
    };
    fetchNewIdForVirtualComponent();
  }

  useEffect(() => {
    if (tableType === 'C') {
      handleGenerateNewIdForVirtualComponent();
    } else {
      handleGenerateNewIdForCommitment();
    }
  }, []);

  async function handleInsertLASelectedCourse(course: Course) {
    try {
      console.log('tableType:', tableType);
      const request: CourseRequest = {
        courseTitle: course.courseTitle,
        courseCreditType_id: 1,
        courseCreditValue: course.courseCreditValue,
        numberOfTerms: course.numberOfTerms,
        totalNumberOfTerms: course.totalNumberOfTerms,
        courseCode: course.courseCode,
        recognitionConditions: course.recognitionConditions,
        courseShortDescription: course.courseShortDescription,
        isApproved: 0,
        proposedMobilityProgramme_id: pmpID,
        tableType: tableType,
      };

      await InsertLASelectedCourse(request);
      console.log('inserted La selected course pmpID: ', pmpID);
    } catch (error) {
      console.error('Error inserting selected course:', error);
    }
  }
  async function handleInsertLAVirtualCourse(course: Course) {
    try {
      const request: VirtualCourseRequest = {
        courseTitle: course.courseTitle,
        courseCreditType_id: 1,
        courseCreditValue: course.courseCreditValue,
        numberOfTerms: course.numberOfTerms,
        totalNumberOfTerms: course.totalNumberOfTerms,
        courseCode: course.courseCode,
        recognitionConditions: course.recognitionConditions,
        courseShortDescription: course.courseShortDescription,
        isApproved: 0,
        virtualComponent_id: virtualComponentID,
        tableType: 'C',
        proposedMobilityProgramme_id: pmpID,
      };

      await InsertLAVirtualCourse(request);
      console.log(
        'inserted LA virtual course virtualComponentID: ',
        virtualComponentID
      );
    } catch (error) {
      console.error('Error inserting virtual course:', error);
    }
  }

  function onSubmitAdd(values: FormData) {
    return new Promise<void>(async (resolve) => {
      const result: Course = {
        id: tableType === 'C' ? virtualComponentID : commitmentID,
        courseCreditType: 'ECTS',
        courseTitle: values.course_name,
        courseCreditValue: values.credit_value,
        numberOfTerms: values.term_count,
        totalNumberOfTerms: values.total_term_count,
        courseCode: values.course_code,
        status: 'inserted',
        recognitionConditions: values.recognition_conditions ?? ' ',
        courseShortDescription: values.course_description ?? '',
      };
      console.log('pmp id', pmpID);
      console.log('commitmentID', commitmentID);
      console.log('Course', result);
      if (tableType === 'C') {
        console.log('table C');

        await handleInsertLAVirtualCourse(result);
      } else {
        await handleInsertLASelectedCourse(result);
      }
      onAdd();
      resolve();
      reset();
      onClose();
    });
  }

  return (
    <>
      <Button variant='autoWidthFull' width={150} onClick={onOpen}>
        {placeholder}
      </Button>

      <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={HeadingColor}>Yeni Ders Ekle</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={3}>
            <form>
              <Flex gap={5}>
                <Stack w={'50%'}>
                  <TextInput
                    label='Dersin Adı'
                    id='course_name'
                    placeholder=''
                    error={errors.course_name?.message}
                    register={register('course_name')}
                  />

                  <TextInput
                    id='credit_value'
                    placeholder=''
                    label='Dersin Kredi Değeri'
                    error={errors.credit_value?.message}
                    register={register('credit_value')}
                  />

                  <TextInput
                    id='total_term_count'
                    placeholder=''
                    label='Toplam Eğitim Dönemi Sayısı'
                    error={errors.total_term_count?.message}
                    register={register('total_term_count')}
                  />

                  {(tableType === 'C' || !tableType) && (
                    <TextInput
                      id='course_description'
                      placeholder=''
                      label='Dersi Tanımlayan Kısa Açıklama'
                      error={errors.course_description?.message}
                      register={register('course_description')}
                    />
                  )}
                </Stack>
                <Stack w={'50%'}>
                  <TextInput
                    id='credit_type'
                    placeholder='ECTS'
                    label='Dersin Kredi Tipi'
                    error={errors.credit_type?.message}
                    register={register('credit_type')}
                  />

                  <TextInput
                    id='term_count'
                    placeholder=''
                    label='Eğitim Dönemi Sayısı'
                    error={errors.term_count?.message}
                    register={register('term_count')}
                  />

                  <TextInput
                    id='course_code'
                    placeholder=''
                    label='Dersin Kodu'
                    error={errors.course_code?.message}
                    register={register('course_code')}
                  />

                  {tableType !== 'A' && (
                    <TextInput
                      id='recognition_conditions'
                      placeholder=''
                      label='Dersin Tanınma Koşulları'
                      error={errors.recognition_conditions?.message}
                      register={register('recognition_conditions')}
                    />
                  )}
                </Stack>
              </Flex>
              <ModalFooter mt={2}>
                <Button
                  variant={'autoWidthFull'}
                  mr={3}
                  onClick={handleSubmit(onSubmitAdd)}
                >
                  Kaydet
                </Button>
                <Button variant={'clear'} type='reset'>
                  İptal
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
