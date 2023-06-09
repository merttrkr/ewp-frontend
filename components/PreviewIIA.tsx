import { BilateralAgreement } from '@/models/response/bilateralAgreementResponse';
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

type PreviewIIAProps = {
  IIA: String;
  BilateralAgreement: BilateralAgreement;
};

export default function PreviewIIA({ IIA,BilateralAgreement }: PreviewIIAProps) {
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
        justifyContent={'space-around'}
        bg={HeaderBackground}
        w={'full'}
        borderTopRadius={'xl'}
        padding={3}
        color={'white'}
      >
        <Flex fontSize='md' width={'33%'} justify={'center'}>
          Kurum Adları
        </Flex>
        <Flex width={'33%'} justify={'center'}>
          <VStack>
            <Text fontSize='md'>Kendi Kurumum</Text>
            <Text fontSize='sm'>
              {BilateralAgreement?.ownUniNameWithHeiId}
            </Text>
          </VStack>
        </Flex>
        <Flex width={'33%'} justify={'center'}>
          <VStack>
            <Text fontSize='md'>Partnerim</Text>
            <Text fontSize='sm'> {BilateralAgreement?.partnerUniNameWithHeiId } </Text>
          </VStack>
        </Flex>
      </Flex>
      <Flex direction={'column'} width={'full'}>
        <HStack
          justify={'space-evenly'}
          borderBottom={'2px'}
          borderColor={BorderColor}
          py={'2'}
        >
          <Flex
            fontSize='sm'
            width={'33%'}
            color={TitleColor}
            fontWeight={'medium'}
            justify={'center'}
          >
            Anlaşmanın Durumu
          </Flex>
          <Flex fontSize='sm' width={'33%'} justify={'center'}>
            {BilateralAgreement?.agreementState}
          </Flex>
          <Flex fontSize='sm' width={'33%'} justify={'center'}>
            {BilateralAgreement?.agreementStateDescription}
          </Flex>
        </HStack>
        <HStack
          justifyContent={'space-evenly'}
          borderBottom={'2px'}
          borderColor={BorderColor}
          py={'2'}
        >
          <Flex
            fontSize='sm'
            width={'33%'}
            justify={'center'}
            color={TitleColor}
            fontWeight={'medium'}
          >
            Anlaşmanın IIA Kodu
          </Flex>
          <Flex fontSize='sm' width={'33%'} justify={'center'}>
            {BilateralAgreement?.ownIIACode}
          </Flex>
          <Flex fontSize='sm' width={'33%'} justify={'center'}>
            {BilateralAgreement?.partnerIIACode}
          </Flex>
        </HStack>
        <HStack
          justifyContent={'space-evenly'}
          borderBottom={'2px'}
          borderColor={BorderColor}
          py={'2'}
        >
          <Flex
            fontSize='sm'
            width={'33%'}
            justify={'center'}
            color={TitleColor}
            fontWeight={'medium'}
          >
            Erasmus Kodu
          </Flex>
          <Flex fontSize='sm' width={'33%'} justify={'center'}>
            {BilateralAgreement?BilateralAgreement.ownErasmusIdCode:""}
          </Flex>
          <Flex fontSize='sm' width={'33%'} justify={'center'}>
          {BilateralAgreement?BilateralAgreement.partnerErasmusIdCode:""}
          </Flex>
        </HStack>
        <HStack
          justifyContent={'space-evenly'}
          borderBottom={'2px'}
          borderColor={BorderColor}
          py={'2'}
        >
          <Flex
            fontSize='sm'
            width={'33%'}
            justify={'center'}
            color={TitleColor}
            fontWeight={'medium'}
          >
            Son Güncellenme Tarihi
          </Flex>
          <Flex fontSize='sm' width={'33%'} justify={'center'}>
            {BilateralAgreement?.generationDate}
          </Flex>
          <Flex fontSize='sm' width={'33%'} justify={'center'}>
            {BilateralAgreement?.lastUpdateDate}
          </Flex>
        </HStack>
      </Flex>
      <Flex pt={1} pb={4}>
        <Button variant='autoWidthFull'>Anlaşma Detaylarını Görüntüle</Button>
      </Flex>
    </Stack>
  );
}
