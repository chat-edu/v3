import { defineStyle, defineStyleConfig, cssVar } from '@chakra-ui/react'

const $startColor = cssVar('skeleton-start-color')
const $endColor = cssVar('skeleton-end-color')

const baseStyle = defineStyle({
    _light: {
        [$startColor.variable]: 'colors.blackAlpha.50',
        [$endColor.variable]: 'colors.blackAlpha.400',
    },
    _dark: {
        [$startColor.variable]: 'colors.whiteAlpha.100',
        [$endColor.variable]: 'colors.whiteAlpha.500',
    },
    rounded: 'md',
    w: '100%',
})

const sm = defineStyle({
    h: 20,
})

const lg = defineStyle({
    h: 40,
})

const sizes = {
    sm,
    lg,
}

const defaultProps = {
    size: 'lg'
} as const;

const Skeleton = defineStyleConfig({
    baseStyle,
    defaultProps,
    sizes,
})

export default Skeleton