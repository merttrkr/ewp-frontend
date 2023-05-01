import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Input,
  Select,
  SelectField,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';
import SelectAutoComplete from '@/components/form-components/SelectAutoComplete';

type InstitutionConditionsFormProps = {
  pageName: String;
  subText:String;
};

export default function InstitutionConditionsForm({
  pageName,subText,
}: InstitutionConditionsFormProps) {
  const HeaderBackground = useColorModeValue('gray.50', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const ButtonColor = useColorModeValue('#20558B', '#0E3051');
  const apos = "'";
  
  const ButtonHoverColor = useColorModeValue('#9C1F23', 'gray.600');
  return (
    <Stack
      margin= '5'
      marginBottom='20'
      pl={3}
      py={4}
      w='100%'
      bg={HeaderBackground}
      marginLeft={0}
      borderBottom='1px'
      borderColor={BorderColor}
    >
      <Heading
        as='h3'
        size='md'
        fontWeight={'medium'}
        noOfLines={1}
        color={HeadingColor}
      >
        {pageName}
      </Heading>
      <Text>{subText}</Text>

      <Box as={'form'} mt={10} boxShadow={'lg'} padding={5} >
      <Flex p='5'><SelectAutoComplete selectLabel='Koşul Seçiniz' /></Flex>
      
        <Flex>
        
          <Stack w='50%' spacing={4} p='5'>
          <SelectAutoComplete selectLabel='Gönderen Kurum / Üniversite' />
          <SelectAutoComplete selectLabel='Alıcı Kurum / Üniversite' />
          <SelectAutoComplete selectLabel='Gönderen Kurumdaki İletişim Kurulabilecek Yetkililer' />
          <SelectAutoComplete selectLabel='Hangi Akademik Yıllar Arasında Başlıyor ?' />
          <SelectAutoComplete selectLabel='Yıl Bazında Hareketlilik (mobilite) Sayısı' />
          <SelectAutoComplete selectLabel='ISCED Kodu ve Konu Alanları' />
          </Stack>
          <Stack w='50%' spacing={4} p='5'>
          <SelectAutoComplete selectLabel='Gönderen Kurumun İlgili Bölümü / Departmanı' />
          <SelectAutoComplete selectLabel='Alıcı Kurumun İlgili Bölümü / Departmanı' />
          <SelectAutoComplete selectLabel='Hangi Akademik Yıllar Arasında Bitiyor ?' />
          <SelectAutoComplete selectLabel='Gönderen Kurumun İlgili Bölümü / Departmanı' />
          
          <HStack spacing={4}>
          <SelectAutoComplete selectLabel='İstenilen Yabancı Dil' />
          <Box w={'50%'}>
            <SelectAutoComplete  selectLabel='Yabancı Dil Seviyesi' />
            </Box>
          
          </HStack>
            
          </Stack>
        </Flex>
        <Flex gap={3} justifyContent={'right'} pr={4}>
          <Button
            fontFamily={'heading'}
            mt={8}
            w={'15%'}
            bg={ButtonColor}
            color={'white'}
            _hover={{
              bg: ButtonHoverColor,
              boxShadow: 'xl',
            }}
          >
            Submit
          </Button>
          <Button
            border={'2px'}
            
            fontFamily={'heading'}
            mt={8}
            w={'15%'}
            bg='white'
            color={ButtonColor}
            _hover={{
              color:ButtonHoverColor,
              bg: 'white',
              boxShadow: 'xl',
              
            }}
          >
            Clear
          </Button>
        </Flex>
      </Box>
    </Stack>
  );
}
