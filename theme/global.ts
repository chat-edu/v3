import { GlobalStyles, mode } from "@chakra-ui/theme-tools"

const styles : GlobalStyles = {
    global: (props) => ({
        body: {
            bg: mode("blackAlpha.50", "whiteAlpha.50")(props),
            color: mode("black", "white")(props),
        },
    }),
}

export default styles