import React from 'react';

import {Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";

import FormElement from "@/components/utilities/forms/FormElement";
import {ChevronDownIcon} from "@chakra-ui/icons";

interface Props<T> {
    label: string;
    valueDisplay: string;
    onSelect: (val: T) => void;
    options: T[];
    optionLabels: string[],
    helperText?: string
}

const MenuInput= <T,>({ label, valueDisplay, onSelect, options, optionLabels, helperText }: Props<T>) => {
    return (
        <FormElement
            label={label}
            helperText={helperText}
        >
            <Menu>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                >
                    {valueDisplay}
                </MenuButton>
                <MenuList>
                    {
                        options.map((option, index) => {
                            return (
                                <MenuItem
                                    key={optionLabels[index]}
                                    onClick={() => onSelect(option)}
                                >
                                    {optionLabels[index]}
                                </MenuItem>
                            )
                        })
                    }

                </MenuList>
            </Menu>
        </FormElement>
    );
};

export default MenuInput;
