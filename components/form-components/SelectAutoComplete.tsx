import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  InputGroup,
  InputRightElement,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

type SelectAutoCompleteProps = {
  selectLabel: String;
};

function App({
  selectLabel,
}: SelectAutoCompleteProps) {
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const countries = [
    "nigeria",
    "japan",
    "india",
    "united states",
    "south korea",
  ];

  return (
    <Flex  justify="left" align="center" w="full">
      <FormControl>
      <Heading  
                pl='1'
                pb='2'
                as='h3'
                size='sm'
                fontWeight={'bold'}
                noOfLines={1}
                color={HeadingColor}
              >{selectLabel}</Heading>
        <AutoComplete openOnFocus>
          {({ isOpen }) => (
            <>
              <InputGroup>
                <AutoCompleteInput variant="filled" placeholder="Search..." />
                <InputRightElement> <Icon as={isOpen ? FiChevronRight : FiChevronDown} /></InputRightElement>
                   

              </InputGroup>
              <AutoCompleteList>
                {countries.map((country, cid) => (
                  <AutoCompleteItem
                    key={`option-${cid}`}
                    value={country}
                    textTransform="capitalize"
                  >
                    {country}
                  </AutoCompleteItem>
                ))}
              </AutoCompleteList>
            </>
          )}
        </AutoComplete>
      </FormControl>
    </Flex>
  );
}

export default App;