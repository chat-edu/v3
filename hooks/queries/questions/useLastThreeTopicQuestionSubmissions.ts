import {useEffect} from "react";

import useRows from "@/hooks/queries/base/useRows";
import {adaptQuestionSubmission} from "@/hooks/queries/questions/adapter";

import {useTaskContext} from "@/contexts/TaskContext";

import {Topic} from "@/types/graph/Topic";

const useLastThreeTopicQuestionSubmissions = (topicId: Topic["id"]) => {

    const { task, taskTopics, correctAnswersByTopic, setCorrectAnswersByTopic } = useTaskContext();

    const [
        questionSubmissions,
        isLoading,
        error,
        fetchQuestionSubmissions
    ] = useRows(`/api/questions/user/${task.creatorId}/topic/${topicId}`, adaptQuestionSubmission);

    useEffect(() => {
        const topicIndex = taskTopics.findIndex(t => t.id === topicId);
        if(topicIndex === -1) return;
        setCorrectAnswersByTopic([
            ...correctAnswersByTopic.slice(0, topicIndex),
            questionSubmissions.filter(q => q.correct).length,
            ...correctAnswersByTopic.slice(topicIndex + 1)
        ]);
    }, [questionSubmissions]);

    return {
        questionSubmissions,
        isLoading,
        error,
        fetchQuestionSubmissions
    }
}

export default useLastThreeTopicQuestionSubmissions;