import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import SelectAutoComplete from "@/components/form-components/SelectAutoComplete";
import TextInput from "./form-components/TextInput";
import DatePickerInput from "./form-components/DatePickerInput";

type InstitutionInformationFormProps = {
  pageName: String;
  subText: String;
};

export default function InstitutionInformationForm({
  pageName,
  subText,
}: InstitutionInformationFormProps) {
  const HeaderBackground = useColorModeValue("gray.100", "gray.800");
  const FormBackground = useColorModeValue("gray.50", "gray.700");
  const BorderColor = useColorModeValue("gray.200", "gray.600");
  const HeadingColor = useColorModeValue("gray.600", "gray.100");
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
        <Flex>
          <Stack w="50%" spacing={4} p="5">
            <SelectAutoComplete selectLabel="Kurum / Üniversite Adı" />
            <TextInput
              placeHolder="IIA-15"
              textInputLabel="İkili Anlaşma Kodu (IIA-Kodu)"
            />
            <TextInput
              placeHolder="Mert Türker"
              textInputLabel="Anlaşmayı İmzalayacak Yetkili"
            />

            <SelectAutoComplete selectLabel="İletişim Kurulabilecek Yetkililer" />
          </Stack>
          <Stack w="50%" spacing={4} p="5">
            <SelectAutoComplete selectLabel="Departman / Bölüm Adı" />
            <TextInput
              placeHolder="IIA-15"
              textInputLabel="İkili Anlaşma IDsi (IIA-ID)"
            />
            <DatePickerInput datePickerInputLabel="İmzalanma Tarihi" />
            <Flex w={"full"} bg={"gray.100"}></Flex>
          </Stack>
        </Flex>
        <Flex gap={3} justifyContent={"right"} pr={4}>
          <Button variant="submit">Kaydet</Button>
          <Button variant="clear">Temizle</Button>
        </Flex>
      </Box>
    </Stack>
  );
}