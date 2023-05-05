import {
  Stack,
  Heading,
  useColorModeValue,
  Input,
  Checkbox,
  Text,
} from '@chakra-ui/react';

type CheckBoxInputProps = {
  checkBoxInputLabel: String;
  placeHolder: string;
};

export default function App({
  checkBoxInputLabel,
  placeHolder,
}: CheckBoxInputProps) {
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
        {checkBoxInputLabel}
      </Heading>
      <Checkbox
        pl={4}
        py={2}
        colorScheme='gray'
        border={0}
        borderRadius={'md'}
        bg={'gray.100'}
        defaultChecked
      >
        {placeHolder}
      </Checkbox>
    </Stack>
  );
}
