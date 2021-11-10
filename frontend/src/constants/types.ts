export enum SortType {
    Chronological = 1,
    MostUpvotes,
    MostReactions,
    MyComments,
}

export type Reaction = {
    id: number;
    clicks: number;
};

export type Comment = {
    body: string;
    username: string;
    reactions: Reaction[];
}

export type User = {
    first_name: string;
    last_name: string;
    username: string;
    user_id: number;
}
