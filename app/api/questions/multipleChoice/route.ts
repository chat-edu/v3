import {addMultipleChoiceQuestion, addQuestionSubmission} from "@/db/services/questions";

export const POST = async (req: Request) => {
    const body = await req.json();

    if(!body.user_id) return Response.json({error: "user_id is required"}, {status: 400});
    if(!body.topic_id) return Response.json({error: "topic_id is required"}, {status: 400});
    if(!body.question) return Response.json({error: "question is required"}, {status: 400});
    if(!body.correct) return Response.json({error: "correct is required"}, {status: 400});
    if(!body.explanation) return Response.json({error: "explanation is required"}, {status: 400});
    if(!body.timestamp) return Response.json({error: "timestamp is required"}, {status: 400});
    if(!body.answer) return Response.json({error: "answer is required"}, {status: 400});
    if(!body.option_a) return Response.json({error: "option_a is required"}, {status: 400});
    if(!body.option_b) return Response.json({error: "option_b is required"}, {status: 400});
    if(!body.option_c) return Response.json({error: "option_c is required"}, {status: 400});
    if(!body.option_d) return Response.json({error: "option_d is required"}, {status: 400});
    if(!body.correct_answer) return Response.json({error: "correct_answer is required"}, {status: 400});
    if(!body.question_type) return Response.json({error: "question_type is required"}, {status: 400});
    if(!body.task_id) return Response.json({error: "task_id is required"}, {status: 400});

    const questionSubmissionRow = await addQuestionSubmission({
        user_id: body.user_id,
        topic_id: body.topic_id,
        question: body.question,
        correct: body.correct,
        explanation: body.explanation,
        timestamp: body.timestamp,
        question_type: body.question_type,
        task_id: body.task_id
    });

    if(!questionSubmissionRow) return Response.json(null, {status: 500});

    return Response.json(await addMultipleChoiceQuestion({
        question_id: questionSubmissionRow.id,
        option_a: body.option_a,
        option_b: body.option_b,
        option_c: body.option_c,
        option_d: body.option_d,
        correct_answer: body.correct_answer,
        answer: body.answer,
    }));
}