import { cardAnatomy } from '@chakra-ui/anatomy'
import { mode } from "@chakra-ui/theme-tools";
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
    container: {
        backgroundColor: mode("white", "#2D2D2D")(props),
        p: {
            base: 2,
            md: 4,
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
        minWidth: "0px",
        wordWrap: "break-word",
        backgroundClip: "border-box",
        rounded:'lg',
        shadow: 'xl'
    },
    header: {
        py: 1,
        px: 0
    },
    body: {
        py: 1,
        px: 0
    },
    footer: {},
}))

const sizes = {}

const defaultProps = {
    variant: "outline",
}

const Card = defineMultiStyleConfig({ baseStyle, sizes, defaultProps })

export default Card