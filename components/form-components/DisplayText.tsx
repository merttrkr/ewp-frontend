import { Stack, Heading, useColorModeValue, Text } from '@chakra-ui/react';

type DisplayTextProps = {
  label: String;
  content: string;
};

export default function DisplayText({ label, content }: DisplayTextProps) {
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
        {label}
      </Heading>
      <Text pl={2} fontWeight={'medium'} color={'#20558B'}>
        {content}
      </Text>
    </Stack>
  );
}
