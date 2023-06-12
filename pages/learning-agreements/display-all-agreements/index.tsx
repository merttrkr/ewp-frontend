import React, { useEffect, useState } from 'react';
import {
  Flex,
  Button,
  Input,
  useColorModeValue,
  Stack,
  Heading,
  Select,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import useRead from '@/hooks/read/useRead';
import PreviewOLA from '@/components/PreviewOLA';

export default function DisplayAgreements() {
  const HeadingColor = useColorModeValue('gray.700', 'gray.300');
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [selectedMobilityType, setSelectedMobilityType] = useState(''); // Selected mobility type for filtering
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
    const studentName = agreement.studentFullName || '-';
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      studentName.toLowerCase().includes(lowerCaseQuery) &&
      agreement.proposedMobilityProgramme_id !== null
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

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMobilityType(event.target.value);
    setCurrentPage(1); // Reset to the first page when the filter changes
  };

  return (
    <>
      {/* Search input field */}
      <Flex align={'center'} justify={'space-between'} px={6} py={4}>
        <Stack direction='row'>
          <Heading
            pl='1'
            as='h3'
            fontSize='md'
            fontWeight={'medium'}
            color={HeadingColor}
          >
            Filter By Mobility Type:
          </Heading>
          <Select
            id='filterSelect'
            value={selectedMobilityType}
            onChange={handleFilterChange}
          >
            <option value=''>All</option>
            <option value='Long-term Mobility'>Long-term Mobility</option>
            <option value='Blended Mobility'>Blended Mobility</option>
            <option value='Short-term Doctoral Mobility'>
              Short-term Doctoral Mobility
            </option>
          </Select>
        </Stack>
        <Stack direction='row'>
          <SearchIcon mt={3} color='gray.600' />
          <Input
            width='auto'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Stack>
      </Flex>

      {/* Loop through the currentAgreements array and render PreviewOLA component for each agreement */}
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
