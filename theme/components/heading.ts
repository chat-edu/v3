import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
    fontWeight: "black"
})

const Heading = defineStyleConfig({
    baseStyle
});

export default Heading;