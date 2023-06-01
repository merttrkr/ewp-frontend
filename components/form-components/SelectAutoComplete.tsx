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
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { useForm, useFormContext } from 'react-hook-form';

type SelectAutoCompleteProps = {
  selectLabel: String;
  placeHolder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
};

type ContactData = {
  id: number;
  fullName: string;
  phoneNumber: string;
  faxNumber: string;
  email: string;
  roleDescription: string;
};
const getData = async () => {
  let result;
  try {
    const response = await fetch(
      'https://localhost:5001/spGetUniversityContactsByHeiId?heiId=iyte.edu.tr',
      {
        method: 'POST',
        headers: {
          Accept: 'text/plain',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    result = await response.json();
  } catch (err) {
    console.log(err);
  } finally {
    console.log('finally');
  }
  return result;
};

const FormInput: React.FC<SelectAutoCompleteProps> = ({
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeHolder,
  register,
}) => {
  const [dataArray, setDataArray] = useState<ContactData[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await getData(); // Call the fetchData function
        console.log(data);

        setDataArray(data); // Update the state with the fetched data
      } catch (error) {
        // Handle the error if needed
      }
    };
    fetchInitialData();
  }, []);

  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const arrayData = dataArray;
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
                {dataArray.map((element, cid) => (
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

export default FormInput;
