import React, {ChangeEvent} from 'react';

import { Textarea } from "@chakra-ui/react";

import FormElement from "@/components/utilities/forms/FormElement";

interface Props {
    label: string,
    placeholder: string,
    value: string,
    onChange: (value: string) => void,
    onBlur?: () => void,
    error?: string,
    helperText?: string,
}

const TextareaInput: React.FC<Props> = ({ label, placeholder, value, onChange, onBlur, error, helperText}) => {
    return (
        <FormElement
            label={label}
            error={error}
            helperText={helperText}
        >
            <Textarea
                placeholder={placeholder}
                value={value}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
                onBlur={onBlur}
                focusBorderColor={"brand.500"}
            />
        </FormElement>
    );
};

export default TextareaInput;
