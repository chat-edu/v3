import {GraphRow} from "@/db/types/GraphRow";
import {TopicRow} from "@/db/types/TopicRow";
import {TopicEdgeRow} from "@/db/types/TopicEdgeRow";

import {baseJSONUpdate, basePlan} from "@/llm/prompts/graphs/update";

export const planUpdatesFromVideoPrompt = (
    graph: GraphRow,
    topics: TopicRow[],
    edges: TopicEdgeRow[],
    transcript: string
) => basePlan(graph, topics, edges, `
The user has uploaded a video and the transcript is as follows:

${transcript}`)

export const updatesAsJSONFromVideoPrompt = (
    plan: string,
    graph: GraphRow,
    topics: TopicRow[],
    edges: TopicEdgeRow[],
    transcript: string,
) => baseJSONUpdate(plan, graph, topics, edges, `
The user uploaded a video and the transcript is as follows: 

${transcript}`);