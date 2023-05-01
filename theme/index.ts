// src/theme/index.ts
import { extendTheme } from '@chakra-ui/react'
import { buttonTheme } from '@/theme/components/button'

export const theme = extendTheme({
  components: { 
    Button: buttonTheme
  },
})
