import {
  Stack,
  Heading,
  useColorModeValue,
  Image,
  Flex,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { format } from 'date-fns';

type DatePickerInputProps = {
  datePickerInputLabel: string;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
};

export default function DatePickerInput({
  datePickerInputLabel,
  startDate,
  setStartDate,
}: DatePickerInputProps) {
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');

  return (
    <Stack>
      <Heading
        pl='1'
        as='h3'
        size='sm'
        fontWeight='bold'
        noOfLines={1}
        color={HeadingColor}
      >
        {datePickerInputLabel}
      </Heading>
      <Flex
        gap={3}
        pl={3}
        height={10}
        bg='gray.100'
        borderRadius='md'
        align='center'
      >
        <Image width='4' height='4' src='/dateIcon.png' alt='Date icon' />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date as Date)}
          name={datePickerInputLabel}
          dateFormat='yyyy-MM-dd'
          value={format(startDate, 'yyyy-MM-dd')}
        />
      </Flex>
    </Stack>
  );
}
