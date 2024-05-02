import {QuestionIdParams} from "@/app/api/questions/question/[questionId]/QuestionIdParams";
import {deleteQuestionSubmission} from "@/db/services/questions";

export const DELETE = async (req: Request, { params }: { params: QuestionIdParams }) => {
    return Response.json(await deleteQuestionSubmission(params.questionId));
}