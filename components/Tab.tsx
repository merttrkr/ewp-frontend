import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from '@chakra-ui/react';



export default function TabComponent() {
  const HeaderBackground = useColorModeValue('white', 'gray.800');
  const BorderColor = useColorModeValue('gray.200', 'gray.600');
  return (
    <Tabs isFitted variant='enclosed'>
      <TabList mb='1em'>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
