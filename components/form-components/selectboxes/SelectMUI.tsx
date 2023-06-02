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
  placeHolder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
  onChange: (value: string) => void; // New prop for handling value change
};

const Select: React.FC<SelectContactProps> = ({
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeHolder,
  register,
  onChange, // Add the new onChange prop
}) => {
  const { GetContactInfoByHeiID } = useRead();
  const [contactArray, setContactArray] = useState<Contact[]>([]);
  const theme = createTheme({
    // your theme configuration
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await (
        await GetContactInfoByHeiID(
          'https://localhost:5001/spGetUniversityContactsByHeiId?heiId=iyte.edu.tr'
        )
      ).contacts;
      if (data) {
        setContactArray(data);
      }
    };
    fetchInitialData();
  }, [GetContactInfoByHeiID]); // Include GetContactInfoByHeiID in the dependency array

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
            onChange={(event, value) => onChange(value?.fullName || '')}
            disablePortal
            id={id}
            options={contactArray}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.fullName}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={placeHolder}
                disabled={isDisabled}
                inputRef={register}
              />
            )}
          />
        </FormControl>
      }
    </ThemeProvider>
  );
};

export default Select;
