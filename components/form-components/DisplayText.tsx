import { Stack, Heading, useColorModeValue, Text } from '@chakra-ui/react';

type DisplayTextProps = {
  label: String;
  content: string;
};

export default function DisplayText({ label, content }: DisplayTextProps) {
  const HeadingColor = useColorModeValue('gray.700', 'gray.300');
  const TextColor = useColorModeValue('#20558B', 'gray.400');

  return (
    <Stack>
      <Heading
        pl='1'
        as='h3'
        fontSize='md'
        fontWeight={'medium'}
        color={HeadingColor}
      >
        {label}
      </Heading>
      <Text pl={2} fontWeight={'medium'} fontSize='sm' color={TextColor}>
        {content}
      </Text>
    </Stack>
  );
}
