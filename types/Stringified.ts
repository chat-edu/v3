export type Stringified<T> = {
    [P in keyof T]: string;
};