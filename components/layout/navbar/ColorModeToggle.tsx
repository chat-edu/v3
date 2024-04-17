import React from 'react'

import { IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ColorModeToggle = () => {

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
        >
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </IconButton>
    )
}

export default ColorModeToggle