import React from 'react';

import Loading from "@/components/utilities/Loading";
import ActiveTask from "@/components/task/ActiveTask";
import CompletedTask from "@/components/task/CompletedTask";

import useTaskAndTopics from "@/hooks/task/useTaskAndTopics";

import {TaskContextProvider} from "@/contexts/TaskContext";

import {Task as TaskType} from "@/types/task/Task";

interface Props {
    taskId: TaskType['id']
}

const Task: React.FC<Props> = ({ taskId }) => {


    const { task, topics, topicEdges, isLoading, initialCorrectAnswersByTopic } = useTaskAndTopics(taskId)

    return (
        <Loading
            loading={isLoading}
            h={'100%'}
            w={'100%'}
            bg={'green'}
        >
            {
                isLoading || !task ? null : (
                    <TaskContextProvider
                        task={task}
                        taskTopics={topics}
                        taskEdges={topicEdges}
                        initialCorrectAnswersByTopic={initialCorrectAnswersByTopic}
                    >
                        {
                            task.completed ? (
                                <CompletedTask />
                            ) : (
                                <ActiveTask />
                            )
                        }
                    </TaskContextProvider>
                )
            }
        </Loading>
    );
};

export default Task;
