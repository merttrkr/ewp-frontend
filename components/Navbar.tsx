import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import Image from 'next/image';

const logoSrc = '/logo_ewp.png';
const darkLogoSrc = '/logo_ewp_dark.png';


interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

interface DesktopNavProps {
  navLinkColor: string;
  navLinkHoverColor: string;
  popoverContentBgColor: string;
}


interface MobileNavProps {
  navLinkColor: string;
  navLinkHoverColor: string;
  popoverContentBgColor: string;
}

interface MobileNavItemProps extends NavItem {
  navLinkColor: string;
  navLinkHoverColor: string;
  popoverContentBgColor: string;
}


export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const accentColor = useColorModeValue('gray.800', 'white');
  const navLinkColor = useColorModeValue('gray.800', 'gray.200');
  const navLinkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box>
      <Flex
        justify='space-between'
        bg={useColorModeValue('gray.50', 'black.500')}
        color={useColorModeValue('gray.800', 'white')}
        minH='20%'
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle='solid'
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align='center'
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant='ghost'
            aria-label='Toggle Navigation'
          />
        </Flex>
        <Link href='/'>
          <Image
            width={100}
            height='36'
            src={colorMode === 'light' ? logoSrc : darkLogoSrc}
            alt='EWP Logo'
          />
        </Link>

        <Flex display={{ base: 'none', md: 'flex' }}>
          <DesktopNav
            navLinkColor={navLinkColor}
            navLinkHoverColor={navLinkHoverColor}
            popoverContentBgColor={popoverContentBgColor}
          />
        </Flex>

        <Box width={100}>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify='flex-end'
            direction='row'
            spacing={6}
          >
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Box>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav
          navLinkColor={navLinkColor}
          navLinkHoverColor={navLinkHoverColor}
          popoverContentBgColor={popoverContentBgColor}
        />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ navLinkColor, navLinkHoverColor, popoverContentBgColor } : DesktopNavProps) => {
  return (
    <Stack direction='row' spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger='hover' placement='bottom-start'>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize='md'
                fontWeight={500}
                color={navLinkColor}
                _hover={{
                  textDecoration: 'none',
                  color: navLinkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow='xl'
                bg={popoverContentBgColor}
                p={4}
                rounded='xl'
                minW='sm'
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem)  => {
  const navLinkHoverColor = useColorModeValue('gray.700', 'gray.600');

  return (
    <Link
      href={href}
      role='group'
      display='block'
      p={2}
      rounded='md'
      _hover={{ bg: useColorModeValue('gray.200', 'gray.900') }}
    >
      <Stack direction='row' align='center'>
        <Box>
          <Text
            transition='all .3s ease'
            _groupHover={{ color: navLinkHoverColor }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize='sm' _groupHover={{ color: 'gray.600' }}>
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition='all .3s ease'
          transform='translateX(-10px)'
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify='flex-end'
          align='center'
          flex={1}
        >
          <Icon color='gray.500' w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ navLinkColor, navLinkHoverColor, popoverContentBgColor } : MobileNavProps) => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          navLinkColor={navLinkColor}
          navLinkHoverColor={navLinkHoverColor}
          popoverContentBgColor={popoverContentBgColor}
        />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, navLinkColor, navLinkHoverColor, popoverContentBgColor } :MobileNavItemProps) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify='space-between'
        align='center'
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={navLinkColor}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition='all .25s ease-in-out'
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle='solid'
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align='start'
        >
          {children &&
            children.map((child) => (
              <Link fontSize='xl' key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};




interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}
const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'İkili Anlaşmalar',
    children: [
      {
        label: 'Yeni anlaşma',
        subLabel: 'Yeni Bir Anlaşma Oluştur',
        href: '/bilateral-agreements/create-new-agreement',
      },
      {
        label: 'Anlaşmalar',
        subLabel: 'Bütün Anlaşmaları Gör',
        href: '/bilateral-agreements/display-all-agreements',
      },
    ],
  },
  {
    label: 'Öğrenim Anlaşmaları',
    children: [
      {
        label: 'Öğrenim Anlaşmalarını İncele',
        subLabel: 'Tüm Öğrenim Anlaşmalarını İncele',
        href: '/learning-agreements/display-all-agreements',
      },
      {
        label: 'Uzun Dönem Öğrenim Anlaşması Oluştur',
        subLabel: 'Uzun Dönem Öğrenim Anlaşması Oluştur',
        href: '/learning-agreements/create-long-term-la',
      },
      {
        label: 'Kısa Süreli Doktora Öğrenim Anlaşması Oluştur',
        subLabel: 'Doktora Öğrenim Anlaşması Oluştur',
        href: '/learning-agreements/create-short-term-doctoral-la',
      },
      {
        label: 'Karma Öğrenim Anlaşması Oluştur',
        subLabel: 'Karma Öğrenim Anlaşması Oluştur',
        href: '/learning-agreements/create-blended-la',
      },

      
    ],
  },
];
