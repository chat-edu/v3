import React, {createContext, ReactNode, useContext, useState} from "react";
import {Task} from "@/types/Task";
import {Topic} from "@/types/graph/Topic";
import {TopicEdge} from "@/types/graph/TopicEdge";
import useTaskAndTopics from "@/hooks/task/useTaskAndTopics";

interface TaskContextType {
    task: Task;
    taskTopics: Topic[];
    taskEdges: TopicEdge[];
    currentTopicIndex: number,
    setCurrentTopicIndex: (index: number) => void;
    correctAnswersByTopic: number[],
    setCorrectAnswersByTopic: (correctAnswersByTopic: number[]) => void;
}

export const TaskContext = createContext<TaskContextType>({
    task: {
        id: 0,
        text: '',
        creatorId: "",
        graphId: 0,
        completed: false,
    },
    taskTopics: [],
    taskEdges: [],
    currentTopicIndex: 0,
    setCurrentTopicIndex: () => {},
    correctAnswersByTopic: [],
    setCorrectAnswersByTopic: () => {}
});

export const useTaskContext = () => useContext(TaskContext);

interface TaskContextProps {
    task: Task;
    taskTopics: Topic[];
    taskEdges: TopicEdge[];
    children: ReactNode;
}

export const TaskContextProvider: React.FC<TaskContextProps> = ({ task, taskTopics, taskEdges, children }) => {

    const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(0);
    const [correctAnswersByTopic, setCorrectAnswersByTopic] = useState<number[]>([]);

    return (
        <TaskContext.Provider
            value={{
                task,
                taskTopics,
                taskEdges,
                currentTopicIndex,
                setCurrentTopicIndex,
                correctAnswersByTopic,
                setCorrectAnswersByTopic
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}