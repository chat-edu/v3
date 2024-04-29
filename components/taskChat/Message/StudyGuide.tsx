import React from 'react'

import Markdown from "@/components/utilities/markdown";

import {StudyGuide as StudyGuideType} from "@/types/commands/StudyGuide";
import {Box, IconButton, useClipboard, useToast} from "@chakra-ui/react";
import {CopyIcon} from "@chakra-ui/icons";

interface Props {
    studyGuide: StudyGuideType
}

const StudyGuide: React.FC<Props> = ({ studyGuide}) => {

    const { onCopy } = useClipboard(studyGuide.studyGuide)

    const toast = useToast();

    const copy = () => {
        onCopy();
        toast({
            title: "Copied",
            description: "The study guide has been copied to your clipboard.",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }

    return (
        <Box
            position={'relative'}
        >
            <IconButton
                aria-label={"Copy"}
                onClick={copy}
                icon={<CopyIcon />}
                position={'absolute'}
                top={0}
                right={0}
                size={{
                    base: 'sm',
                    md: 'md'
                }}
            />
            <Markdown>
                {studyGuide.studyGuide}
            </Markdown>
        </Box>
    );
};

export default StudyGuide;
