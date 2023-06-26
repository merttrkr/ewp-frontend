import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormControl, useColorModeValue, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import useRead from '@/hooks/read/useRead';
import { AcademicYearInfo } from '@/models/response/academicYearResponse';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { type } from 'os';

type SelectAcademicYearProps = {
  selectLabel: string;
  placeholder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
  onChange: (value: AcademicYearInfo | null) => void; // New prop for handling value change
  error: string | undefined;
  inputValue?: string | number;
};

const SelectAcademicYear: React.FC<SelectAcademicYearProps> = ({
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeholder,
  register,
  error,
  inputValue = null,
  onChange, // Add the new onChange prop
}) => {
  const { GetAcademicYearInfo } = useRead();
  const [academicYearArray, setAcademicYearArray] = useState<
    AcademicYearInfo[]
  >([]);
  const theme = createTheme({
    // your theme configuration
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await GetAcademicYearInfo(
        'https://localhost:5001/spGetAcademicYearInfo'
      ); // Call the GetAcademicYearInfo function
      if (data) {
        setAcademicYearArray(data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
  }, []);

  const HeadingColor = useColorModeValue('gray.600', 'gray.100');

  
  useEffect(() => {
    // Check if inputValue is provided and not null
    if (typeof inputValue === 'number') {
      // Find the nationality with matching id
      const selectedDepartman = academicYearArray.find(
        (type) => type.academicYear_id === inputValue
      );
      onChange(selectedDepartman || null);  
    }
      if ( typeof inputValue  === 'string' ) {
        const selectedDepartman = academicYearArray.find(
          (type) => type.academicYear === inputValue
        );
        onChange(selectedDepartman || null);
      }
      // Call the onChange prop with the selected nationality
     
    
  }, [inputValue, academicYearArray, onChange]);

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
            options={academicYearArray}
            getOptionLabel={(option) => option.academicYear}
            isOptionEqualToValue={(option, value) =>
              option.academicYear_id === value.academicYear_id
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

export default SelectAcademicYear;
