
export interface Comment {
    comment_id: number;
    comment_text: string;
    created_at: object;
    user_id: number;
    first_name: string;
    last_name: string;
    website_id: number;
    parent_id: number | null;
    replies: number;
    reactions: {
        [key: number]: {
            [key: number]: User
        }
    }
}

export interface Reaction {
    comment_id: number;
    reaction_id: number;
    user_id: number;
    first_name: string;
    last_name: string;
}

export interface User{
    user_id: number;
    google_id?: string,
    first_name: string;
    last_name: string;
}

