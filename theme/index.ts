// src/theme/index.ts
import { extendTheme } from '@chakra-ui/react'
import { inputTheme } from '@/theme/components/input'
import { buttonTheme } from '@/theme/components/button'

export const theme = extendTheme({
  components: { 
    Input: inputTheme,
    Button: buttonTheme
  },
})
