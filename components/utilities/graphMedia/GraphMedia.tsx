import React from 'react';

import VideoGraphMedia from "@/components/utilities/graphMedia/VideoGraphMedia";
import ImageGraphMedia from "@/components/utilities/graphMedia/ImageGraphMedia";
import PDFGraphMedia from "@/components/utilities/graphMedia/PDFGraphMedia";
import MarkdownGraphMedia from "@/components/utilities/graphMedia/MarkdownGraphMedia";

import {GraphMedia as GraphMediaType} from "@/types/graph/GraphMedia";
import {GraphMediaTypes} from "@/db/types/GraphMediaRow";

interface Props {
    graphMedia: GraphMediaType
}

const GraphMedia: React.FC<Props> = ({ graphMedia }) => {
    switch (graphMedia.mediaType) {
        case GraphMediaTypes.Image:
            return (<ImageGraphMedia graphMedia={graphMedia}/>);
        case GraphMediaTypes.Video:
            return (<VideoGraphMedia graphMedia={graphMedia}/>);
        case GraphMediaTypes.PDF:
            return (<PDFGraphMedia graphMedia={graphMedia} />);
        case GraphMediaTypes.Markdown:
            return (<MarkdownGraphMedia graphMedia={graphMedia} />)
        default:
            return null;
    }
};

export default GraphMedia;
