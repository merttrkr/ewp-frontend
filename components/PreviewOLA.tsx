import {
  Box,
  Button,
  Flex,
  Stack,
  useColorModeValue,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import DisplayText from "./form-components/DisplayText";

type PreviewOLAProps = {
  OLA: String;
};

export default function PreviewOLA({ OLA }: PreviewOLAProps) {
  const HeaderBackground = useColorModeValue("#9C1F23", "#9C1F23");
  const FormBackground = useColorModeValue("gray.100", "gray.700");
  const BorderColor = useColorModeValue("gray.200", "gray.600");
  const TitleColor = useColorModeValue("#20558B", "gray.400");
  return (
    <Stack
      margin="6"
      bg={FormBackground}
      borderRadius={"xl"}
      align={"center"}
      justify={"center"}
    >
      <Flex
        align={"center"}
        justifyContent={"space-around"}
        bg={HeaderBackground}
        w={"full"}
        borderTopRadius={"xl"}
        padding={3}
        color={"white"}
      ></Flex>
      <Flex width={"full"} gap={5} justify={"space-around"}>
        <Flex display={"column"} justify={"flex-start"} width={"50%"}>
          <DisplayText
            label={"Seçilen Hareketlilik Tipi: "}
            content={"Long-term mobility"}
          ></DisplayText>
          <DisplayText
            label={"Hareketlilik Başlangıç Tarihi: "}
            content={"26/12/2022"}
          ></DisplayText>
        </Flex>
        <Flex display={"column"} justify={"flex-start"} width={"50%"}>
          <DisplayText
            label={"Hareketlilik Bitiş Tarihi: "}
            content={"26/12/2027"}
          ></DisplayText>
          <DisplayText
            label={"Hareketlilik Bitiş Tarihi: "}
            content={"26/12/2027"}
          ></DisplayText>
        </Flex>
      </Flex>
      <Flex pt={1} pb={4}>
        <Button variant="autoWidthFull">Anlaşma Detaylarını Görüntüle</Button>
      </Flex>
    </Stack>
  );
}
