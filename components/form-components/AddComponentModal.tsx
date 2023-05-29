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
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import SelectAutoComplete from './SelectAutoComplete';
import TextInput from './TextInput';
import TextInput2 from './TextInput2';
import { useForm } from 'react-hook-form';

type ModalInputProps = {
  placeHolder: string;
  tableType?: string;
};
type FormData = {
  name: string;
  courseName: string;
};

export default function InitialFocus({
  placeHolder,
  tableType,
}: ModalInputProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const HeadingColor = useColorModeValue('gray.800', 'gray.300');

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

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
        {placeHolder}
      </Button>

      <Modal
        size={'xl'}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={HeadingColor}>Yeni Ders Ekle</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={3}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex gap={5}>
                <Stack gap={2}>
                  <TextInput2
                    label='Dersin Adı'
                    id='courseName'
                    placeholder=''
                    error={errors.courseName?.message}
                    register={register('courseName', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                  />
                  <SelectAutoComplete
                    selectLabel='Dersin Kredi Değeri'
                    placeHolder='test' register={undefined}                  />
                  <TextInput
                    name='firstname'
                    placeHolder='Mert Türker'
                    label='Toplam Eğitim Dönemi Sayısı'
                  />
                  {(tableType === 'C' || !tableType) && (
                    <TextInput
                      name='firstname'
                      placeHolder='Mert Türker'
                      label='Dersi Tanımlayan Kısa Açıklama'
                    />
                  )}
                  <SelectAutoComplete selectLabel='Durumu' placeHolder='test' register={undefined} />
                </Stack>
                <Stack gap={2}>
                  <TextInput
                    name='firstname'
                    placeHolder='Mert Türker'
                    label='Dersin Kredi Tipi'
                  />

                  <TextInput
                    name='firstname'
                    placeHolder='Mert Türker'
                    label='Eğitim Dönemi Sayısı'
                  />
                  <TextInput
                    name='firstname'
                    placeHolder='Mert Türker'
                    label='Dersin Kodu'
                  />

                  {tableType !== 'A' && (
                    <TextInput
                      name='firstname'
                      placeHolder='Mert Türker'
                      label='Dersin Tanınma Koşulları'
                    />
                  )}
                </Stack>
              </Flex>
              <ModalFooter>
                <Button variant={'autoWidthFull'} mr={3} type='submit'>
                  Kaydet
                </Button>
                <Button variant={'clear'}>İptal</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
