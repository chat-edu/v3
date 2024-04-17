import React from 'react';

import {Icon, IconButton, Tooltip} from "@chakra-ui/react";

import {IconType} from "react-icons";
import {ToolbarButtonProps} from "@/types/graph/ToolbarButtonProps";

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, onClick, tooltip, isLoading, isDisabled}) => {
    return (
        <Tooltip
            label={tooltip}
            aria-label={tooltip}
        >
            <IconButton
                aria-label={tooltip}
                icon={<Icon as={icon} />}
                colorScheme={'brand'}
                onClick={onClick}
                isLoading={isLoading}
                isDisabled={isDisabled}
            />
        </Tooltip>
    );
};

export default ToolbarButton;
