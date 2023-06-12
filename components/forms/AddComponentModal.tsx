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
import React from 'react';
import SelectAutoComplete from '../form-components/SelectAutoComplete';
import TextInput from '../form-components/inputs/TextInput';
import { useForm } from 'react-hook-form';

type ModalInputProps = {
  placeholder: string;
  tableType?: string;
};
type FormData = {
  course_name: string;
  total_term_count: string;
  course_description?: string;
  credit_type: string;
  term_count: string;
  course_code: string;
  recognition_conditions?: string;
  credit_value: string;
};

export default function InitialFocus({
  placeholder,
  tableType,
}: ModalInputProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const HeadingColor = useColorModeValue('gray.800', 'gray.300');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  function onSubmit(values: FormData) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null));
        resolve();
      });
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    placeholder='ECTS'
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
                    placeholder=''
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
                <Button variant={'autoWidthFull'} mr={3} type='submit'>
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
