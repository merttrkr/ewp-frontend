import React from 'react';
import { Stack, Heading, useColorModeValue, Input, FormControl } from '@chakra-ui/react';

type SignatureInputProps = {
  label: string;
  id: string;
  placeholder: string;
  error: string | undefined;
  register: any;
  type?: string;
  isDisabled?: boolean;
};

const SignatureInput: React.FC<SignatureInputProps> = ({
  type = 'text',
  isDisabled = false,
  label,
  id,
  error,
  register,
  placeholder,
}) => {
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  return (
    <FormControl>
      <Heading
        pl='1'
        as='h3'
        size='sm'
        fontWeight='bold'
        color={HeadingColor}
        pb='2'
      >
        <label htmlFor={id}>{label}</label>
      </Heading>
      <Input
        height={14}
        fontStyle='italic'
        fontFamily='Dancing Script'
        fontWeight={600}
        fontSize='xl'
        id={id}
        placeholder={placeholder}
        {...register}
        isDisabled={isDisabled}
        type={type}
        bg='gray.100'
        border={0}
        color='gray.500'
        _placeholder={{
          color: 'gray.500',
        }}
        style={{
          import: "url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&display=swap')",
        }}
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </FormControl>
  );
};

export default SignatureInput;
