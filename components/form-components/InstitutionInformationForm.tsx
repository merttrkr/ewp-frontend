import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Select,
  SelectField,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";
import SelectAutoComplete from "@/components/form-components/SelectAutoComplete";

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
  const ButtonColor = useColorModeValue("#20558B", "#0E3051");
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
        <Flex>
          <Stack w="50%" spacing={4} p="5">
            <SelectAutoComplete selectLabel="Kurum / Üniversite Adı" />
            <Stack>
              <Heading
                pl="1"
                as="h3"
                size="sm"
                fontWeight={"bold"}
                noOfLines={1}
                color={HeadingColor}
              >
                İkili Anlaşma Kodu (IIA-Kodu)
              </Heading>
              <Input
                placeholder="IIA-15"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
            </Stack>

            <Stack>
              <Heading
                pl="1"
                as="h3"
                size="sm"
                fontWeight={"bold"}
                noOfLines={1}
                color={HeadingColor}
              >
                Anlaşmayı İmzalayacak Yetkili
              </Heading>
              <Input
                placeholder="Mert Türker"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
            </Stack>
            <SelectAutoComplete selectLabel="İletişim Kurulabilecek Yetkililer" />
          </Stack>
          <Stack w="50%" spacing={4} p="5">
            <SelectAutoComplete selectLabel="Departman / Bölüm Adı" />
            <Stack>
              <Heading
                pl="1"
                as="h3"
                size="sm"
                fontWeight={"bold"}
                noOfLines={1}
                color={HeadingColor}
              >
                İkili Anlaşma ID{apos}si (IIA-ID)
              </Heading>
              <Input
                placeholder="IIA-15"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
            </Stack>

            <Stack>
              <Heading
                pl="1"
                as="h3"
                size="sm"
                fontWeight={"bold"}
                noOfLines={1}
                color={HeadingColor}
              >
                İmzalanma Tarihi
              </Heading>
              <Input
                placeholder="Mert Türker"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
            </Stack>
          </Stack>
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
            w={"15%"}
            bg="white"
            color={ButtonColor}
            _hover={{
              color: ButtonHoverColor,
              bg: "white",
              boxShadow: "xl",
            }}
          >
            Temizle
          </Button>
        </Flex>
      </Box>
    </Stack>
  );
}
