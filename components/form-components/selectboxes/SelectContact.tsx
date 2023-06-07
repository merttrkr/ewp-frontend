import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormControl, useColorModeValue, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import useRead from '@/hooks/read/useRead';
import { Contact } from '@/models/contactResponse';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type SelectContactProps = {
  selectLabel: string;
  placeholder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
  onChange: (value: Contact | null) => void; // New prop for handling value change
  param: string;
  error: string | undefined;
};

const Select: React.FC<SelectContactProps> = ({
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeholder,
  register,
  error,
  onChange, // Add the new onChange prop
  param,
}) => {
  const { GetContactInfoByHeiID } = useRead();
  const [contactArray, setContactArray] = useState<Contact[]>([]);
  const theme = createTheme({
    // your theme configuration
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      if (param) {
        const result = await GetContactInfoByHeiID(
          'https://localhost:5001/spGetUniversityContactsByHeiId?heiId=' + param
        );
        if (!result) {
          console.log('no data');
        } else {
          console.log('result contact', result);
        }
        const data = await (result ? result.contacts : []); // Call the fetchData function
        if (data) {
          setContactArray(data); // Update the state with the fetched data
        }
      }
    };
    if (param != '') {
      fetchInitialData();
    }
  }, [param]); // Include GetContactInfoByHeiID in the dependency array

  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  return (
    <ThemeProvider theme={theme}>
      {
        <FormControl>
          <Heading
            pl='1'
            pb='2'
            size='sm'
            fontWeight={'bold'}
            color={HeadingColor}
          >
            <label htmlFor={id}>{selectLabel}</label>
          </Heading>
          <Autocomplete
            onChange={(event, value) => onChange(value || null)}
            disablePortal
            id={id}
            options={contactArray}
            getOptionLabel={(option) => option.fullName}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={placeholder}
                disabled={isDisabled}
                inputRef={register}
              />
            )}
          />
          {error && <span style={{ color: 'red' }}>{error}</span>}
        </FormControl>
      }
    </ThemeProvider>
  );
};

export default Select;
