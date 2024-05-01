import React from 'react';

import {Button, HStack, Icon, Text, VStack} from "@chakra-ui/react";

import {FiFile} from "react-icons/fi";
import {FaImage, FaVideo} from "react-icons/fa6";
import {PiGraph} from "react-icons/pi";

import useAnalyzeGraphMedia from "@/hooks/graphMedia/useAnalyzeGraphMedia";

import {GraphMedia as GraphMediaType} from "@/types/graph/GraphMedia";
import {GraphMediaTypes} from "@/db/types/GraphMediaRow";
import AnalyzeVideoButton from "@/components/utilities/graphMedia/AnalyzeVideoButton";

interface Props {
    graphMedia: GraphMediaType
}

const GraphMedia: React.FC<Props> = ({ graphMedia }) => {

    const { onAnalyze, isLoading } = useAnalyzeGraphMedia(graphMedia);

    return (
        <HStack
            spacing={2}
            w={'100%'}
            justifyContent={'space-between'}
            borderWidth={2}
            rounded={'md'}
            p={2}
            pl={4}
        >
            <HStack
                spacing={4}
                flexShrink={1}
            >
                <Icon
                    as={
                        graphMedia.mediaType === GraphMediaTypes.PDF
                            ? FiFile
                            : graphMedia.mediaType === GraphMediaTypes.Video
                                ? FaVideo
                                : FaImage
                    }
                />
                <VStack
                    spacing={0}
                    alignItems={'flex-start'}
                    flex={1}
                >
                    <Text
                        fontWeight={'semibold'}
                    >
                        {graphMedia.name}
                    </Text>
                </VStack>
            </HStack>
            {
                !graphMedia.processed && (
                    graphMedia.mediaType === GraphMediaTypes.Video ? (
                        <AnalyzeVideoButton
                            graphMedia={graphMedia}
                        />
                    ) : (
                        <Button
                            colorScheme={'brand'}
                            leftIcon={<PiGraph />}
                            flexShrink={0}
                            isLoading={isLoading}
                            onClick={onAnalyze}
                        >
                            Analyze
                        </Button>
                    )
                )
            }
        </HStack>
    );
};

export default GraphMedia;
