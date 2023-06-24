import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormControl, useColorModeValue, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import useRead from '@/hooks/read/useRead';
import { Gender } from '@/models/response/genderResponse';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type SelectGenderProps = {
  selectLabel: string;
  placeholder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
  onChange: (value: Gender | null) => void; // New prop for handling value change
  error: string | undefined;
  inputValue? : string | number;
};

const SelectGender: React.FC<SelectGenderProps> = ({
  inputValue = null,
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeholder,
  register,
  error,
  onChange, // Add the new onChange prop
}) => {
  const { GetGenderNames } = useRead();
  const [genderArray, setGenderArray] = useState<Gender[]>([]);
  const theme = createTheme({
    // your theme configuration
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await GetGenderNames(
        'https://localhost:5001/spGetGenderNames'
      ); // Call the GetGenderNames function
      if (data) {
        setGenderArray(data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    // Check if inputValue is provided and not null
    if (inputValue !== null) {
      // Find the nationality with matching id
      const selectedGender = genderArray.find(
        (type) => type.id === inputValue
      );
      // Call the onChange prop with the selected nationality
      onChange(selectedGender || null);
    }
  }, [inputValue, genderArray, onChange]);

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
            options={genderArray}
            getOptionLabel={(option) => option.genderName}
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

export default SelectGender;
