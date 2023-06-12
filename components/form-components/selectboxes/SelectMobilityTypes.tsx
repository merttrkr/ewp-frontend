import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormControl, useColorModeValue, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import useRead from '@/hooks/read/useRead';
import { MobilityType } from '@/models/response/mobilityTypeResponse';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type SelectMobilityTypesProps = {
  selectLabel: string;
  placeholder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
  onChange: (value: MobilityType | null) => void; // New prop for handling value change
  error: string | undefined;
};

const SelectMobilityTypes: React.FC<SelectMobilityTypesProps> = ({
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeholder,
  register,
  error,
  onChange, // Add the new onChange prop
}) => {
  const { GetMobilityTypes } = useRead();
  const [mobilityTypesArray, setMobilityTypesArray] = useState<MobilityType[]>(
    []
  );
  const theme = createTheme({
    // your theme configuration
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await GetMobilityTypes(
          'https://localhost:5001/spGetMobilityTypes'
        );
        if (data) {
          setMobilityTypesArray(data); // Update the state with the fetched data
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchInitialData();
  }, []);

  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  return (
    <ThemeProvider theme={theme}>
      <FormControl width={'full'}>
        <Heading pl='1' pb='2' size='sm' fontWeight='bold' color={HeadingColor}>
          <label htmlFor={id}>{selectLabel}</label>
        </Heading>
        <Autocomplete
          onChange={(event, value) => onChange(value || null)}
          disablePortal
          id={id}
          options={mobilityTypesArray}
          getOptionLabel={(option) => option.mobilityType}
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

export default SelectMobilityTypes;
