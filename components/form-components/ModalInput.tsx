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
import SelectAutoComplete from './SelectAutoComplete';
import TextInput from './TextInput';

type ModalInputProps = {
  placeHolder: string;
};

export default function InitialFocus({ placeHolder }: ModalInputProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const HeadingColor = useColorModeValue('gray.800', 'gray.300');

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

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
            <Flex gap={5}>
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
              </Stack>
              <Stack gap={2}>
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
            </Flex>
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
