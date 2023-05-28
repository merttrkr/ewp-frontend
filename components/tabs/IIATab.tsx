import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  Text,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import InstitutionInformationForm from '../forms/InstitutionInformationForm';
import InstitutionConditionsForm from '../forms/InstitutionConditionsForm';
import PreviewOrSaveForm from '../forms/PreviewOrSaveForm';

export default function TabComponent() {
  const HeadingColor = useColorModeValue('gray.600', 'gray.100');
  const HeaderBackground = useColorModeValue('gray.100', 'gray.800');
  return (
    <Tabs variant='colorful' colorScheme='gray'>
      <TabList>
        <Tab>Partner Kurumların Bilgileri</Tab>
        <Tab>Partner Kurumların İş Birliği Koşulları</Tab>
        <Tab>Ön İzleme / Kaydetme</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <InstitutionInformationForm
            pageName='Kurum Bilgilerim'
            subText={'Lütfen kurumunuzun bilgilerini doldurunuz.'}
          />
          <InstitutionInformationForm
            pageName='Partner Kurum Bilgileri'
            subText={'Lütfen partner kurumun bilgilerini doldurunuz.'}
          />
        </TabPanel>
        <TabPanel>
          <InstitutionConditionsForm
            pageName='Kurumuma Ait Koşullar'
            subText={'Lütfen kurumunuza ait koşulları doldurunuz.'}
          />
          <InstitutionConditionsForm
            pageName='Partner Kuruma Ait Koşullar'
            subText={'Lütfen partner kuruma ait koşulları doldurunuz.'}
          />
        </TabPanel>
        <TabPanel>
          <PreviewOrSaveForm pageName='Kurumuma Ait Bilgiler' />
          <PreviewOrSaveForm pageName='Partner Kuruma Ait Bilgiler' />
          <Flex
            bgColor={HeaderBackground}
            mb={'100'}
            borderRadius={'md'}
            height={50}
          >
            <Heading
              pl={6}
              py={4}
              as='h3'
              size='md'
              fontWeight={'medium'}
              color={HeadingColor}
            >
              Anlaşma Yürürlük Durumu: Yürürlükte Değil
            </Heading>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
