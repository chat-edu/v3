import React from 'react';

import {FormControl, FormErrorMessage, FormHelperText, FormLabel} from "@chakra-ui/react";

interface Props {
    label: string,
    error?: string,
    helperText?: string,
    children: React.ReactNode,
}

const FormElement: React.FC<Props> = ({ label, error, helperText, children}) => {
    return (
        <FormControl
            isInvalid={!!error}
            py={0}
            colorScheme={"brand"}
            w={"100%"}
        >
            <FormLabel>{label}</FormLabel>
            {children}
            {helperText && (
                <FormHelperText>
                    {helperText}
                </FormHelperText>
            )}
            {error && (
                <FormErrorMessage>
                    {error}
                </FormErrorMessage>
            )}
        </FormControl>
    );
};

export default FormElement;
