import {findTasksByGraphIdAndCreatorId} from "@/db/services/tasks";

import {SubjectIdParams} from "@/app/api/tasks/user/[userId]/subject/[subjectId]/SubjectIdParams";

export const GET = async (req: Request, { params }: { params: SubjectIdParams }) => {
    return Response.json(await findTasksByGraphIdAndCreatorId(params.subjectId, params.userId));
}