import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
    button: {
        fontWeight: 'medium',
    },
    list: {
        py: 0,
        bg: mode("white", "#2D2D2D")(props),
        boxShadow: mode("lg", "dark-lg")(props),
        backgroundClip: "border-box",
        rounded: "md",
        overflow: "hidden",
    },
    item: {
        bg: mode("white", "whiteAlpha.50")(props),
        _hover: {
            bg: mode("gray.100", "whiteAlpha.200")(props),
        }
    },
    groupTitle: {},
    command: {},
    divider: {},
}))

const Menu = defineMultiStyleConfig({ baseStyle })

export default Menu