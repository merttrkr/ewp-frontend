import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormControl, useColorModeValue, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import useRead from '@/hooks/read/useRead';
import { CollaborationConditionType } from '@/models/response/collaborationConditionTypeResponse';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type SelectCollaborationConditionProps = {
  selectLabel: string;
  placeholder: string;
  isDisabled?: boolean;
  id?: string;
  register: any;
  onChange: (value: CollaborationConditionType | null) => void; // New prop for handling value change
  error: string | undefined;
};

const SelectCollaborationCondition: React.FC<
  SelectCollaborationConditionProps
> = ({
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeholder,
  register,
  error,
  onChange, // Add the new onChange prop
}) => {
  const { GetCollaborationConditionTypes } = useRead();
  const [collaborationConditionArray, setCollaborationConditionArray] =
    useState<CollaborationConditionType[]>([]);
  const theme = createTheme({
    // your theme configuration
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await GetCollaborationConditionTypes(
        'https://localhost:5001/spGetCollaborationConditionTypes'
      ); // Call the GetCollaborationConditionTypes function
      if (data) {
        console.log('data: ', data); // Process the fetched data
        setCollaborationConditionArray(data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
  }, []);

  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
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
            options={collaborationConditionArray}
            getOptionLabel={(option) => option.type}
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

export default SelectCollaborationCondition;
