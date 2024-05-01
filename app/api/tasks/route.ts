import {generateJson} from "@/llm/utils";
import {mostRelevantTopicPrompt} from "@/llm/prompts/tasks/mostRelevantTopic";

import {findTopicsByGraphId, getTopicByName} from "@/db/services/topics";
import {getGraph} from "@/db/services/graphs";
import {findIncomingTopics} from "@/db/services/utils";
import {addTask} from "@/db/services/tasks";

import {TopicRow} from "@/db/types/TopicRow";
import {TaskRow} from "@/db/types/TaskRow";
import {addTaskTopic} from "@/db/services/taskTopics";
export const POST = async (req: Request) => {
    const body = await req.json();

    if(!body.graph_id) return Response.json({error: "No graph id provided"}, {status: 400});
    if(!body.creator_id) return Response.json({error: "No creator id provided"}, {status: 400});
    if(!body.text) return Response.json({error: "No text provided"}, {status: 400});

    const taskRow = await addTask({
        graph_id: body.graph_id,
        creator_id: body.creator_id,
        text: body.text,
        completed: false
    });

    if(!taskRow) return Response.json({error: "Failed to create task"}, {status: 500});

    const relevantTopics = await findRelevantTopics(taskRow);

    const taskTopics = await Promise.all(relevantTopics.map(topic => addTaskTopic({
        task_id: taskRow.id,
        topic_id: topic.id
    })));

    if(taskTopics.some(taskTopic => !taskTopic)) return Response.json({error: "Failed to add task topics"}, {status: 500});

    return Response.json({
        task: taskRow,
        taskTopics
    });
}

const findRelevantTopics = async (task: TaskRow): Promise<TopicRow[]> => {
    const graphRow = await getGraph(task.graph_id);
    if (!graphRow) return [];

    const topics = await findTopicsByGraphId(task.graph_id);

    let response = await generateJson<{ mostRelevantTopicName: string}>(mostRelevantTopicPrompt(task, graphRow, topics));

    if(response.mostRelevantTopicName) {
        const mostRelevantTopic = await getTopicByName(response.mostRelevantTopicName, task.graph_id);
        if(!mostRelevantTopic) return [];
        return findIncomingTopics(mostRelevantTopic.id, [mostRelevantTopic]);
    }
    return [];
}