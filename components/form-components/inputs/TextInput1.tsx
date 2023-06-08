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
  name: string;
  placeHolder: string;
  type?: string;
  isDisabled?: boolean;
};

const FormInput: React.FC<FormInputProps> = ({
  isDisabled = false,
  label,
  name,
  type = 'text',
  placeHolder,
}) => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  return (
    <Stack>
      <FormControl>
        <Heading
          pl='1'
          as='h3'
          size='sm'
          fontWeight={'bold'}
          color={HeadingColor}
          pb='2'
        >
          <label htmlFor={name}>{label}</label>
        </Heading>
        <Input
          isDisabled={isDisabled}
          type={type}
          {...register(name)}
          placeholder={placeHolder}
          bg={'gray.100'}
          border={0}
          color={'gray.500'}
          _placeholder={{
            color: 'gray.500',
          }}
        />
      </FormControl>
    </Stack>
  );
};

export default FormInput;
