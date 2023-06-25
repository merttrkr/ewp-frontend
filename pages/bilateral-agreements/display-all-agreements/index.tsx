import React, { useEffect, useState } from 'react';
import PreviewIIA from '@/components/PreviewIIA';
import {
  Flex,
  Button,
  Input,
  Stack,
  Center,
  Text,
  Heading,
  Box,
  SimpleGrid,
} from '@chakra-ui/react';
import TextInput from '@/components/form-components/inputs/TextInput';
import { SearchIcon } from '@chakra-ui/icons';
import useRead from '@/hooks/read/useRead';
import { BilateralAgreement } from '@/models/response/bilateralAgreementResponse';
import NextLink from 'next/link';

export default function DisplayAgreements() {
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [bilateralAgreements, setBilateralAgreements] = useState<BilateralAgreement[]>([]);

  const { GetBilateralAgreements } = useRead();
  const itemsPerPage = 3;

  useEffect(() => {
    async function fetchBilateralAgreements() {
      try {
        const data = await GetBilateralAgreements('https://localhost:5001/spGetBilateralAgreements');
        if (data && data.length > 0) {
          const filteredData = data.filter(item => item.ownIIACode || item.partnerIIACode); // Filter out items where IIACode does not exist or is null
          setBilateralAgreements(filteredData);
        }
      } catch (error) {
        console.error('Error fetching bilateral agreements:', error);
      }
    }

    fetchBilateralAgreements();
  }, []);

  const filteredAgreements = bilateralAgreements.filter(agreement => {
    const ownIIACode = agreement.ownIIACode || '-';
    const partnerIIACode = agreement.partnerIIACode || '-';
    const lowerCaseQuery = searchQuery.toLowerCase();
    return ownIIACode.toLowerCase().includes(lowerCaseQuery) || partnerIIACode.toLowerCase().includes(lowerCaseQuery);
  });

  const totalPages = Math.ceil(filteredAgreements.length / itemsPerPage);

  const currentAgreements = filteredAgreements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when the search query changes
  };

  return (
    <>
      {/* Search input field */}
      <Flex align="center" justify={['flex-start', 'flex-end']} px={6} py={4} direction={['column', 'row']}>
        <Stack justify="flex-start" px={2} direction={['column', 'row', 'row', 'row', 'row', 'row', 'row']}>
          <SearchIcon mt={[0, 3]} color="gray.600" />
          <Input width={['full', 'auto']} value={searchQuery} onChange={handleSearchChange} />
        </Stack>
        <Button as={NextLink} href="/bilateral-agreements/create-new-agreement/" variant="condition" mt={[4, 0]}>
          Yeni Anlaşma Oluştur
        </Button>
      </Flex>

      {currentAgreements.length === 0 ? (
        <Flex justify="center">
          <Heading fontWeight="sm" fontSize="2xl" fontStyle="normal">
            No agreements to display.
          </Heading>
        </Flex>
      ) : (
        <Flex width="100%" direction={'column'} gap={2} justifyContent={['center', null, 'right']}>

          {currentAgreements.map((agreement) => (
            <PreviewIIA
              key={agreement.bilateralAgreement_id}
              IIA={agreement.ownIIACode || '-'}
              BilateralAgreement={agreement}
            />
          ))}

        </Flex>

      )}

      {/* Pagination controls */}
      <Flex justify="center" mt={4}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
          <Button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            variant={currentPage === pageNumber ? 'solid' : 'outline'}
            mr={2}
          >
            {pageNumber}
          </Button>
        ))}
      </Flex>
    </>
  );
}
