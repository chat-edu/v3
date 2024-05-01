import {addGraphMedia} from "@/db/services/graphMedia";

import {GraphMediaTypes} from "@/db/types/GraphMediaRow";

export const uploadGraphMedia = async (
    req: Request,
    graph_id: number,
    mediaType: GraphMediaTypes,
    upload: (buffer: Buffer) => Promise<string>) => {
    const formData = await req.formData();
    const filesFormEntry = formData.get(mediaType);

    if (!filesFormEntry) return null;
    const file = (Array.isArray(filesFormEntry) ? filesFormEntry[0] : filesFormEntry) as File;

    const imageUrl = await upload(Buffer.from(await file.arrayBuffer()));

    if(!imageUrl) return null;

    return addGraphMedia({
        graph_id,
        name: file.name,
        media_url: imageUrl,
        media_type: mediaType,
        processed: false
    });
}