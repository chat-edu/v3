import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
    borderWidth: '2px',
    _dark: {
        borderColor: 'whiteAlpha.500',
    },
    _light: {
        borderColor: 'blackAlpha.500',
    }
})

const Divider = defineStyleConfig({
    baseStyle
})

export default Divider