import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import TextInput from '@/components/form-components/inputs/TextInput1';
import SignatureInput from '../form-components/inputs/SignatureInput';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type CommitmentSignatureFormProps = {
  pageName: String;
};

type FormData = {
  signature: string;
  personalName: string;
  personalSurname: string;
  personalEposta: string;
  comment: string;
};

export default function CommitmentSignatureForm({
  pageName,
}: CommitmentSignatureFormProps) {
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<FormData>();

  const onSubmit = (values: FormData) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        alert(JSON.stringify(values, null));
        console.log('values: ', values);

        toast({
          title: 'Kayıt Başarılı.',
          description: 'Form başarıyla kaydedildi.',
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
        console.log(error);
        reject(error);
      }
    });
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex>
          <Stack w='50%' spacing={4} p='5' borderRight={'1px solid lightgray'}>
            <Heading
              as='text'
              size='sm'
              fontWeight={'normal'}
              color={HeadingColor}
            >
              Gönderen Kurumdaki Sorumlu Kişinin İmza Bilgileri
            </Heading>
            <SignatureInput
              label='Sorumlu Kişi İmzası'
              name='signature'
            ></SignatureInput>
            <TextInput
              placeHolder='Test Test'
              label='Sorumlu Kişinin Adı Soyadı'
              name='personalName'
            />
            <TextInput
              placeHolder='Test Test'
              label='Mevkisi / Pozisyonu'
              name='personalSurname'
            />
            <TextInput
              placeHolder='test@gmail.com'
              label='E-postası'
              name='personalEposta'
            />
          </Stack>

          <Stack w='50%' spacing={4} p='5'>
            <Heading
              as='text'
              size='sm'
              fontWeight={'normal'}
              color={HeadingColor}
            >
              Alıcı Kurumdaki Sorumlu Kişinin İmza Bilgileri
            </Heading>
            <SignatureInput
              label='Sorumlu Kişi İmzası'
              name='signature'
            ></SignatureInput>
            <TextInput
              placeHolder='Test Test'
              label='Sorumlu Kişinin Adı Soyadı'
              name='personalName'
            />
            <TextInput
              placeHolder='Test Test'
              label='Mevkisi / Pozisyonu'
              name='personalSurname'
            />
            <TextInput
              placeHolder='test@gmail.com'
              label='E-postası'
              name='personalEposta'
            />
            <TextInput
              label='Alıcı Kurumun Anlaşmayı Neden Onaylamadığını Açıklayan Yorum'
              name='comment'
              placeHolder='placeholder..'
            ></TextInput>
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
        <Flex pt={4} justifyContent={'right'}>
          <Button variant='autoWidthFull'>
            Anlaşma Oluşturma Sürecini Tamamla ve Alıcı Kuruma Bildirim Gönder
          </Button>
        </Flex>
      </Box>
    </Stack>
  );
}
