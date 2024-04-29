// checks that every field of RowType is present in the body and returns the type if it is
// otherwise, returns null
const validatePostBody = <RowType>(body: any, row: RowType): RowType | null => {
    for (const key in row) {
        if (!(key in body)) return null;
        row[key] = body[key];
    }
    return row;
}