import { Comment } from "../types";

export function hotCommentScore(c: Comment): number{
    // Inspired by reddit's hot score algorithm 
    // https://medium.com/hacking-and-gonzo/how-reddit-ranking-algorithms-work-ef111e33d0d9
    const {created_at, num_reactions} = c;
    let d_t = Date.now() - created_at.getTime();
    let y = Number(num_reactions > 0); // 1 if nonzero else 0
    let z = Math.max(num_reactions, 1);

    return Math.log10(z) + ((y * d_t) / 45000);
}

