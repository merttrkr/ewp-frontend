import React from 'react';
import PreviewIIA from '@/components/PreviewIIA';
import { Flex, Button } from '@chakra-ui/react';

export default function DisplayAgreements() {
  // Create an array of IIA values
  const IIAs = ['1', '2', '3', '5', '6', '7', '8', '9', '10'];

  return (
    <>
      <Flex justify={'flex-end'} px={6} py={4}>
        <Button variant='condition'>Yeni Anlaşma Oluştur</Button>
      </Flex>

      {/* Loop through the IIAs array and render PreviewIIA component for each IIA */}
      {IIAs.map((IIA) => (
        <PreviewIIA key={IIA} IIA={IIA} />
      ))}
    </>
  );
}
