import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormControl, useColorModeValue, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import useRead from '@/hooks/read/useRead';
import { SubjectArea } from '@/models/response/subjectAreaResponse';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type SelectISCEDProps = {
  selectLabel: string;
  placeholder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
  onChange: (value: SubjectArea | null) => void; // New prop for handling value change
  error: string | undefined;
  inputValue?: string | number;
};

const SelectISCED: React.FC<SelectISCEDProps> = ({
  inputValue = null,
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeholder,
  register,
  error,
  onChange, // Add the new onChange prop
}) => {
  const { GetSubjectAreas } = useRead();
  const [subjectAreaArray, setSubjectAreaArray] = useState<SubjectArea[]>([]);
  const theme = createTheme({
    // your theme configuration
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await GetSubjectAreas(
        'https://localhost:5001/spGetSubjectAreas'
      ); // Call the GetSubjectAreas function
      if (data) {
        setSubjectAreaArray(data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    // Check if inputValue is provided and not null
    if (inputValue !== null) {
      // Find the nationality with matching id
      const selectedSubjectArea = subjectAreaArray.find(
        (type) => type.subjectAreaId === inputValue
      );
      // Call the onChange prop with the selected nationality
      onChange(selectedSubjectArea || null);
    }
  }, [inputValue, subjectAreaArray, onChange]);

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
            options={subjectAreaArray}
            getOptionLabel={(option) => option.subjectArea}
            isOptionEqualToValue={(option, value) =>
              option.subjectAreaId === value.subjectAreaId
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

export default SelectISCED;
