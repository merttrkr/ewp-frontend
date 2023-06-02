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
import useRead from '@/hooks/read/useRead';
import { Contact } from '@/models/contactResponse';

const { GetContactInfoByHeiID } = useRead();

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
  const [contactArray, setContactArray] = useState([] as Contact[]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await (
        await GetContactInfoByHeiID(
          'https://localhost:5001/spGetUniversityContactsByHeiId?heiId=iyte.edu.tr'
        )
      ).contacts; // Call the fetchData function
      if (data) {
        setContactArray(data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
  }, []);

  const HeadingColor = useColorModeValue('gray.600', 'gray.100');

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
                {contactArray.map((element, cid) => (
                  <AutoCompleteItem
                    key={`option-${cid}`}
                    value={element.fullName} // Render the fullName property
                    textTransform='capitalize'
                  >
                    {element.fullName}
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
