import { drawerAnatomy as parts } from "@chakra-ui/anatomy"

import {createMultiStyleConfigHelpers, cssVar, defineStyle} from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(parts.keys)

const $bg = cssVar("drawer-bg")
const $bs = cssVar("drawer-box-shadow")

const baseStyleDialog = defineStyle({
    zIndex: "modal",
    maxH: "100vh",
    color: "inherit",
    [$bg.variable]: "colors.white",
    [$bs.variable]: "shadows.lg",
    _dark: {
        [$bg.variable]: "#2D2D2D",
        [$bs.variable]: "shadows.dark-lg",
    },
    bg: $bg.reference,
    boxShadow: $bs.reference,
})

const baseStyle = definePartsStyle({
    dialog: baseStyleDialog,
})

const Drawer = defineMultiStyleConfig({ baseStyle })

export default Drawer
