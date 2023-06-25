import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormControl, useColorModeValue, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import useRead from '@/hooks/read/useRead';
import { LanguageLevel } from '@/models/response/languageLevelResponse';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type SelectLanguageLevelProps = {
  selectLabel: string;
  placeholder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
  onChange: (value: LanguageLevel | null) => void; // New prop for handling value change
  error: string | undefined;
  inputValue?: string | number;
};

const SelectLanguageLevel: React.FC<SelectLanguageLevelProps> = ({
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeholder,
  register,
  error,
  inputValue= null,
  onChange, // Add the new onChange prop
}) => {
  const { GetLanguageLevels } = useRead();
  const [languageLevelArray, setLanguageLevelArray] = useState<LanguageLevel[]>(
    []
  );
  const theme = createTheme({
    // your theme configuration
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await GetLanguageLevels(
        'https://localhost:5001/spGetLanguageLevels'
      ); // Call the GetLanguageLevels function
      if (data) {
        setLanguageLevelArray(data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
  }, []);

  const HeadingColor = useColorModeValue('gray.600', 'gray.100');

  useEffect(() => {
    // Check if inputValue is provided and not null
    if (inputValue !== null) {
      // Find the nationality with matching id
      const selectedDepartman = languageLevelArray.find(
        (type) => type.langLevel_id === inputValue
      );
      // Call the onChange prop with the selected nationality
      onChange(selectedDepartman || null);
    }
  }, [inputValue, languageLevelArray, onChange]);

  return (
    <ThemeProvider theme={theme}>
      {
        <FormControl width={'full'}>
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
            options={languageLevelArray}
            getOptionLabel={(option) => option.code}
            isOptionEqualToValue={(option, value) =>
              option.langLevel_id === value.langLevel_id
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

export default SelectLanguageLevel;
