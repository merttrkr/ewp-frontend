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
import DisplayText from "./form-components/DisplayText";
import TextInput from "./form-components/TextInput";
import SelectAutoComplete from "./form-components/SelectAutoComplete";

type PreviewOrSaveFormProps = {
  pageName: String;
};

export default function PreviewOrSaveForm({
  pageName,
}: PreviewOrSaveFormProps) {
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
      align={"center"}
    >
      <Heading
        pl={6}
        py={4}
        as="h3"
        size="md"
        fontWeight={"medium"}
        noOfLines={1}
        color={HeadingColor}
      >
        {pageName}
      </Heading>
      <Flex gap={3} justifyContent={"right"} pr={4}>
        <Button variant="condition" type="submit">
          Anlaşmayı Taslak Olarak Kaydet
        </Button>
        <Button variant="submit" type="reset">
          Karşı Kuruma Anlaşma Bildirimi Gönder
        </Button>
        <Button variant="submit" type="reset">
          Anlaşmayı Onayla
        </Button>
      </Flex>
      <Box
        w={"full"}
        mt={10}
        boxShadow={"lg"}
        padding={5}
        bg={FormBackground}
        borderRadius={"xl"}
      >
        <Flex>
          <Stack w="50%" spacing={4} p="5">
            <DisplayText
              label={"Kurum / Üniversite Adı"}
              content={"İyte"}
            ></DisplayText>
            <DisplayText
              label={"İkili Anlaşma Kodu (IIA-Kodu)"}
              content={"IIA-15"}
            ></DisplayText>
            <DisplayText
              label={"Anlaşmayı İmzalayacak Yetkili"}
              content={"Mert Türker"}
            ></DisplayText>
            <DisplayText
              label={"İletişim Kurulabilecek Yetkililer"}
              content={"Mert Türker"}
            ></DisplayText>
          </Stack>
          <Stack w="50%" spacing={4} p="5">
            <DisplayText
              label={"Departman / Bölüm Adı"}
              content={"Bilgisayar Mühendisliği"}
            ></DisplayText>
            <DisplayText
              label={"İkili Anlaşma IDsi (IIA-ID)"}
              content={"IIA-15"}
            ></DisplayText>
            <DisplayText label="İmzalanma Tarihi" content={"12/4/2023"} />
            <Flex w={"full"} bg={"gray.100"}></Flex>
          </Stack>
        </Flex>
      </Box>
    </Stack>
  );
}
