import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import SelectAutoComplete from "@/components/form-components/SelectAutoComplete";
import TextInput from "@/components/form-components/TextInput";
import CheckBoxInput from "@/components/form-components/CheckBoxInput";
type InstitutionConditionsFormProps = {
  pageName: String;
  subText: String;
};

export default function InstitutionConditionsForm({
  pageName,
  subText,
}: InstitutionConditionsFormProps) {
  const HeaderBackground = useColorModeValue("gray.100", "gray.800");
  const BorderColor = useColorModeValue("gray.200", "gray.600");
  const HeadingColor = useColorModeValue("gray.600", "gray.100");
  const ButtonColor = useColorModeValue("#20558B", "#0E3051");
  const FormBackground = useColorModeValue("gray.50", "gray.700");
  const apos = "'";

  const ButtonHoverColor = useColorModeValue("#9C1F23", "gray.600");
  return (
    <Stack
      margin="5"
      marginBottom="20"
      px={6}
      py={6}
      w="100%"
      bg={HeaderBackground}
      marginLeft={0}
      borderBottom="1px"
      borderColor={BorderColor}
      borderRadius={"xl"}
    >
      <Box pl={6} py={4}>
        <Heading
          as="h3"
          size="md"
          fontWeight={"medium"}
          noOfLines={1}
          color={HeadingColor}
        >
          {pageName}
        </Heading>
        <Text>{subText}</Text>
      </Box>

      <Box
        as={"form"}
        mt={10}
        boxShadow={"lg"}
        padding={5}
        bg={FormBackground}
        borderRadius={"xl"}
      >
        <Flex p="5">
          <SelectAutoComplete selectLabel="Koşul Seçiniz" />
        </Flex>

        <Flex>
          <Stack w="50%" spacing={4} p="5">
            <SelectAutoComplete selectLabel="Gönderen Kurum / Üniversite" />
            <SelectAutoComplete selectLabel="Alıcı Kurum / Üniversite" />
            <SelectAutoComplete selectLabel="Gönderen Kurumdaki İletişim Kurulabilecek Yetkililer" />
            <SelectAutoComplete selectLabel="Hangi Akademik Yıllar Arasında Başlıyor ?" />
            <SelectAutoComplete selectLabel="Yıl Bazında Hareketlilik (mobilite) Sayısı" />
            <SelectAutoComplete selectLabel="ISCED Kodu ve Konu Alanları" />
            <TextInput
              placeHolder="0"
              textInputLabel="Yıl Bazında Toplam Ay sayısı"
            />
          </Stack>
          <Stack w="50%" spacing={4} p="5">
            <SelectAutoComplete selectLabel="Gönderen Kurumun İlgili Bölümü / Departmanı" />
            <SelectAutoComplete selectLabel="Alıcı Kurumun İlgili Bölümü / Departmanı" />
            <SelectAutoComplete selectLabel="Hangi Akademik Yıllar Arasında Bitiyor ?" />
            <SelectAutoComplete selectLabel="Gönderen Kurumun İlgili Bölümü / Departmanı" />
            <CheckBoxInput
              placeHolder="Karma"
              checkBoxInputLabel="Karma Eğitim Olacaksa Aşağıdaki Kutucuğu İşaretleyiniz"
            />
            <HStack spacing={4}>
              <SelectAutoComplete selectLabel="İstenilen Yabancı Dil" />
              <Box w={"50%"}>
                <SelectAutoComplete selectLabel="Seviyesi" />
              </Box>
            </HStack>
          </Stack>
        </Flex>
        <Flex p="5">
          <SelectAutoComplete selectLabel="Öğrenim Seviyesini Seçiniz" />
        </Flex>

        <Flex gap={3} justifyContent={"right"} pr={4}>
          <Button
            fontFamily={"heading"}
            mt={8}
            w={"15%"}
            bg={ButtonColor}
            color={"white"}
            _hover={{
              bg: ButtonHoverColor,
              boxShadow: "xl",
            }}
          >
            Kaydet
          </Button>
          <Button
            border={"2px"}
            fontFamily={"heading"}
            mt={8}
            w={"auto"}
            color={ButtonColor}
            _hover={{
              color: ButtonHoverColor,
              bg: "white",
              boxShadow: "xl",
            }}
          >
            Aynı Koşulları Partnerime De Ekle
          </Button>
          <Button
            border={"2px"}
            fontFamily={"heading"}
            mt={8}
            w={"10%"}
            bg="white"
            color={ButtonColor}
            _hover={{
              color: ButtonHoverColor,
              bg: "white",
              boxShadow: "xl",
            }}
          >
            Clear
          </Button>
        </Flex>
      </Box>
    </Stack>
  );
}
