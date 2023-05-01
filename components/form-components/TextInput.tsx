import {
  Stack,
  Heading,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";

type TextInputProps = {
  textInputLabel: String;
  placeHolder: string;
};

export default function App({ textInputLabel,placeHolder }: TextInputProps) {
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
      >
        {textInputLabel}
      </Heading>
      <Input
        placeholder={placeHolder}
        bg={'gray.100'}
        border={0}
        color={'gray.500'}
        _placeholder={{
          color: 'gray.500',
        }}
      />
    </Stack>
  );
}
