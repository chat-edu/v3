import { extendTheme } from "@chakra-ui/react";

import styles from "./global";

import components from "./components";

import { colors } from "./color";

import fonts from "./fonts";

export default extendTheme({
    components,
    colors,
    styles,
    fonts
});