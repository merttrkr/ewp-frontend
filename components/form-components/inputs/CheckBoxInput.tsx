import React from 'react';
import {
  Stack,
  Heading,
  useColorModeValue,
  Checkbox,
  FormControl,
} from '@chakra-ui/react';

type CheckBoxInputProps = {
  checkBoxInputLabel: string;
  id: string;
  placeholder: string;
  error: string | undefined;
  register: any;
};

const CheckBoxInput: React.FC<CheckBoxInputProps> = ({
  checkBoxInputLabel,
  id,
  error,
  register,
  placeholder,
}) => {
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const BackgroundColor = useColorModeValue('gray.100', 'gray.600');
  return (
    <FormControl>
      <Stack>
        <Heading
          pl='1'
          as='h3'
          size='sm'
          fontWeight='bold'
          color={HeadingColor}
          pb='2'
        >
          {checkBoxInputLabel}
        </Heading>
        <Checkbox
          height={'10'}
          id={id}
          placeholder={placeholder}
          {...register}
          pl={4}
          py={6}
          colorScheme='gray'
          border={0}
          borderRadius='md'
          bg={BackgroundColor}
          defaultChecked
        >
          {placeholder}
        </Checkbox>
      </Stack>
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </FormControl>
  );
};

export default CheckBoxInput;
