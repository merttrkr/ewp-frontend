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
import PreviewOrSaveForm from "./PreviewOrSaveForm";

export default function TabComponent() {
  return (
    <Tabs variant="colorful" colorScheme="gray">
      <TabList>
        <Tab>Öğrenciye Ait Bilgiler</Tab>
        <Tab>Gönderen Kurum / Üniversite Bilgisi</Tab>
        <Tab>Alıcı Kurum / Üniversite Bilgisi</Tab>
        <Tab>Hareketlilik (Mobilite) Programı</Tab>
        <Tab>Taahüt / İmza Bilgileri</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <InstitutionInformationForm
            pageName="Öğrenciye Ait Bilgiler"
            subText={""}
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
        <TabPanel>
          <PreviewOrSaveForm pageName="Kurumuma Ait Bilgiler" />
          <PreviewOrSaveForm pageName="Partner Kuruma Ait Bilgiler" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
