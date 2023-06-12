import {
  Box,
  BoxProps,
  FormControl,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { Input } from '@chakra-ui/react';

interface DateInputProps {
  id: string;
  register: any; // Replace with the appropriate type for the `register` function from your form library
  placeholder: string;
  label: string;
  onChange: (selectedDate: string) => void;
  error?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  register,
  placeholder,
  label,
  onChange,
  error,
  ...rest
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputDate = event.target.valueAsDate;
    if (inputDate) {
      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
      const day = String(inputDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setSelectedDate(formattedDate);
      onChange(formattedDate);
    }
  };

  return (
    <FormControl>
      <Box {...rest}>
        <Heading
          pl='1'
          as='h3'
          size='sm'
          fontWeight='bold'
          color={HeadingColor}
          mb={2}
        >
          {label}
        </Heading>
        <Input
          id={id}
          ref={register}
          name={id}
          placeholder={placeholder}
          size='md'
          type='date'
          value={selectedDate}
          onChange={handleDateChange}
          isInvalid={!!error}
        />
        {error && (
          <Box mt={1} color='red.500' fontSize='sm'>
            {error}
          </Box>
        )}
      </Box>
    </FormControl>
  );
};

export default DateInput;
