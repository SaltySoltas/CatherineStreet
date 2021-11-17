export enum SortType {
    Chronological = 1,
    MostUpvotes,
    MostReactions,
    MyComments,
}

export type Comment = {
    comment_text: string,
    comment_id: number,
    first_name: string,
    last_name: string,
    reactions: {
        [key: number]: {
            [key: number]: User
        }
    }
}

export type User = {
    first_name: string;
    last_name: string;
    google_id?: string;
    user_id: number;
}
