// src/theme/index.ts
import { extendTheme } from '@chakra-ui/react'
import { buttonTheme } from '@/theme/components/button'
import { tabsTheme } from './components/tabs'

export const theme = extendTheme({
  components: {
    Button: buttonTheme,
    Tabs: tabsTheme,

  },
})
