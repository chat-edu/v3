import {uploadImageAndGetUrl} from "@/services/blobStorage/uploadImage";

import * as fs from "fs";

export const POST = async (req: Request) => {
    const formData = await req.formData();
    const files = formData.get('file');

    if (!files) {
        return Response.json({ message: 'No files found' }, { status: 400 });
    }

    const fileArray = (Array.isArray(files) ? files : [files]) as File[]

    const urls = await Promise.all(
        fileArray.map(async (file: File) => {
            return uploadImageAndGetUrl(Buffer.from(await file.arrayBuffer()));
        })
    );

    return Response.json({ urls }, { status: 200 });
}