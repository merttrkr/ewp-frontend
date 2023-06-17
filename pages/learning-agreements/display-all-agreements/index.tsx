import React, { useEffect, useState } from 'react';
import {
  Flex,
  Button,
  Input,
  Stack,
  Select,
  Center,
  Heading,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import useRead from '@/hooks/read/useRead';
import PreviewOLA from '@/components/PreviewOLA';

export default function DisplayAgreements() {
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
        const filteredData = data.filter(
          (item) => item.sendingInstitutionName && item.receivingInstitutionName
        );
        setLearningAgreements(filteredData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    handleGetLearningAgreements();
  }, []);

  const filteredAgreements = learningAgreements.filter((agreement) => {
    const mobilityType = agreement.mobilityType || '-';
    const studentName = agreement.studentFullName || '-';
    const lowerCaseQuery = searchQuery.toLowerCase();
    const lowerCaseMobilityType = mobilityType.toLowerCase();
    return (
      lowerCaseMobilityType.includes(selectedMobilityType.toLowerCase()) &&
      (lowerCaseMobilityType.includes(lowerCaseQuery) ||
        studentName.toLowerCase().includes(lowerCaseQuery))
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
      <Flex
        align={['center', null, 'flex-start']}
        justify={['center', null, 'space-between']}
        flexWrap={['wrap', null, 'nowrap']}
        px={6}
        py={4}
      >
        <Stack direction='row' mb={[4, null, 0]}>
          <label htmlFor='filterSelect'>Filter By Mobility Type:</label>
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
        <Stack w={["100%","50%" ,"20%"]} direction='row'>
          <SearchIcon mt={3} color='gray.600' />
          <Input
            
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Stack>
      </Flex>

      {/* Loop through the currentAgreements array and render PreviewOLA component for each agreement */}
      {currentAgreements.length === 0 ? (
        <Flex justify='center'>
          <Heading
            fontWeight='sm'
            fontSize={['lg', null, '2xl']}
            fontStyle='normal'
          >
            No agreements to display.
          </Heading>
        </Flex>
      ) : (
        currentAgreements.map((agreement) => (
          <PreviewOLA
            sendingInstitutionInfoId={agreement.sendingInstitutionInfo_id ? agreement.sendingInstitutionInfo_id : 0}
            receivingInstitutionInfoId={agreement.receivingInstitutionInfo_id ? agreement.receivingInstitutionInfo_id : 0}
            proposedMobilityProgrammeId={agreement.proposedMobilityProgramme_id ? agreement.proposedMobilityProgramme_id : 0}
            commitmentId={agreement.commitment_id ? agreement.commitment_id : 0}
            virtualComponentId={agreement.virtualComponent_id ? agreement.virtualComponent_id : 0}
            changesProposalVersionId={agreement.changesProposalVersionId ? agreement.changesProposalVersionId : 0}
            studentInfoId={agreement.studentInfo_id ? agreement.studentInfo_id : 0}
            key={agreement.proposedMobilityProgramme_id}
            agreement={agreement}        />
        ))
      )}

      {/* Pagination controls */}
      <Flex justify='center' mt={4}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              variant={currentPage === pageNumber ? 'solid' : 'outline'}
              mr={2}
            >
              {pageNumber}
            </Button>
          )
        )}
      </Flex>
    </>
  );
}
