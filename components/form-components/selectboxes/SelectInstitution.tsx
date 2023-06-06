import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormControl, useColorModeValue, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { InstitutionInfo } from '@/models/institutionInfoResponse';
import useRead from '@/hooks/read/useRead';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type SelectInstitutionProps = {
  selectLabel: string;
  placeHolder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
  onChange: (value: string) => void; // New prop for handling value change
};

const Select: React.FC<SelectInstitutionProps> = ({
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeHolder,
  register,
  onChange, // Add the new onChange prop
}) => {
  const theme = createTheme({
    // your theme configuration
  });

  const { GetAllUniversitiesInfo } = useRead();
  const [institutionInfoArray, setInstitutionInfoArray] = useState(
    [] as InstitutionInfo[]
  );

  //colors
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await (
        await GetAllUniversitiesInfo(
          'https://localhost:5001/spGetUniversityNamesForOrganization?uniShortName=all'
        )
      ).institutionInfos; // Call the fetchData function
      if (data) {
        setInstitutionInfoArray(data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
  }, []);

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
            onChange={(event, value) => onChange(value?.heiId || '')}
            disablePortal
            id={id}
            options={institutionInfoArray}
            getOptionLabel={(option) => option?.UniName || option.heiId}
            isOptionEqualToValue={(option, value) =>
              option.uniqueId === value.uniqueId
            }
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
