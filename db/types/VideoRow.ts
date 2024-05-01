import {GraphMediaRow} from "@/db/types/GraphMediaRow";

export interface VideoRow {
    media_id: GraphMediaRow["id"];
    video_analyzer_id: string;
}