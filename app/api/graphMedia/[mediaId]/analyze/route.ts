import {getGraph} from "@/db/services/graphs";
import {addFromNewTopic, findTopicsByGraphId, updateFromTopicUpdate} from "@/db/services/topics";
import {addFromNewEdge, findTopicEdgesbyGraphId} from "@/db/services/topicEdges";
import {getGraphMedia, updateGraphMedia} from "@/db/services/graphMedia";
import {getVideo} from "@/db/services/videos";

import {generate, generateJson} from "@/llm/utils";
import {planUpdatesFromImagePrompt, updatesAsJSONFromImagePrompt} from "@/llm/prompts/graphs/updateWithImage";

import {extractTextFromFile} from "@/services/pdfToText/extractText";
import {getVideoIndexAsync} from "@/services/video/base";

import {planUpdatesFromPDFPrompt, updatesAsJSONFromPDFPrompt} from "@/llm/prompts/graphs/updateWithPDF";
import {planUpdatesFromVideoPrompt, updatesAsJSONFromVideoPrompt} from "@/llm/prompts/graphs/updateWithVideo";

import {GraphUpdate} from "@/llm/types/graphUpdates/GraphUpdate";
import {GraphMediaRow, GraphMediaTypes} from "@/db/types/GraphMediaRow";
import {GraphRow} from "@/db/types/GraphRow";
import {TopicRow} from "@/db/types/TopicRow";
import {TopicEdgeRow} from "@/db/types/TopicEdgeRow";
import {MediaIdParams} from "@/app/api/graphMedia/[mediaId]/MediaIdParams";
import {addGraphUpdate} from "@/db/services/graphUpdates";
import {planUpdatesFromMarkdownPrompt, updatesAsJSONFromMarkdownPrompt} from "@/llm/prompts/graphs/updateWithMarkdown";

export const maxDuration = 300;

export const POST = async (req: Request, { params }: { params: MediaIdParams}) => {
    const graphMediaRow = await getGraphMedia(params.mediaId);

    if (!graphMediaRow) return new Response(null, {status: 500});

    const graph = await getGraph(graphMediaRow.graph_id);
    if (!graph) {
        return Response.json({message: 'Graph not found'}, {status: 404});
    }
    const topics = await findTopicsByGraphId(graphMediaRow.graph_id);
    const edges = await findTopicEdgesbyGraphId(graphMediaRow.graph_id);

    let graphUpdate: GraphUpdate | null = null;
    switch (graphMediaRow.media_type) {
        case GraphMediaTypes.Image:
            graphUpdate = await analyzeImage(graph, topics, edges, graphMediaRow.media_url);
            break;
        case GraphMediaTypes.PDF:
            graphUpdate = await analyzePDF(graph, topics, edges, graphMediaRow);
            break;
        case GraphMediaTypes.Video:
            graphUpdate = await analyzeVideo(graph, topics, edges, graphMediaRow);
            break;
        case GraphMediaTypes.Markdown:
            graphUpdate = await analyzeMarkdown(graph, topics, edges, graphMediaRow);
            break;
        default:
            break;
    }
    if (!graphUpdate) return new Response(null, {status: 500});
    const updatedTopics = await Promise.all(graphUpdate.updatedTopics.map(
        (topic) => updateFromTopicUpdate(graph.id, topic)
    ));
    if (updatedTopics.some((topic) => !topic)) return new Response(null, {status: 500});
    const newTopics = await Promise.all(graphUpdate.newTopics.map(
        (topic) => addFromNewTopic(graph.id, topic)
    ));
    if (newTopics.some((topic) => topic === null)) return new Response(null, {status: 500});
    await Promise.all(graphUpdate.newEdges.map(
        (edge) => addFromNewEdge(graph.id, edge)
    ));
    await updateGraphMedia(graphMediaRow.id, {
        processed: true,
    });
    const graphUpdateRow = await addGraphUpdate({
        media_id: graphMediaRow.id,
        updates: (graphUpdate),
    })

    if(!graphUpdateRow) return new Response(null, {status: 500});

    return Response.json(graphUpdateRow, {status: 200});
}

const analyzeImage = async (graph: GraphRow, topics: TopicRow[], edges: TopicEdgeRow[], imageUrl: string) => {
    const plan = await generate(planUpdatesFromImagePrompt(graph, topics, edges), [imageUrl]);
    if(!plan) return null;
    return generateJson<GraphUpdate>(updatesAsJSONFromImagePrompt(plan, graph, topics, edges, imageUrl), [imageUrl]);
}

const analyzePDF = async (graph: GraphRow, topics: TopicRow[], edges: TopicEdgeRow[], media: GraphMediaRow) => {
    const response = await fetch(media.media_url);

    if(!response.body) return null;

    const extractedText = await extractTextFromFile(Buffer.from(await response.arrayBuffer()));

    const plan = await generate(planUpdatesFromPDFPrompt(graph, topics, edges, extractedText));
    if(!plan) return null;
    return generateJson<GraphUpdate>(updatesAsJSONFromPDFPrompt(plan, graph, topics, edges, extractedText));
}

const analyzeVideo = async (graph: GraphRow, topics: TopicRow[], edges: TopicEdgeRow[], media: GraphMediaRow) => {
    const videoRow = await getVideo(media.id);
    if(!videoRow) return null
    const videoAnalysis = await getVideoIndexAsync(videoRow.video_analyzer_id);
    const transcript = videoAnalysis.insights.transcript.map((transcript: any) => transcript.text).join(' ');
    const plan = await generate(planUpdatesFromVideoPrompt(graph, topics, edges, transcript));
    if(!plan) return null;
    return generateJson<GraphUpdate>(updatesAsJSONFromVideoPrompt(plan, graph, topics, edges, transcript));
}

const analyzeMarkdown = async (graph: GraphRow, topics: TopicRow[], edges: TopicEdgeRow[], media: GraphMediaRow) => {
    const response = await fetch(media.media_url);
    if(!response.body) return null;
    const markdown = await response.text();
    const plan = await generate(planUpdatesFromMarkdownPrompt(graph, topics, edges, markdown));
    if(!plan) return null;
    return generateJson<GraphUpdate>(updatesAsJSONFromMarkdownPrompt(plan, graph, topics, edges, markdown));
}