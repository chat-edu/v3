import {GraphRow} from "@/db/types/GraphRow";
import {TopicRow} from "@/db/types/TopicRow";
import {TopicEdgeRow} from "@/db/types/TopicEdgeRow";

import {baseJSONUpdate, basePlan} from "@/llm/prompts/graphs/update";

export const planUpdatesFromImagePrompt = (
    graph: GraphRow,
    topics: TopicRow[],
    edges: TopicEdgeRow[],
) => basePlan(graph, topics, edges, `
The user has uploaded an image
`)

export const updatesAsJSONFromImagePrompt = (
    plan: string,
    graph: GraphRow,
    topics: TopicRow[],
    edges: TopicEdgeRow[],
    imageUrl: string,
) => baseJSONUpdate(plan, graph, topics, edges, `
The user has uploaded an image

Add the image as markdown to any relevant topic updates or new topics: ${imageUrl}

When adding as markdown, use the following syntax: ![description](url)
`)