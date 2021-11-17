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
    comment_text: string,
    first_name: string,
    last_name: string
    reactions: Reaction[];
}

export type User = {
    first_name: string;
    last_name: string;
    google_id: string;
    user_id: number;
}
