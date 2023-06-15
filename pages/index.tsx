import Image from 'next/image';
import { Box, Flex, Heading, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';



export default function Home() {
  const { colorMode } = useColorMode();
  const containerBackground = useColorModeValue('gray.100', 'gray.700');
  const accentColor = useColorModeValue('gray.700', 'gray.300');
  const logoSize = colorMode === 'light' ? 200 : 250;
  const logoAltText = 'EWP Logo';
  const logoSrc = '/logo_ewp.png';
  const darkLogoSrc = '/logo_ewp_dark.png';

  return (
    <Flex
      width='100%'
      height='100vh'
      alignItems='center'
      justifyContent='center'
      bg={useColorModeValue('gray.200', 'gray.800')}
    >
      <Flex
        justifyContent='center'
        alignItems='center'
        padding='8%'
        bg={containerBackground}
        borderRadius='xl'
        width={['90%', '80%']}
        flexDirection='column'
        boxShadow='2xl'
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            width={logoSize}
            height={logoSize}
            src={colorMode === 'light' ? logoSrc : darkLogoSrc}
            alt={logoAltText}
          />
        </motion.div>
        <Box mt={6}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Heading color={accentColor} fontSize={['4xl', '5xl']} textAlign='center'>
              EWP IYTE&apos;ye hoş geldiniz!
            </Heading>
          </motion.div>
        </Box>
      </Flex>
    </Flex>
  );
}
