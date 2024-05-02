import React from 'react';

import {Button, CircularProgress, HStack, Text} from "@chakra-ui/react";

import {PiGraph} from "react-icons/pi";

import useAnalyzeVideo from "@/hooks/graphMedia/useAnalyzeVideo";

import {GraphMedia} from "@/types/graph/GraphMedia";

interface Props {
    graphMedia: GraphMedia
}

const AnalyzeVideoButton: React.FC<Props> = ({ graphMedia }) => {

    const { isLoading, onAnalyze, isVideoProcessing, isVideoProcessingLoading } = useAnalyzeVideo(graphMedia);

    return (
        <HStack
            spacing={2}
            flexShrink={0}
        >
            {
                (isVideoProcessing && !isVideoProcessingLoading) && (
                    <HStack>
                        <Text>
                            Processing
                        </Text>
                        <CircularProgress
                            size={6}
                            isIndeterminate
                            color={'brand.500'}
                        />
                    </HStack>
                )
            }
            <Button
                colorScheme={'brand'}
                leftIcon={<PiGraph />}
                flexShrink={0}
                isLoading={isLoading || isVideoProcessingLoading}
                onClick={(e) => {
                    e.stopPropagation();
                    onAnalyze();
                }}
                isDisabled={isVideoProcessing}
            >
                Analyze
            </Button>
        </HStack>
    );
};

export default AnalyzeVideoButton;
