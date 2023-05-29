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
  tableType?: string;
};

export default function InitialFocus({
  placeHolder,
  tableType,
}: ModalInputProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const HeadingColor = useColorModeValue('gray.800', 'gray.300');

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  console.log('tt', !tableType);
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
                  selectLabel='Dersin Kredi Değeri'
                  placeHolder='test'
                />
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
                <SelectAutoComplete selectLabel='Durumu' placeHolder='test' />
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
