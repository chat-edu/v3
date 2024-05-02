import {FreeResponseQuestionSubmissionRow, MultipleChoiceQuestionSubmissionRow} from "@/db/types/questions";
import {TaskRow} from "@/db/types/TaskRow";

export const generateTaskSummary = (task: TaskRow, questions: (MultipleChoiceQuestionSubmissionRow | FreeResponseQuestionSubmissionRow)[]) => `
    The user has completed the learning objective:
    
    ${task.text}
    
    The user answered the following questions as part of the task:
    
    ${questions.map(question => JSON.stringify(question)).join("\n")}
    
    Generate a summary of what they learned from the task, where they may have struggled, and what they may need to review.
    
    Use markdown to format your response and break it into digestible sections.
`