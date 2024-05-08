import {FaImage, FaMarkdown, FaVideo} from "react-icons/fa6";
import {FiFile} from "react-icons/fi";

import {GraphMediaTypes} from "@/db/types/GraphMediaRow";
import {GraphMediaFilter} from "@/types/graph/GraphMediaFilter";

const filters: GraphMediaFilter[] = [
    {
        text: "All",
        value: "all",
    },
    {
        text: "Images",
        value: GraphMediaTypes.Image,
        icon: FaImage
    },
    {
        text: "Videos",
        value: GraphMediaTypes.Video,
        icon: FaVideo
    },
    {
        text: "PDFs",
        value: GraphMediaTypes.PDF,
        icon: FiFile
    },
    {
        text: "Markdown",
        value: GraphMediaTypes.Markdown,
        icon: FaMarkdown
    }
]

export default filters;