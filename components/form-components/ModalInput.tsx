import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import SelectAutoComplete from './SelectAutoComplete';
import TextInput from './TextInput';

type ModalInputProps = {
  placeHolder: string;
};

export default function InitialFocus({ placeHolder }: ModalInputProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const HeadingColor = useColorModeValue('gray.600', 'gray.300');

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button variant='autoWidthFull' onClick={onOpen}>
        {placeHolder}
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent p={5}>
          <ModalHeader color={HeadingColor}>
            Yeni Bir Ders Ekleme Ekranı
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={3}>
            <Stack gap={2}>
              <TextInput
                name='firstname'
                placeHolder='Mert Türker'
                label='Dersin Adı'
              />
              <SelectAutoComplete
                selectLabel='Dersin Ait olduğu Kredi Tipi'
                placeHolder='test'
              />
              <TextInput
                name='firstname'
                placeHolder='Mert Türker'
                label='Dersin Tanımlı Kredi Değeri'
              />
              <TextInput
                name='firstname'
                placeHolder='Mert Türker'
                label='Toplam Eğitim Dönemi Sayısı'
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
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant={'autoWidthFull'} mr={3}>
              Kaydet
            </Button>
            <Button variant={'clear'}>İptal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}