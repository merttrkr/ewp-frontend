import { Container, Heading, Stack, useColorModeValue } from '@chakra-ui/react';

type PageNameProps = {
  pageName: String;
};

export default function PageNameContainer({ pageName }: PageNameProps) {
  const HeaderBackground = useColorModeValue('white', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor =  useColorModeValue('gray.600', 'gray.100');
  return (
    <Stack w='full' bg={HeaderBackground} marginLeft={0} borderBottom='1px' borderColor={BorderColor}>
      <Heading pl={3} py={4}  as='h1' fontSize={'lg'}  fontWeight={'small'}  noOfLines={1} color={HeadingColor}>
        {pageName}
      </Heading>
    </Stack>
  );
}
