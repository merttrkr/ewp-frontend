import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import InstitutionInformationForm from "./InstitutionInformationForm";
import InstitutionConditionsForm from "./InstitutionConditionsForm";

export default function TabComponent() {
  return (
    <Tabs variant="colorful" colorScheme="gray">
      <TabList>
        <Tab>Partner Kurumların Bilgileri</Tab>
        <Tab>Partner Kurumların İş Birliği Koşulları</Tab>
        <Tab>Ön İzleme / Kaydetme</Tab>
      </TabList>
      <TabPanels>
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
