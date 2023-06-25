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
import { set, useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import { createCanvas, CanvasRenderingContext2D } from 'canvas';
import useUpdate from '@/hooks/update/useUpdate';

type CommitmentSignatureFormProps = {
  pageName: String;
  learningAgreementID: number;
  signatureInfo?: SignatureResponse;
  commitmentID: number;
};

type FormData = {
  student_signature: string;
  sender_name: string;
  sender_position: string;
  sender_email: string;
  receiver_signature: string | null;
  receiver_name: string | null;
  receiver_position: string | null;
  receiver_email: string | null;
  comment: string | null;
};

export default function CommitmentSignatureForm({
  pageName,
  learningAgreementID,
  signatureInfo,
  commitmentID,
}: CommitmentSignatureFormProps) {
  const { SaveCommitmentIdToLearningAgreementTable } = useUpdate();
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const [studentSignature, setStudentSignature] = useState<string>(
    textToBase64Image(' ')
  );
  const [receiverSignature, setReceiverSignature] = useState<string>(
    textToBase64Image(' ')
  );
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<FormData>();
  async function handleSaveCommitmentIdToLearningAgreementTable() {
    const fetchSaveCommitmentIdToLearningAgreementTable = async () => {
      await SaveCommitmentIdToLearningAgreementTable(
        'https://localhost:5001/spSaveCommitmentIdToLearningAgreementTable?commitment_id=' +
          commitmentID +
          '&learningAgreement_id=' +
          learningAgreementID
      );
    };
    fetchSaveCommitmentIdToLearningAgreementTable();
  }
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

  useEffect(() => {
    if (signatureInfo != undefined && Object.keys(signatureInfo).length !== 0) {
      setValue('student_signature', signatureInfo.studentSignatureInBase64);
      setValue(
        'sender_name',
        signatureInfo.sendingInstitutionIndividualResponsibleFullname
      );
      setValue(
        'sender_position',
        signatureInfo.sendingInstitutionIndividualResponsiblePosition
      );
      setValue(
        'sender_email',
        signatureInfo.sendingInstitutionIndividualResponsibleEmail
      );

      setValue(
        'receiver_signature',
        signatureInfo.signatureForReceivingInstitutionIndividualResponsibleInBase64
      );
      setValue(
        'receiver_name',
        signatureInfo.receivingInstitutionIndividualResponsibleFullname
      );
      setValue(
        'receiver_position',
        signatureInfo.receivingInstitutionIndividualResponsiblePosition
      );
      setValue(
        'receiver_email',
        signatureInfo.receivingInstitutionIndividualResponsibleEmail
      );
      setValue('comment', signatureInfo.commentForRejection);
      setStudentSignature(
        signatureInfo.studentSignatureInBase64 || textToBase64Image(' ')
      );
    }
  }, [signatureInfo]);

  function textToBase64Image(text: string): string {
    const canvas = createCanvas(950, 200); // Set canvas width and height
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Draw text on the canvas
    ctx.fillStyle = '#ffffff'; // Set background color to white
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'italic 50px Cursive';
    ctx.fillStyle = '#000000'; // Set text color to black
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Convert canvas to base64 image
    const base64Image = canvas.toDataURL('image/png');
    return base64Image;
  }

  const handleReceiverSignatureChange = (value: string | null) => {
    setReceiverSignature(textToBase64Image(value || ' '));
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
            <Flex gap={3} direction={'column'}>
              <Heading
                as='text'
                size='sm'
                fontWeight={'bold'}
                color={HeadingColor}
              >
                Öğrenci İmzası
              </Heading>
              <img width='500' height='200' src={`${studentSignature}`} />
            </Flex>

            <TextInput
              id='sender_name'
              label='Sorumlu Kişinin Adı Soyadı'
              placeholder=''
              error={errors.sender_name?.message}
              register={register('sender_name')}
            />
            <TextInput
              id='sender_position'
              label='Mevkisi / Pozisyonu'
              placeholder=''
              error={errors.sender_position?.message}
              register={register('sender_position')}
            />
            <TextInput
              id='sender_email'
              label='E-postası'
              placeholder=''
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
            <Flex gap={3} direction={'column'}>
              <Heading
                as='text'
                size='sm'
                fontWeight={'bold'}
                color={HeadingColor}
              >
                Sorumlu Kişinin İmzası Ön İzleme
              </Heading>
              <img width='500' height='200' src={`${receiverSignature}`} />
            </Flex>
            <SignatureInput
              onChange={handleReceiverSignatureChange}
              id='receiver_signature'
              register={register('receiver_signature')}
              placeholder='Ad Soyad'
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
              id='receiver_position'
              label='Mevkisi / Pozisyonu'
              placeholder=''
              error={errors.receiver_position?.message}
              register={register('receiver_position')}
            />
            <TextInput
              id='receiver_email'
              label='E-postası'
              placeholder=''
              error={errors.receiver_email?.message}
              register={register('receiver_email')}
            />
            <TextInput
              id='comment'
              label='Alıcı Kurumun Anlaşmayı Neden Onaylamadığını Açıklayan Yorum'
              placeholder=''
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
