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

import TextInput from '@/components/form-components/inputs/TextInput';
import SignatureInput from '../form-components/inputs/SignatureInput';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type CommitmentSignatureFormProps = {
  pageName: String;
  learningAgreementID: number;
  signatureInfo?: SignatureResponse;
};

type FormData = {
  signature: string;
  sender_signature: string;
  sender_name: string;
  sender_surname: string;
  sender_email: string;
  receiver_signature: string;
  receiver_name: string;
  receiver_surname: string;
  receiver_email: string;
  comment: string;
};

export default function CommitmentSignatureForm({
  pageName,
  learningAgreementID,
  signatureInfo,
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

  const [formValues, setFormValues] = useState<FormData>({
    sender_signature: '',
    sender_name: '',
    sender_surname: '',
    sender_email: '',
    receiver_signature: '',
    receiver_name: '',
    receiver_surname: '',
    receiver_email: '',
    comment: '',
    signature: '',
  });
  const onSubmit = (values: FormData) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
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
              size='md'
              fontWeight={'bold'}
              color={HeadingColor}
            >
              Gönderen Kurum
            </Heading>
            
            <SignatureInput
              id='sender_signature'
              register={register('sender_signature')}
              placeholder='imza'
              label='Sorumlu Kişi İmzası'
              error={errors.sender_signature?.message}
            />
            <TextInput
              id='sender_name'
              label='Sorumlu Kişinin Adı Soyadı'
              placeholder={formValues.sender_name}
              error={errors.sender_name?.message}
              register={register('sender_name')}
            />
            <TextInput
              id='sender_surname'
              label='Mevkisi / Pozisyonu'
              placeholder={formValues.sender_surname}
              error={errors.sender_surname?.message}
              register={register('sender_surname')}
            />
            <TextInput
              id='sender_email'
              label='E-postası'
              placeholder={formValues.sender_email}
              error={errors.sender_email?.message}
              register={register('sender_email')}
            />
          </Stack>

          <Stack w='50%' spacing={4} p='5'>
            <Heading
              as='text'
              size='md'
              fontWeight={'bold'}
              color={HeadingColor}
            >
              Alıcı Kurum
            </Heading>

            <SignatureInput
              id='receiver_signature'
              register={register('receiver_signature')}
              placeholder='imza'
              label='Sorumlu Kişi İmzası'
              error={errors.receiver_signature?.message}
            />
            <TextInput
              id='receiver_name'
              label='Sorumlu Kişinin Adı Soyadı'
              placeholder=''
              error={errors.receiver_name?.message}
              register={register('receiver_name')}
            />
            <TextInput
              id='receiver_surname'
              label='Mevkisi / Pozisyonu'
              placeholder={formValues.receiver_surname}
              error={errors.receiver_surname?.message}
              register={register('receiver_surname')}
            />
            <TextInput
              id='receiver_email'
              label='E-postası'
              placeholder={formValues.receiver_email}
              error={errors.receiver_email?.message}
              register={register('receiver_email')}
            />
            <TextInput
              id='comment'
              label='Alıcı Kurumun Anlaşmayı Neden Onaylamadığını Açıklayan Yorum'
              placeholder={formValues.comment}
              error={errors.comment?.message}
              register={register('comment')}
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
