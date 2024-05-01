import {uploadUrlAsync} from "@/services/video/base";

export const POST = async (req: Request) => {
    const body = await req.json();

    if(!body.videoName) return Response.json({error: "No video name provided"}, {status: 400});
    if(!body.videoUrl) return Response.json({error: "No video URL provided"}, {status: 400});

    const videoID = await uploadUrlAsync(body.videoName, body.videoUrl);
    return Response.json(videoID);
}