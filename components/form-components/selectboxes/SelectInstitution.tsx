import {
  Flex,
  FormControl,
  Icon,
  InputGroup,
  InputRightElement,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { InstitutionInfo } from '@/models/institutionInfoResponse';
import useRead from '@/hooks/read/useRead';
const { GetAllUniversitiesInfo } = useRead();

type SelectContactProps = {
  selectLabel: String;
  placeHolder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
};

const Select: React.FC<SelectContactProps> = ({
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeHolder,
  register,
}) => {
  const [institutionInfoArray, setInstitutionInfoArray] = useState(
    [] as InstitutionInfo[]
  );

  //colors
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await (
        await GetAllUniversitiesInfo(
          'https://localhost:5001/spGetUniversityNamesForOrganization?uniShortName=all'
        )
      ).institutionInfos; // Call the fetchData function
      if (data) {
        setInstitutionInfoArray(data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
  }, []);

  return (
    <Flex justify='left' align='center' w='full'>
      <FormControl>
        <Heading
          pl='1'
          pb='2'
          as='h3'
          size='sm'
          fontWeight={'bold'}
          noOfLines={1}
          color={HeadingColor}
        >
          <label htmlFor={id}>{selectLabel}</label>
        </Heading>
        <AutoComplete openOnFocus>
          {({ isOpen }) => (
            <>
              <InputGroup>
                <AutoCompleteInput
                  id={id}
                  {...register}
                  disabled={isDisabled}
                  variant='filled'
                  placeholder={placeHolder}
                />
                <InputRightElement>
                  {' '}
                  <Icon as={isOpen ? FiChevronRight : FiChevronDown} />
                </InputRightElement>
              </InputGroup>
              <AutoCompleteList>
                {institutionInfoArray.map((element, cid) => (
                  <AutoCompleteItem
                    key={`option-${cid}`}
                    value={element.UniName ? element.UniName : element.heiId}
                    textTransform='capitalize'
                  >
                    {element.UniName}
                  </AutoCompleteItem>
                ))}
              </AutoCompleteList>
            </>
          )}
        </AutoComplete>
      </FormControl>
    </Flex>
  );
};

export default Select;
