import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import InstitutionInformationForm from "./form-components/InstitutionInformationForm";
import InstitutionConditionsForm from "./form-components/InstitutionConditionsForm";

export default function TabComponent() {
  const HeaderBackground = useColorModeValue("white", "gray.800");
  const BorderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Tabs isFitted variant="enclosed">
      <TabList
        shadow={"md"}
        borderTop={"aliceblue"}
        mb="1em"
        bg={"gray.50"}
        px={12}
        pt={1}
      >
        <Tab
          _selected={{
            bg: "gray.100",
            color: "#9C1F23",
            borderColor: "inherit",
            borderBottom: "none",
            mb: "-2px",
            fontWeight: "medium",
            fontSize: "sm",
          }}
          _hover={{
            bg: "gray.200",
          }}
          fontWeight={"small"}
          fontSize={"sm"}
          m="1"
          justifyContent={"left"}
          borderRight="1px"
          borderColor={"gray.100"}
          pl={"5"}
          borderTopRadius={"xl"}
        >
          Partner Kurumların Bilgileri
        </Tab>
        <Tab
          _selected={{
            bg: "gray.100",
            color: "#9C1F23",
            borderColor: "inherit",
            borderBottom: "none",
            mb: "-2px",
            fontWeight: "medium",
            fontSize: "sm",
          }}
          _hover={{
            bg: "gray.200",
          }}
          fontWeight={"small"}
          fontSize={"sm"}
          m="1"
          justifyContent={"left"}
          borderRight="1px"
          borderColor={"gray.100"}
          pl={"5"}
          borderTopRadius={"xl"}
        >
          Partner Kurumların İş Birliği Koşulları
        </Tab>
        <Tab
          _selected={{
            bg: "gray.100",
            color: "#9C1F23",
            borderColor: "inherit",
            borderBottom: "none",
            mb: "-2px",
            fontWeight: "medium",
            fontSize: "sm",
          }}
          _hover={{
            bg: "gray.200",
          }}
          fontWeight={"small"}
          fontSize={"sm"}
          m="1"
          justifyContent={"left"}
          borderRight="1px"
          borderColor={"gray.100"}
          pl={"5"}
          borderTopRadius={"xl"}
        >
          Ön İzleme / Kaydetme
        </Tab>
      </TabList>
      <TabPanels px={"10"}>
        <TabPanel>
          <InstitutionInformationForm
            pageName="Kurum Bilgilerim"
            subText={"Lütfen kurumunuzun bilgilerini doldurunuz."}
          />
          <InstitutionInformationForm
            pageName="Partner Kurum Bilgileri"
            subText={"Lütfen partner kurumun bilgilerini doldurunuz."}
          />
        </TabPanel>
        <TabPanel>
          <InstitutionConditionsForm
            pageName="Kurumuma Ait Koşullar"
            subText={"Lütfen kurumunuza ait koşulları doldurunuz."}
          />
          <InstitutionConditionsForm
            pageName="Partner Kuruma Ait Koşullar"
            subText={"Lütfen partner kuruma ait koşulları doldurunuz."}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
