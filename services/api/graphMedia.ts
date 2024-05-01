import {emitGraphMediaChangedEvent} from "@/events/graphMediaChanged";

import {GraphRow} from "@/db/types/GraphRow";
import {GraphMediaRow, GraphMediaTypes} from "@/db/types/GraphMediaRow";
import {GraphMedia} from "@/types/graph/GraphMedia";

export const uploadMedia = async (graphId: GraphRow["id"], file: File, mediaType: GraphMediaTypes) => {
    const formData = new FormData();
    formData.append(mediaType, file);

    return fetch(`/api/graphMedia/graph/${graphId}/${mediaType}s`, {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                emitGraphMediaChangedEvent(graphId)
                return data;
            } else {
                return null;
            }
        })
        .catch(() => null);
}

export const analyzeMedia = async (media: GraphMedia) => {
    return fetch(`/api/graphMedia/${media.id}/analyze`, {
        method: 'POST',
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                emitGraphMediaChangedEvent(media.graphId);
                return data;
            } else {
                return null;
            }
        })
        .catch(() => null);
}

export const getVideoState = async (mediaId: GraphMediaRow["id"]) => {
    return fetch(`/api/graphMedia/${mediaId}/videoState`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                return data;
            } else {
                return null;
            }
        })
        .catch(() => null);
}

export const deleteMedia = async (mediaId: GraphMediaRow["id"], graphId: GraphMediaRow['graph_id']) => {
    return fetch(`/api/graphMedia/${mediaId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                emitGraphMediaChangedEvent(graphId);
                return true;
            } else {
                return false;
            }
        })
        .catch(() => false);
}