import {findGraphsByOwnerId} from "@/db/services/graphs";

import {GraphRow} from "@/db/types/GraphRow";

interface OwnerIdParams {
    creatorId: GraphRow["creator_id"];
}

export const GET = async (req: Request, {params}: { params: OwnerIdParams }) => {
    return Response.json(await findGraphsByOwnerId(params.creatorId));
}