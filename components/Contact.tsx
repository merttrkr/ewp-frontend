import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';

import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md';
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';

export default function Contact() {
  return (
    <Container
      bg={useColorModeValue('white', 'gray.800')}
      maxW='full'
      mt={0}
      centerContent
      overflow='hidden'
    >
      <Flex>
        <Box
          bg={useColorModeValue('gray.50', 'gray.700')}
          color={useColorModeValue('black', 'gray.700')}
          borderRadius='lg'
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading
                    ml={6}
                    color={useColorModeValue('gray.800', 'white')}
                  >
                    Contact
                  </Heading>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems='flex-start'>
                      <Button
                        size='md'
                        height='48px'
                        width='200px'
                        variant='ghost'
                        color={useColorModeValue('gray.800', 'gray.200')}
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdPhone color='#1970F1' size='20px' />}
                      >
                        +91-988888888
                      </Button>
                      <Button
                        size='md'
                        height='48px'
                        width='200px'
                        variant='ghost'
                        color={useColorModeValue('gray.800', 'gray.200')}
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdEmail color='#1970F1' size='20px' />}
                      >
                        hello@abc.com
                      </Button>
                      <Button
                        size='md'
                        height='48px'
                        width='200px'
                        variant='ghost'
                        color={useColorModeValue('gray.800', 'gray.200')}
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdLocationOn color='#1970F1' size='20px' />}
                        pr={10}
                      >
                        İzmir, Turkey
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems='flex-start'
                  >
                    <IconButton
                      aria-label='facebook'
                      variant='ghost'
                      size='lg'
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<MdFacebook size='28px' />}
                    />
                    <IconButton
                      aria-label='github'
                      variant='ghost'
                      size='lg'
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<BsGithub size='28px' />}
                    />
                    <IconButton
                      aria-label='discord'
                      variant='ghost'
                      size='lg'
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<BsDiscord size='28px' />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box
                  bg={useColorModeValue('gray.100', 'gray.700')}
                  borderRadius='lg'
                  paddingBottom={6}
                  borderColor={useColorModeValue('gray.100', 'gray.600')}
                >
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d12186.433602668554!2d28.940588399999996!3d40.21777305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1srobotaryum!5e0!3m2!1str!2str!4v1680615530471!5m2!1str!2str'
                    width='400'
                    height='400'
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                  ></iframe>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
