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

type PreviewIIAProps = {
  IIA: String;
};

export default function PreviewIIA({ IIA }: PreviewIIAProps) {
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
      >
        <Box fontSize="md" width={"33%"} align={"center"}>
          Kurum Adları
        </Box>
        <Box width={"33%"} align={"center"}>
          <VStack>
            <Text fontSize="md">Kendi Kurumum</Text>
            <Text fontSize="sm">
              Izmir Institute Of Technology[iyte.edu.tr]
            </Text>
          </VStack>
        </Box>
        <Box width={"33%"} align={"center"}>
          <VStack>
            <Text fontSize="md">Partnerim</Text>
            <Text fontSize="sm">Selcuk University[selcuk.edu.tr]</Text>
          </VStack>
        </Box>
      </Flex>
      <Flex direction={"column"} width={"full"}>
        <HStack
          justify={"space-evenly"}
          borderBottom={"2px"}
          borderColor={BorderColor}
          py={"2"}
        >
          <Box
            fontSize="sm"
            width={"33%"}
            align={"center"}
            color={TitleColor}
            fontWeight={"medium"}
          >
            Anlaşmanın Durumu
          </Box>
          <Box fontSize="sm" width={"33%"} align={"center"}>
            Selçuk university tarafından onaylanmayı bekliyor
          </Box>
          <Box fontSize="sm" width={"33%"} align={"center"}>
            Selçuk university tarafından onaylanmayı bekliyor
          </Box>
        </HStack>
        <HStack
          justifyContent={"space-evenly"}
          borderBottom={"2px"}
          borderColor={BorderColor}
          py={"2"}
        >
          <Box
            fontSize="sm"
            width={"33%"}
            align={"center"}
            color={TitleColor}
            fontWeight={"medium"}
          >
            Anlaşmanın IIA Kodu
          </Box>
          <Box fontSize="sm" width={"33%"} align={"center"}>
            IIA-1
          </Box>
          <Box fontSize="sm" width={"33%"} align={"center"}></Box>
        </HStack>
        <HStack
          justifyContent={"space-evenly"}
          borderBottom={"2px"}
          borderColor={BorderColor}
          py={"2"}
        >
          <Box
            fontSize="sm"
            width={"33%"}
            align={"center"}
            color={TitleColor}
            fontWeight={"medium"}
          >
            Erasmus Kodu
          </Box>
          <Box fontSize="sm" width={"33%"} align={"center"}>
            TR IZMIR03
          </Box>
          <Box fontSize="sm" width={"33%"} align={"center"}>
            TR KONYA03
          </Box>
        </HStack>
        <HStack
          justifyContent={"space-evenly"}
          borderBottom={"2px"}
          borderColor={BorderColor}
          py={"2"}
        >
          <Box
            fontSize="sm"
            width={"33%"}
            align={"center"}
            color={TitleColor}
            fontWeight={"medium"}
          >
            Son Güncellenme Tarihi
          </Box>
          <Box fontSize="sm" width={"33%"} align={"center"}>
            04/05/2023 23.18
          </Box>
          <Box fontSize="sm" width={"33%"} align={"center"}>
            04/05/2023 23.18
          </Box>
        </HStack>
      </Flex>
      <Flex pt={1} pb={4}>
        <Button variant="previewOrSave" type="submit">
          Anlaşma Detaylarını Görüntüle
        </Button>
      </Flex>
    </Stack>
  );
}
