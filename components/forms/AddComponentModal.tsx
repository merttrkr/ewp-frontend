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
import { CourseRequest } from '@/models/request/courseRequest';

type ModalInputProps = {
  placeholder: string;
  tableType?: string;
  pmpID: number;
  virtualComponentID?: number;
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
  virtualComponentID,
  onAdd,
}: ModalInputProps) {
  const { InsertLASelectedCourse, InsertLAVirtualCourse } = useUpdate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const HeadingColor = useColorModeValue('gray.800', 'gray.300');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  async function handleInsertLASelectedCourse(course: FormData) {
    try {
      console.log('tableType:', tableType);
      const request: CourseRequest = {
        courseTitle: course.course_name,
        courseCreditType_id: 1,
        courseCreditValue: course.credit_value,
        numberOfTerms: course.term_count,
        totalNumberOfTerms: course.total_term_count,
        courseCode: course.course_code,
        recognitionConditions: course.recognition_conditions,
        courseShortDescription: course.course_description,
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
  async function handleInsertLAVirtualCourse(course: FormData) {
    try {
      console.log('virtualComponentID before insert : ', virtualComponentID);
      const request: CourseRequest = {
        courseTitle: course.course_name,
        courseCreditType_id: 1,
        courseCreditValue: course.credit_value,
        numberOfTerms: course.term_count,
        totalNumberOfTerms: course.total_term_count,
        courseCode: course.course_code,
        recognitionConditions: course.recognition_conditions ?? '',
        courseShortDescription: course.recognition_conditions ?? '',
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
      if (tableType === 'C') {
        console.log('table C');
        await handleInsertLAVirtualCourse(values);
      } else {
        await handleInsertLASelectedCourse(values);
      }
      onAdd();
      resolve();
      reset();
      onClose();
    });
  }

  return (
    <>
      <Button variant='autoWidthFull' onClick={onOpen}>
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
                    register={
                      (register('course_name'),
                      {
                        required: 'This is required',
                      })
                    }
                  />

                  <TextInput
                    id='credit_value'
                    placeholder=''
                    label='Dersin Kredi Değeri'
                    error={errors.credit_value?.message}
                    register={
                      (register('credit_value'),
                      {
                        required: 'This is required',
                      })
                    }
                  />

                  <TextInput
                    id='total_term_count'
                    placeholder=''
                    label='Toplam Eğitim Dönemi Sayısı'
                    error={errors.total_term_count?.message}
                    register={
                      (register('total_term_count'),
                      {
                        required: 'This is required',
                      })
                    }
                  />

                  {(tableType === 'C' || !tableType) && (
                    <TextInput
                      id='course_description'
                      placeholder=''
                      label='Dersi Tanımlayan Kısa Açıklama'
                      error={errors.course_description?.message}
                      register={
                        (register('course_description'),
                        {
                          required: 'This is required',
                        })
                      }
                    />
                  )}
                </Stack>
                <Stack w={'50%'}>
                  <TextInput
                    id='credit_type'
                    placeholder='ECTS'
                    label='Dersin Kredi Tipi'
                    error={errors.credit_type?.message}
                    register={
                      (register('credit_type'),
                      {
                        required: 'This is required',
                      })
                    }
                  />

                  <TextInput
                    id='term_count'
                    placeholder=''
                    label='Eğitim Dönemi Sayısı'
                    error={errors.term_count?.message}
                    register={
                      (register('term_count'),
                      {
                        required: 'This is required',
                      })
                    }
                  />

                  <TextInput
                    id='course_code'
                    placeholder=''
                    label='Dersin Kodu'
                    error={errors.course_code?.message}
                    register={
                      (register('course_code'),
                      {
                        required: 'This is required',
                      })
                    }
                  />

                  {tableType !== 'A' && (
                    <TextInput
                      id='recognition_conditions'
                      placeholder=''
                      label='Dersin Tanınma Koşulları'
                      error={errors.recognition_conditions?.message}
                      register={
                        (register('recognition_conditions'),
                        {
                          required: 'This is required',
                        })
                      }
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
