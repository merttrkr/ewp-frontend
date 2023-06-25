import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormControl, useColorModeValue, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Department } from '@/models/response/departmentResponse';
import useRead from '@/hooks/read/useRead';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type SelectDepartmentProps = {
  selectLabel: string;
  placeHolder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
  onChange: (value: Department | null) => void; // New prop for handling value change
  param: string;
  error: string | undefined;
  inputValue?: string | number ;
};

const Select: React.FC<SelectDepartmentProps> = ({
  inputValue = null,
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeHolder,
  register,
  onChange, // Add the new onChange prop
  param,
  error,
}) => {
  const { GetDepartmentsByHeiID } = useRead();
  const [departmentArray, setDepartmentArray] = useState([] as Department[]);
  const theme = createTheme({
    // your theme configuration
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      if (param) {
        const result = await GetDepartmentsByHeiID(
          'https://localhost:5001/spGetOrganizationalUnitNamesForOrganization?heiId=' +
            param
        );
        const data = (result ? result.departments : []); // Call the fetchData function
        if (data) {
          setDepartmentArray(data); // Update the state with the fetched data
        }
      }
    };
    if (param) {
      fetchInitialData();
    }
  }, [param]);

  useEffect(() => {
    // Check if inputValue is provided and not null
    if (inputValue !== null && typeof inputValue === 'number') {
      // Find the nationality with matching id
      const selectedDepartman = departmentArray.find(
        (type) => type.id === inputValue
      );
      // Call the onChange prop with the selected nationality
      onChange(selectedDepartman || null);
    }
    if (inputValue !== null && typeof inputValue === 'string') {
      // Find the nationality with matching id
      const selectedDepartman = departmentArray.find(
        (type) => type.organizationalUnitName === inputValue
      );
      // Call the onChange prop with the selected nationality
      onChange(selectedDepartman || null);
    }
  }, [inputValue, departmentArray, onChange]);

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
            disabled={isDisabled}
            options={departmentArray}
            getOptionLabel={(option) => option.organizationalUnitName}
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
          {error && <span style={{ color: 'red' }}>{error}</span>}
        </FormControl>
      }
    </ThemeProvider>
  );
};

export default Select;
