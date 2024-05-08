import React, {useEffect, useState} from 'react';
import Markdown from "@/components/utilities/markdown";
import {Skeleton} from "@chakra-ui/react";

interface Props {
    mediaUrl: string
}

const MarkdownMediaModalContent: React.FC<Props> = ({ mediaUrl}) => {

    const [markdown, setMarkdown] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true)
        fetch(mediaUrl)
            .then(response => response.text())
            .then(text => {
                setMarkdown(text)
                setIsLoading(false)
            })
    }, [mediaUrl]);

    if(isLoading) return (
        <Skeleton height={'100px'} />
    )

    return (
        <Markdown>
            {markdown}
        </Markdown>
    );
};

export default MarkdownMediaModalContent;
