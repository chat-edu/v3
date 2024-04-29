import {findTasksByCreatorId} from "@/db/services/tasks";

import {UserIdParams} from "@/app/api/tasks/user/[userId]/UserIdParams";

export const GET = async (req: Request, { params }: { params: UserIdParams }) => {
    return Response.json(await findTasksByCreatorId(params.userId));
}