import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, Heading, useColorModeValue } from '@chakra-ui/react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { InstitutionInfo } from '@/models/response/institutionInfoResponse';
import useRead from '@/hooks/read/useRead';

type SelectInstitutionProps = {
  selectLabel: string;
  placeHolder: string;
  isDisabled?: boolean;
  id?: string;
  register: any; // Replace with the appropriate type for `register`
  onChange: (value: InstitutionInfo | null) => void;
  error: string | undefined;
  apiURL: string; // Add the prop for the API URL
  inputValue?: number |string ;
};

const Select: React.FC<SelectInstitutionProps> = ({
  isDisabled = false,
  selectLabel,
  id = 'default-select',
  placeHolder,
  register,
  onChange,
  error,
  apiURL,
  inputValue= null,
}) => {
  const theme = createTheme({
    // your theme configuration
  });

  const { GetAllUniversitiesInfo } = useRead();
  const [institutionInfoArray, setInstitutionInfoArray] = useState<
    InstitutionInfo[]
  >([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await GetAllUniversitiesInfo(apiURL);
        if (data && data.institutionInfos) {
          setInstitutionInfoArray(data.institutionInfos);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error here (e.g., show an error message)
      }
    };
    fetchInitialData();
  }, [apiURL]);

  const HeadingColor = useColorModeValue('gray.600', 'gray.100');

  useEffect(() => {
    // Check if inputValue is provided and not null
    if (inputValue !== null && typeof inputValue === 'number') {
      // Find the nationality with matching id
      const selectedDepartman = institutionInfoArray.find(
        (type) => type.uniqueId === inputValue
      );
      // Call the onChange prop with the selected nationality
      onChange(selectedDepartman || null);
    } 
    if (typeof inputValue === 'string') {
      // Find the institutionInfo with matching uniqueId
      const selectedDepartman = institutionInfoArray.find(
        (type) => type.heiId === inputValue
      );
      // Call the onChange prop with the selected institutionInfo
      onChange(selectedDepartman || null);
    } 
  
  }, [inputValue, institutionInfoArray, onChange]);

  return (
    <ThemeProvider theme={theme}>
      <FormControl>
        <Heading pl='1' pb='2' size='sm' fontWeight='bold' color={HeadingColor}>
          <label htmlFor={id}>{selectLabel}</label>
        </Heading>
        <Autocomplete
          disabled={isDisabled}
          onChange={(event, value) => onChange(value || null)}
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
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </FormControl>
    </ThemeProvider>
  );
};

export default Select;
