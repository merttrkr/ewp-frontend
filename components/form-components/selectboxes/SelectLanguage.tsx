import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormControl, useColorModeValue, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import useRead from '@/hooks/read/useRead';
import { Language } from '@/models/response/languageResponse';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type SelectLanguageProps = {
  selectLabel: string;
  placeholder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
  onChange: (value: Language | null) => void; // New prop for handling value change
  error: string | undefined;
  inputValue?: string | number;
};

const SelectLanguage: React.FC<SelectLanguageProps> = ({
  inputValue = null,
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeholder,
  register,
  error,
  onChange, // Add the new onChange prop
}) => {
  const { GetLanguages } = useRead();
  const [languageArray, setLanguageArray] = useState<Language[]>([]);
  const theme = createTheme({
    // your theme configuration
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await GetLanguages('https://localhost:5001/spGetLanguages'); // Call the GetLanguages function
      if (data) {
        setLanguageArray(data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
  }, []);


  useEffect(() => {
    // Check if inputValue is provided and not null
    if (inputValue !== null) {
      // Find the nationality with matching id
      const selectedDepartman = languageArray.find(
        (type) => type.lang_id === inputValue
      );
      // Call the onChange prop with the selected nationality
      onChange(selectedDepartman || null);
    }
  }, [inputValue, languageArray, onChange]);

  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  return (
    <ThemeProvider theme={theme}>
      {
        <FormControl width='full'>
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
            options={languageArray}
            getOptionLabel={(option) => option.definition}
            isOptionEqualToValue={(option, value) =>
              option.lang_id === value.lang_id
            }
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

export default SelectLanguage;
