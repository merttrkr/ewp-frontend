import React, { useState } from 'react';
import PreviewIIA from '@/components/PreviewIIA';
import { Flex, Button, Input, Stack, Center } from '@chakra-ui/react';
import TextInput from '@/components/form-components/inputs/TextInput';
import { Search2Icon } from '@chakra-ui/icons';

export default function DisplayAgreements() {
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [searchQuery, setSearchQuery] = useState(''); // Search query

  // Create an array of IIA values
  const IIAs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  // Number of items to display per page
  const itemsPerPage = 3;

  // Filter items based on search query
  const filteredItems = IIAs.filter(IIA =>
    IIA.includes(searchQuery.toLowerCase())
  );

  // Total number of pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the current items to display
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Handle search query change
  const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when the search query changes
  };

  return (
    <>
      <Flex align={'center'} justify={'flex-end'} px={6} py={4}>
        <Stack justify={'right'} px={2} direction={'row'}>
          <Search2Icon mt={3} color="gray.600" />
          <Input  width='auto' value={searchQuery} onChange={handleSearchChange} />
        </Stack>
        <Button variant="condition">Yeni Anlaşma Oluştur</Button>
      </Flex>

      {/* Search input field */}



      {/* Loop through the currentItems array and render PreviewIIA component for each IIA */}
      {currentItems.map(IIA => (
        <PreviewIIA key={IIA} IIA={IIA} />
      ))}

      {/* Pagination controls */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          pageNumber => (
            <Button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              variant={currentPage === pageNumber ? 'solid' : 'outline'}
            >
              {pageNumber}
            </Button>
          )
        )}
      </div>
    </>
  );
}
