import PreviewIIA from '@/components/PreviewIIA';
import { Flex, Button } from '@chakra-ui/react';

export default function DisplayAgreements() {
  return (
    <>
      <Flex justify={'flex-end'} px={6} py={4}>
        <Button variant='condition'>Yeni Anlaşma Oluştur</Button>
      </Flex>
      <PreviewIIA IIA='1' />
    </>
  );
}
