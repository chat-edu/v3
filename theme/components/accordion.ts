import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(accordionAnatomy.keys)

const baseStyle = definePartsStyle({
    button: {
        py: 2
    },
    container: {
        borderWidth: "0px",
    }
})

const Accordion = defineMultiStyleConfig({ baseStyle })

export default Accordion