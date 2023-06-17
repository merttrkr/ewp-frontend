import { Button, Flex, Stack, useColorModeValue, Text } from '@chakra-ui/react';
import DisplayText from './form-components/DisplayText';
import { FiChevronRight } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import NextLink from 'next/link';

type PreviewOLAProps = {
  agreement: LearningAgreement;
  studentInfoId: number;
  sendingInstitutionInfoId : number;
  receivingInstitutionInfoId : number;
  proposedMobilityProgrammeId : number;
  commitmentId : number;
  virtualComponentId : number;
  changesProposalVersionId : number;
 

};
const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based
  const year = date.getFullYear();

  // Pad single digits with leading zeros
  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');

  const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

  return formattedDate;
};

export default function PreviewOLA({ 
  agreement,
  studentInfoId,
  sendingInstitutionInfoId,
  receivingInstitutionInfoId,
  proposedMobilityProgrammeId,
  commitmentId,
  virtualComponentId,
  changesProposalVersionId,

 }: PreviewOLAProps) {
  const HeaderBackground = useColorModeValue('#9C1F23', '#9C1F23');
  const FormBackground = useColorModeValue('gray.100', 'gray.700');


  const renderNextLink = studentInfoId !== 0 && (
    <NextLink href={getAgreementUrl(agreement.mobilityType)}>
      <Button variant="white" rightIcon={<FiChevronRight />}>Anlaşmayı Düzenle</Button>
    </NextLink>
  );
  
  function getAgreementUrl(mobilityType: string) {
    const baseUrl = 'http://localhost:3000/learning-agreements/create';
  
    switch (mobilityType) {
      case 'Long-term Mobility':
        return `${baseUrl}-long-term-la?studentInfoId=${studentInfoId}&sendingInstitutionInfoId=${sendingInstitutionInfoId}&receivingInstitutionInfoId=${receivingInstitutionInfoId}`;
      case 'Blended Mobility':
        return `${baseUrl}-blended-la?studentInfoId=${studentInfoId}&proposedMobilityProgrammeId=${proposedMobilityProgrammeId}&commitmentId=${commitmentId}`;
      case 'Short-term Doctoral Mobility':
        return `${baseUrl}-short-term-doctoral-la?studentInfoId=${studentInfoId}&virtualComponentId=${virtualComponentId}&changesProposalVersionId=${changesProposalVersionId}`;
      default:
        return '';
    }
  }
  
  

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
          <Text fontSize={'sm'}>{agreement.mobilityType}</Text>
        
        </Flex>

        {renderNextLink}
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
            content={
              agreement.plannedStartingDateOfMobility
                ? formatDate(agreement.plannedStartingDateOfMobility)
                : '-'
            }
          ></DisplayText>
          <DisplayText
            label={'Hareketliliğin Geçerli Olacağı Akademik Yıl: '}
            content={agreement.academicYear ?? '-'}
          ></DisplayText>
          <DisplayText
            label={'Gönderen Kurum/ Üniversite Adı: '}
            content={agreement.receivingInstitutionName ?? '-'}
          ></DisplayText>
          <DisplayText
            label={'Alıcı Kurum/ Üniversite Adı: '}
            content={agreement.sendingInstitutionName ?? '-'}
          ></DisplayText>

          <DisplayText
            label={'Gönderen Kurum Yetkili Kişinin Adı Soyadı: '}
            content={agreement.sendingAcademicPersonnelFullName ?? '-'}
          ></DisplayText>
          <DisplayText
            label={'Alıcı Kurum Yetkili Kişinin Adı Soyadı: '}
            content={agreement.receivingAcademicPersonnelFullName ?? '-'}
          ></DisplayText>
          <DisplayText
            label={'Öğrencinin Adı Soyadı: '}
            content={agreement.studentFullName ?? '-'}
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
            content={
              agreement.plannedEndDateOfMobility
                ? formatDate(agreement.plannedEndDateOfMobility)
                : '-'
            }
          ></DisplayText>
          <DisplayText
            label={'Öğrencinin Öğrenim Seviyesi(EQF Seviyesi): '}
            content={agreement.EqfLevel ?? '-'}
          ></DisplayText>
          <DisplayText
            label={'Gönderen Kurumun Departman/ Bölüm Adı: '}
            content={agreement.sendingInstitutionOunitName ?? '-'}
          ></DisplayText>
          <DisplayText
            label={'Alıcı Kurumun Departman/ Bölüm Adı: '}
            content={agreement.receivingInstitutionOunitName ?? '-'}
          ></DisplayText>
          <DisplayText
            label={'Gönderen Kurum Yetkili Kişinin E-Postası: '}
            content={agreement.sendingAcademicPersonnelEmail ?? '-'}
          ></DisplayText>
          <DisplayText
            label={'Alıcı Kurum Yetkili Kişinin E-Postası: '}
            content={agreement.receivingAcademicPersonnelEmail ?? '-'}
          ></DisplayText>
          <DisplayText
            label={'Öğrencinin E-Postası: '}
            content={agreement.studentEmail ?? '-'}
          ></DisplayText>
        </Flex>
      </Flex>
    </Stack>
  );
}
