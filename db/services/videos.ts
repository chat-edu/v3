import {add, del, get} from "@/db/services/base";

import {VIDEOS_TABLE} from "@/db/tables";

import {VideoRow} from "@/db/types/VideoRow";

export const addVideo = async (video: VideoRow): Promise<VideoRow | null> => {
    return add<VideoRow, VideoRow>(VIDEOS_TABLE, video);
};

// READ

export const getVideo = async (id: VideoRow["media_id"]): Promise<VideoRow | null> => {
    const query = `SELECT * FROM ${VIDEOS_TABLE} WHERE media_id = $1;`;
    return get(query, [id]);
};

// DELETE

export const deleteVideo = async (id: VideoRow["media_id"]): Promise<boolean> => {
    return del(VIDEOS_TABLE, [id], ["media_id"]);
};