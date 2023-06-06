import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormControl, useColorModeValue, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Department } from '@/models/departmentResponse';
import useRead from '@/hooks/read/useRead';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type SelectDepartmentProps = {
  selectLabel: string;
  placeHolder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
  onChange: (value: string) => void; // New prop for handling value change
  param: string;
};

const Select: React.FC<SelectDepartmentProps> = ({
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeHolder,
  register,
  onChange, // Add the new onChange prop
  param,
}) => {
  const { GetDepartmentsByHeiID } = useRead();
  const [departmentArray, setDepartmentArray] = useState([] as Department[]);
  const theme = createTheme({
    // your theme configuration
  });
  console.log('param: ', param);

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await (
        await GetDepartmentsByHeiID(
          'https://localhost:5001/spGetOrganizationalUnitNamesForOrganization?heiId=' +
            param
        )
      ).departments; // Call the fetchData function
      console.log('departments hok içi:', data);
      if (data) {
        setDepartmentArray(data); // Update the state with the fetched data
      }
    };
    if (param) {
      onChange('');
      fetchInitialData();
    }
  }, [param]);

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
            onChange={(event, value) =>
              onChange(value?.organizationalUnitName || '')
            }
            disablePortal
            id={id}
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
        </FormControl>
      }
    </ThemeProvider>
  );
};

export default Select;
