import {
  Box,
  Button,
  Flex,
  Stack,
  useColorModeValue,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import DisplayText from './form-components/DisplayText';
import { FiChevronRight } from 'react-icons/fi';
import useRead from '@/hooks/read/useRead';
import { useEffect, useState } from 'react';

type PreviewOLAProps = {
  OLA: String;
};

export default function PreviewOLA({ OLA }: PreviewOLAProps) {
  const { GetAllLearningAgreements } = useRead();
  const HeaderBackground = useColorModeValue('#9C1F23', '#9C1F23');
  const FormBackground = useColorModeValue('gray.100', 'gray.700');
  const [laArray, setLaArray] = useState<LearningAgreement[]>([]);

  async function handleGetLearningAgreements() {
    try {
      const data = await GetAllLearningAgreements(
        `https://localhost:5001/spGetAllLearningAgreements`
      );
      if (data != null) {
        setLaArray(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    handleGetLearningAgreements();
  }, []);

  return (
    <Stack
      margin='6'
      bg={FormBackground}
      borderRadius={'xl'}
      align={'center'}
      justify={'center'}
    >
      <Flex
        align={'center'}
        bg={HeaderBackground}
        w={'full'}
        borderTopRadius={'xl'}
        py={3}
        px={10}
        color={'white'}
        justify={'space-between'}
      >
        <Flex gap={2}>
          <Text fontWeight={'bold'} fontSize={'sm'}>
            Seçilen Hareketlilik Tipi:
          </Text>
          <Text fontSize={'sm'}>Uzun Dönem</Text>
        </Flex>

        <Button variant={'white'} rightIcon={<FiChevronRight />}>
          Anlaşmayı Düzenle
        </Button>
      </Flex>

      <Flex width={'full'} gap={5} justify={'space-around'} padding={6}>
        <Flex
          flexDirection={'column'}
          justify={'flex-start'}
          width={'50%'}
          pl={'5'}
          rowGap={'4'}
        >
          <DisplayText
            label={'Hareketlilik Başlangıç Tarihi: '}
            content={'26/12/2022'}
          ></DisplayText>
          <DisplayText
            label={'Hareketliliğin Geçerli Olacağı Akademik Yıl: '}
            content={'Placeholder'}
          ></DisplayText>
          <DisplayText
            label={'Gönderen Kurum/ Üniversite Adı: '}
            content={'Placeholder'}
          ></DisplayText>
          <DisplayText
            label={'Alıcı Kurum/ Üniversite Adı: '}
            content={'Placeholder'}
          ></DisplayText>

          <DisplayText
            label={'Gönderen Kurum Yetkili Kişinin Adı Soyadı: '}
            content={'Placeholder'}
          ></DisplayText>
          <DisplayText
            label={'Alıcı Kurum Yetkili Kişinin Adı Soyadı: '}
            content={'Placeholder'}
          ></DisplayText>
          <DisplayText
            label={'Öğrencinin Adı Soyadı: '}
            content={'Placeholder'}
          ></DisplayText>
        </Flex>
        <Flex
          flexDirection={'column'}
          justify={'flex-start'}
          width={'50%'}
          pl={'5'}
          rowGap={'4'}
        >
          <DisplayText
            label={'Hareketlilik Bitiş Tarihi: '}
            content={'26/12/2027'}
          ></DisplayText>
          <DisplayText
            label={'Öğrencinin Öğrenim Seviyesi(EQF Seviyesi): '}
            content={'26/12/2027'}
          ></DisplayText>
          <DisplayText
            label={'Gönderen Kurumun Departman/ Bölüm Adı: '}
            content={'Placeholder'}
          ></DisplayText>
          <DisplayText
            label={'Alıcı Kurumun Departman/ Bölüm Adı: '}
            content={'Placeholder'}
          ></DisplayText>
          <DisplayText
            label={'Gönderen Kurum Yetkili Kişinin E-Postası: '}
            content={'Placeholder'}
          ></DisplayText>
          <DisplayText
            label={'Alıcı Kurum Yetkili Kişinin E-Postası: '}
            content={'Placeholder'}
          ></DisplayText>
          <DisplayText
            label={'Öğrencinin E-Postası: '}
            content={'Placeholder'}
          ></DisplayText>
        </Flex>
      </Flex>
    </Stack>
  );
}
