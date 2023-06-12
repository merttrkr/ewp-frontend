import React, { useEffect, useState } from 'react';
import { Flex, Button, Input, Stack, Center } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import useRead from '@/hooks/read/useRead';
import PreviewOLA from '@/components/PreviewOLA';

export default function DisplayAgreements() {
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const { GetAllLearningAgreements } = useRead();
  const [learningAgreements, setLearningAgreements] = useState<
    LearningAgreement[]
  >([]);
  const itemsPerPage = 3;
  async function handleGetLearningAgreements() {
    try {
      const data = await GetAllLearningAgreements(
        `https://localhost:5001/spGetAllLearningAgreements`
      );
      if (data != null) {
        setLearningAgreements(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    handleGetLearningAgreements();
  }, []);

  const filteredAgreements = learningAgreements.filter((agreement) => {
    const selectedMobilityType = agreement.mobilityType || '-';
    const stıdentName = agreement.studentFullName || '-';
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      selectedMobilityType.toLowerCase().includes(lowerCaseQuery) ||
      stıdentName.toLowerCase().includes(lowerCaseQuery)
    );
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
      <Flex align={'center'} justify={'flex-end'} px={6} py={4}>
        <Stack justify={'right'} px={2} direction={'row'}>
          <SearchIcon mt={3} color='gray.600' />
          <Input
            width='auto'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Stack>
      </Flex>

      {/* Loop through the currentAgreements array and render PreviewIIA component for each agreement */}
      {currentAgreements.map((agreement) => (
        <PreviewOLA
          key={agreement.proposedMobilityProgramme_id}
          agreement={agreement}
        />
      ))}

      {/* Pagination controls */}
      <Flex justify={'center'}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              variant={currentPage === pageNumber ? 'solid' : 'outline'}
            >
              {pageNumber}
            </Button>
          )
        )}
      </Flex>
    </>
  );
}
