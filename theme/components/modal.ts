import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import {mode} from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle((props) => ({
    overlay: {},
    dialog: {
        borderRadius: 'md',
        bg: mode("white", "#2D2D2D")(props),
        boxShadow: mode("lg", "dark-lg")(props),
        border: "1px solid",
        borderColor: mode("gray.200", "whiteAlpha.300")(props),
    },
}))

const Modal = defineMultiStyleConfig({
    baseStyle
})

export default Modal
