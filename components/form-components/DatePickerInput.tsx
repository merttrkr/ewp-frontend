import {
  Stack,
  Heading,
  useColorModeValue,
  Input,
  Checkbox,
  Text,
  Image,
  HStack,
  Flex,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";

type DatePickerInputProps = {
  datePickerInputLabel: String;
};

export default function App({ datePickerInputLabel }: DatePickerInputProps) {
  const HeadingColor = useColorModeValue("gray.600", "gray.100");
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Stack>
      <Heading
        pl="1"
        as="h3"
        size="sm"
        fontWeight={"bold"}
        noOfLines={1}
        color={HeadingColor}
      >
        {datePickerInputLabel}
      </Heading>
      <Flex
        gap={3}
        pl={3}
        height={10}
        bg={"gray.100"}
        borderRadius={"md"}
        align={"center"}
      >
        <Image
          width="4"
          height="4"
          src="/dateIcon.png"
          alt={"Date icon"}
        ></Image>
        <DatePicker
          wrapperClassName="datePicker"
          selected={startDate}
          onChange={(date: any) => setStartDate(date)}
        />
      </Flex>
    </Stack>
  );
}
