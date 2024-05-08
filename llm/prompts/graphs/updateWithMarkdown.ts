import {GraphRow} from "@/db/types/GraphRow";
import {TopicRow} from "@/db/types/TopicRow";
import {TopicEdgeRow} from "@/db/types/TopicEdgeRow";

import {baseJSONUpdate, basePlan} from "@/llm/prompts/graphs/update";

export const planUpdatesFromMarkdownPrompt = (
    graph: GraphRow,
    topics: TopicRow[],
    edges: TopicEdgeRow[],
    markdown: string,
) => basePlan(graph, topics, edges, `
The user has uploaded markdown notes:

${markdown}`)

export const updatesAsJSONFromMarkdownPrompt = (
    plan: string,
    graph: GraphRow,
    topics: TopicRow[],
    edges: TopicEdgeRow[],
    markdown: string,
) => baseJSONUpdate(plan, graph, topics, edges, `
The user has uploaded markdown notes:

${markdown}

Add the markdown to any relevant topic updates or new topics.`)