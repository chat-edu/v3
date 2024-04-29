import React from 'react';

import Markdown from "@/components/utilities/markdown";
interface Props {
    content: string
}

const TextMessage: React.FC<Props> = ({ content }) => {
    return (
        <Markdown>
            {content}
        </Markdown>
    );
};

export default TextMessage;
