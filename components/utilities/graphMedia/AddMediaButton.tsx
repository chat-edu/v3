import React from 'react';

import {Button, ButtonProps} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

import Link from "next/link";

import {Graph} from "@/types/graph/Graph";

interface Props {
    graphId: Graph['id'];
    linkStyle?: React.CSSProperties;
    buttonProps?: Partial<ButtonProps>;
}

const AddMediaButton: React.FC<Props> = ({ graphId, linkStyle, buttonProps }) => {
    return (
        <Link
            href={`/subject/${graphId}/addContent`}
            passHref
            style={{
                ...linkStyle
            }}
        >
            <Button
                leftIcon={<AddIcon />}
                colorScheme={'brand'}
                w={'100%'}
                variant={'outline'}
                {...buttonProps}
            >
                Add Knowledge
            </Button>
        </Link>
    );
};

export default AddMediaButton;
