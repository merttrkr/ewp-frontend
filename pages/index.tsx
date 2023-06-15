import Image from 'next/image';
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

const logoSrc = '/logo_ewp.png';
const darkLogoSrc = '/logo_ewp_dark.png';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const ContainerBackground = useColorModeValue('gray.100', 'gray.700');
  return (
    <Flex
      width={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
      paddingY={25}
    >
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        padding={'10%'}
        borderBottom='1px'
        bg={ContainerBackground}
        borderColor={ContainerBackground}
        borderRadius={'xl'}
        width={'80%'}
        gap={5}
        flexDirection={'column'}
      >
        <Image
          width={150}
          height={150}
          src={colorMode === 'light' ? logoSrc : darkLogoSrc}
          alt={'EWP Logo'}
        />
        <Box>
          <Heading color='#9C1F23'>EWP IYTE&apos;ye hoş geldiniz!</Heading>
        </Box>
      </Flex>
    </Flex>
  );
}
