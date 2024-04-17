import {add, del, find, get, update} from "@/db/services/base";

import {USERS_TABLE} from "@/db/tables";

import {UserRow} from "@/db/types/UserRow";

export const addUser = async (user: UserRow): Promise<UserRow | null> => {
    return add<UserRow, UserRow>(USERS_TABLE, user);
};

// READ

export const getUser = async (id: UserRow["id"]): Promise<UserRow | null> => {
    const query = `SELECT * FROM ${USERS_TABLE} WHERE id = $1;`;
    return get(query, [id]);
};

export const findAllUsers = async (): Promise<UserRow[]> => {
    return find(`SELECT * FROM ${USERS_TABLE};`, []);
};


// UPDATE

export const updateUser = async (id: UserRow["id"], updatedFields: Partial<UserRow>): Promise<boolean> => {
    return update<Partial<UserRow>, UserRow>(USERS_TABLE, [id], updatedFields);
};

// DELETE

export const deleteUser = async (id: UserRow["id"]): Promise<boolean> => {
    return del(USERS_TABLE, [id]);
};