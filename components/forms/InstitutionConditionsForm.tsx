import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import SelectAutoComplete from '@/components/form-components/SelectAutoComplete';
import TextInput from '@/components/form-components/inputs/TextInput';
import CheckBoxInput from '@/components/form-components/inputs/CheckBoxInput';
import useRead from '@/hooks/read/useRead';
type InstitutionConditionsFormProps = {
  pageName: String;
  subText: String;
};

export default function InstitutionConditionsForm({
  pageName,
  subText,
}: InstitutionConditionsFormProps) {
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const FormBackground = useColorModeValue('gray.50', 'gray.700');
  const { GetCollaborationConditionTypes } = useRead();

  async function handle() {
    const fetchInitialData = async () => {
      const data = await GetCollaborationConditionTypes(
        'https:localhost:5001/spGetCollaborationConditionTypes'
      ); // Call the fetchData function
      if (data) {
        console.log('data: ', data); // Update the state with the fetched data
      }
    };
    fetchInitialData();
  }
  handle();

  return (
    <Stack
      marginBottom='20'
      px={6}
      py={6}
      w='100%'
      bg={HeaderBackground}
      marginLeft={0}
      borderBottom='1px'
      borderColor={BorderColor}
      borderRadius={'xl'}
    >
      <Box pl={6} py={4}>
        <Heading as='h3' size='md' fontWeight={'medium'} color={HeadingColor}>
          {pageName}
        </Heading>
        <Text>{subText}</Text>
      </Box>

      <Box
        as={'form'}
        mt={10}
        boxShadow={'lg'}
        padding={5}
        bg={FormBackground}
        borderRadius={'xl'}
      >
        <Flex p='5'>
          <SelectAutoComplete
            placeHolder='placeholder..'
            selectLabel='Koşul Seçiniz'
          />
        </Flex>

        <Flex>
          <Stack w='50%' spacing={4} p='5'>
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Gönderen Kurum / Üniversite'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Alıcı Kurum / Üniversite'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Gönderen Kurumdaki İletişim Kurulabilecek Yetkililer'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Hangi Akademik Yıllar Arasında Başlıyor ?'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Yıl Bazında Hareketlilik (mobilite) Sayısı'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='ISCED Kodu ve Konu Alanları'
            />
            <TextInput
              placeHolder='placeholder..'
              name='0'
              label='Yıl Bazında Toplam Ay sayısı'
            />
          </Stack>
          <Stack w='50%' spacing={4} p='5'>
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Gönderen Kurumun İlgili Bölümü / Departmanı'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Alıcı Kurumun İlgili Bölümü / Departmanı'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Hangi Akademik Yıllar Arasında Bitiyor ?'
            />
            <SelectAutoComplete
              placeHolder='placeholder..'
              selectLabel='Gönderen Kurumun İlgili Bölümü / Departmanı'
            />
            <CheckBoxInput
              placeHolder='Karma'
              checkBoxInputLabel='Karma Eğitim Olacaksa Aşağıdaki Kutucuğu İşaretleyiniz'
            />
            <HStack spacing={4}>
              <SelectAutoComplete
                placeHolder='placeholder..'
                selectLabel='İstenilen Yabancı Dil'
              />
              <Box w={'50%'}>
                <SelectAutoComplete
                  placeHolder='placeholder..'
                  selectLabel='Seviyesi'
                />
              </Box>
            </HStack>
          </Stack>
        </Flex>
        <Flex p='5'>
          <SelectAutoComplete
            placeHolder='placeholder..'
            selectLabel='Öğrenim Seviyesini Seçiniz'
          />
        </Flex>

        <Flex gap={3} justifyContent={'right'} pr={4} mt={'8'}>
          <Button variant='submit'>Kaydet</Button>
          <Button variant='condition'>Aynı Koşulları Partnerime De Ekle</Button>
          <Button variant='clear'>Clear</Button>
        </Flex>
      </Box>
    </Stack>
  );
}
