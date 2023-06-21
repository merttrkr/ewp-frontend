import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormControl, useColorModeValue, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import useRead from '@/hooks/read/useRead';
import { EducationTypeAndLevel } from '@/models/response/educationTypeAndLevelResponse';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type SelectEducationTypeAndLevelProps = {
  selectLabel: string;
  placeholder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
  onChange: (value: EducationTypeAndLevel | null) => void; // New prop for handling value change
  error: string | undefined;
  inputValue?: string | number;
};

const SelectEducationTypeAndLevel: React.FC<
  SelectEducationTypeAndLevelProps
> = ({
  inputValue,
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeholder,
  register,
  error,
  onChange, // Add the new onChange prop
}) => {
  const { GetEducationTypesAndLevels } = useRead();
  const [educationTypeAndLevelArray, setEducationTypeAndLevelArray] = useState<
    EducationTypeAndLevel[]
  >([]);
  const theme = createTheme({
    // your theme configuration
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await GetEducationTypesAndLevels(
        'https://localhost:5001/spGetEducationTypesAndLevels'
      ); // Call the GetEducationTypesAndLevels function
      if (data) {
        setEducationTypeAndLevelArray(data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    // Check if inputValue is provided and not null
    if (inputValue !== null) {
      // Find the nationality with matching id
      const selectedGender = educationTypeAndLevelArray.find(
        (type) => type.educationTypeAndLevel_id === inputValue
      );
      // Call the onChange prop with the selected nationality
      onChange(selectedGender || null);
    }
  }, [inputValue, educationTypeAndLevelArray, onChange]);

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
            options={educationTypeAndLevelArray}
            getOptionLabel={(option) => option.educationTypeAndLevel}
            isOptionEqualToValue={(option, value) =>
              option.educationTypeAndLevel_id === value.educationTypeAndLevel_id
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

export default SelectEducationTypeAndLevel;
