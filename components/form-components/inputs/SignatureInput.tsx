import React from 'react';
import { useFormContext, useForm } from 'react-hook-form';
import {
  Stack,
  Heading,
  useColorModeValue,
  Input,
  FormControl,
} from '@chakra-ui/react';

type SignatureInputProps = {
  label: string;
  name: string;
  type?: string;
};

const SignatureInput: React.FC<SignatureInputProps> = ({
  label,
  name,
  type = 'text',
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
          type={type}
          {...register(name)}
          bg={'gray.100'}
          border={0}
          color={'gray.500'}
          _placeholder={{
            color: 'gray.500',
          }}
          width={300}
          height={70}
        />
      </FormControl>
    </Stack>
  );
};

export default SignatureInput;
