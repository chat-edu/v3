import {GraphRow} from "@/db/types/GraphRow";

export interface GraphMediaRowInput {
    graph_id: GraphRow["id"];
    name: string;
    media_url: string;
    media_type: GraphMediaTypes;
    processed: boolean;
}

export interface GraphMediaRow extends GraphMediaRowInput {
    id: number;
}

export enum GraphMediaTypes {
    Image = "image",
    Video = "video",
    PDF = "pdf",
    Markdown = "markdown",
}