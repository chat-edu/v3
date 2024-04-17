import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import {mode} from "@chakra-ui/theme-tools";

// define the base component styles
const baseStyle = defineStyle((props) => ({
    bg: mode("brand.600", "brand.200")(props),
    rounded: "md",
    p: 2,
}))

// export the component theme
const Tooltip = defineStyleConfig({ baseStyle });

export default Tooltip;