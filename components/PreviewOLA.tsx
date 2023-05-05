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

type PreviewOLAProps = {
  OLA: String;
};

export default function PreviewOLA({ OLA }: PreviewOLAProps) {
  const HeaderBackground = useColorModeValue('#9C1F23', '#9C1F23');
  const FormBackground = useColorModeValue('gray.100', 'gray.700');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const TitleColor = useColorModeValue('#20558B', 'gray.400');
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
        padding={3}
        pl={6}
        color={'white'}
        gap={2}
      >
        <Text fontWeight={'bold'} fontSize={'sm'}>
          Seçilen Hareketlilik Tipi:
        </Text>
        <Text fontSize={'sm'}>Uzun Dönem</Text>
      </Flex>
      <Flex width={'full'} gap={5} justify={'space-around'}>
        <Flex
          flexDirection={'column'}
          justify={'flex-start'}
          width={'50%'}
          pl={'5'}
          rowGap={'3'}
        >
          <DisplayText
            label={'Hareketlilik Başlangıç Tarihi: '}
            content={'26/12/2022'}
          ></DisplayText>
          <DisplayText
            label={'Alanın ISCED-F Kodu: '}
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
            label={'Gönderen Kurum Yetkili Kişisi: '}
            content={'Placeholder'}
          ></DisplayText>
          <DisplayText
            label={'Alıcı Kurum Yetkili Kişisi: '}
            content={'Placeholder'}
          ></DisplayText>
          <DisplayText
            label={'Hareketliliğin Geçerli Olacağı Akademik Yıl: '}
            content={'Placeholder'}
          ></DisplayText>
        </Flex>
        <Flex
          flexDirection={'column'}
          justify={'flex-start'}
          width={'50%'}
          pl={'5'}
          rowGap={'3'}
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
        </Flex>
      </Flex>
      <Flex pt={1} pb={4}>
        <Button variant='autoWidthFull'>Anlaşma Detaylarını Görüntüle</Button>
      </Flex>
    </Stack>
  );
}
