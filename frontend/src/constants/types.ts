export enum SortType {
    Hot = 1,
    MostReactions,
    New
}

export type Comment = {
    comment_text: string,
    comment_id: number,
    first_name: string,
    last_name: string,
    replies: number
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

export type CommentThread = {
    parent: Comment | null;
    replies: Comment[];
    all_fetched: boolean;
    scroll_pos: number;
  }
  