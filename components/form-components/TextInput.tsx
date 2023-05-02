import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Stack, Heading, useColorModeValue, Input } from '@chakra-ui/react';

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  return (
    <Stack>
      <Heading
        pl='1'
        as='h3'
        size='sm'
        fontWeight={'bold'}
        noOfLines={1}
        color={HeadingColor}
      ></Heading>
      <label htmlFor={name} className='block text-ct-blue-600 mb-3'>
        {label}
      </label>
      <Input
        type={type}
        {...register(name)}
        placeholder='test'
        bg={'gray.100'}
        border={0}
        color={'gray.500'}
        _placeholder={{
          color: 'gray.500',
        }}
      />
    </Stack>
  );
};

export default FormInput;
