import React from 'react';

import {Button} from "@chakra-ui/react";

import useAnalyzeGraphMedia from "@/hooks/graphMedia/useAnalyzeGraphMedia";

import {GraphMedia} from "@/types/graph/GraphMedia";
import {PiGraph} from "react-icons/pi";

interface Props {
    graphMedia: GraphMedia,
    isDisabled?: boolean,
    isMediaLoading?: boolean,
}

const AnalyzeButton: React.FC<Props> = ({ graphMedia, isDisabled, isMediaLoading }) => {

    const { onAnalyze, isLoading } = useAnalyzeGraphMedia(graphMedia);

    return (
        <Button
            colorScheme={'brand'}
            leftIcon={<PiGraph />}
            flexShrink={0}
            isLoading={isLoading || isMediaLoading}
            onClick={(e) => {
                e.stopPropagation();
                onAnalyze();
            }}
            isDisabled={isDisabled}
        >
            Analyze
        </Button>
    );
};

export default AnalyzeButton;
