import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormControl, useColorModeValue, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import useRead from '@/hooks/read/useRead';
import { Nationality } from '@/models/response/nationalityResponse';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type SelectNationalityProps = {
  selectLabel: string;
  placeholder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
  onChange: (value: Nationality | null) => void;
  error: string | undefined;
  inputValue?: string | number;
};

const SelectNationality: React.FC<SelectNationalityProps> = ({
  inputValue = null,
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeholder,
  register,
  error,
  onChange,
}) => {
  const { GetNationalities } = useRead();
  const [nationalityArray, setNationalityArray] = useState<Nationality[]>([]);
  const theme = createTheme({
    // your theme configuration
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const result = await GetNationalities();
        if (result) {
          setNationalityArray(result);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchInitialData();
  }, []);

  const HeadingColor = useColorModeValue('gray.600', 'gray.100');

  useEffect(() => {
    // Check if inputValue is provided and not null
    if (inputValue !== null) {
      // Find the nationality with matching id
      const selectedNationality = nationalityArray.find(
        (nationality) => nationality.id === inputValue
      );
      // Call the onChange prop with the selected nationality
      onChange(selectedNationality || null);
    }
  }, [inputValue, nationalityArray, onChange]);

  return (
    <ThemeProvider theme={theme}>
      <FormControl>
        <Heading pl='1' pb='2' size='sm' fontWeight='bold' color={HeadingColor}>
          <label htmlFor={id}>{selectLabel}</label>
        </Heading>
        <Autocomplete
          onChange={(event, value) => onChange(value || null)}
          disablePortal
          id={id}
          options={nationalityArray}
          getOptionLabel={(option) => option.nationality}
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
    </ThemeProvider>
  );
};

export default SelectNationality;
