import React from 'react';
import { useFormContext, useForm } from 'react-hook-form';
import {
  Stack,
  Heading,
  useColorModeValue,
  Input,
  FormControl,
} from '@chakra-ui/react';

type FormInputProps = {
  label: string;
  id: string;
  placeholder: string;
  error: string | undefined;
  register: any;
  type?: string;
  isDisabled?: boolean;
  value?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  type = 'text',
  isDisabled = false,
  label,
  id,
  error,
  register,
  placeholder,
  value = 'placeholder',
}) => {
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  return (
    <FormControl isInvalid={!!error}>
      <Heading
        pl='1'
        as='h3'
        size='sm'
        fontWeight={'bold'}
        color={HeadingColor}
        pb='2'
      >
        <label htmlFor={id}>{label}</label>
      </Heading>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        {...register}
        isDisabled={isDisabled}
        type={type}
        bg={'gray.100'}
        border={0}
        color={'gray.500'}
        _placeholder={{
          color: 'gray.500',
        }}
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </FormControl>
  );
};

export default FormInput;
