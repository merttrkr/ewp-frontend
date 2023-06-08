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
} from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { useForm, useFormContext } from 'react-hook-form';
import useRead from '@/hooks/read/useRead';
import { Contact, ContactResponse } from '@/models/contactResponse';

type SelectAutoCompleteProps = {
  selectLabel: String;
  placeHolder: string;
  isDisabled?: boolean;
  id?: string;
};

const FormInput: React.FC<SelectAutoCompleteProps> = ({
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeHolder,
}) => {
  const [contactArray, setContactArray] = useState([] as Contact[]);
  const { GetContactInfoByHeiID } = useRead();
  /*
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
  }, [GetContactInfoByHeiID]);*/

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
          color={HeadingColor}
        >
          <label htmlFor={id}>{selectLabel}</label>
        </Heading>
      </FormControl>
    </Flex>
  );
};

export default FormInput;
