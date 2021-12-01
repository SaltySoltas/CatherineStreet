import mysql_db from '../services/mysql_db';
import comments_sql from '../sql/comments_sql';
import util_sql from '../sql/util_sql';
import { Comment, Reaction, User } from '../types';



    // Optionally reuse existing db connection as parameter
    // Useful for internal calls
    // Get website id from websites table, or create new record and return new id if not found
    function get_website_id(url: string): Promise<number> {
        return new Promise((resolve, reject) => {
            mysql_db.pquery(util_sql.get_website_by_url(url), reject, (result: any) => {
                if(result.length === 0){
                    mysql_db.pquery(util_sql.create_website_id(url), reject, (result: any) => {
                        resolve(result['insertId']);
                    });
                }else if(result.length === 1){
                    resolve(result[0]['website_id']);
                }else{
                    reject(new Error("Fatal error: get_website_id returned more than 1 record"));
                }
            })
        });
    }

    function post_comment(user_id: number, url: string, text: string, parent_id: number | null){
        return new Promise((resolve, reject) => {
            get_website_id(url)
            .then(site_id => {
                mysql_db.pquery(comments_sql.create_comment(user_id, site_id, text, parent_id), reject, (result: any) => {
                    resolve(result['insertId']);
                })
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    function get_comments(url: string, parent_id: number | null, start: number, limit: number){
        return new Promise((resolve, reject) => {
            get_website_id(url)
            .then(site_id => {
                mysql_db.pquery(comments_sql.get_comments(site_id, parent_id, start, limit), reject, (comments: Comment[]) => {
                    attach_reactions(comments)
                    .then(resolve)
                    .catch(err => reject(err));
                });
            })
            .catch(err => {
                reject(err);
            });
        })
    }

    function attach_reactions(comments: Comment[]): Promise<Comment[]>{
        return new Promise((resolve, reject) => {
            let comment_ids = comments.map((comment: Comment) => comment.comment_id);
            if(comment_ids.length === 0){
                resolve([]);
                return;
            }
            mysql_db.pquery(comments_sql.get_comment_reactions_bulk(comment_ids), reject, (reactions: Reaction[]) => {
                let reactionLists: any = {};
                reactions.forEach((reaction: Reaction) => {
                    if(reaction.comment_id in reactionLists){
                        reactionLists[reaction.comment_id].push(reaction);
                    }else{
                        reactionLists[reaction.comment_id] = [reaction];
                    }
                })

                for(let i = 0; i < comments.length; i++){
                    comments[i]['reactions'] = {};
                    // comments[i]['reactions'] = reactionLists[comments[i]['comment_id']] || [];
                    if(!reactionLists[comments[i]['comment_id']]) continue;
                    reactionLists[comments[i]['comment_id']].forEach((reaction: Reaction) => {
                        let next: User = {
                            user_id: reaction.user_id,
                            first_name: reaction.first_name,
                            last_name: reaction.last_name
                        }
                        if(!(reaction.reaction_id in comments[i]['reactions'])){
                            comments[i]['reactions'][reaction.reaction_id] = {}
                        }
                        comments[i]['reactions'][reaction.reaction_id][reaction.user_id] = next;
                     
                    });
                }
                resolve(comments);
            });
        });
    }


    function add_comment_reaction(comment_id: number, reaction_id: number, user_id: number) {
        return new Promise((resolve, reject) => {
            mysql_db.pquery(comments_sql.add_comment_reaction(comment_id, reaction_id, user_id), reject, (result: any) => {
                resolve(result)
            });
        });
    }

    function remove_comment_reaction(comment_id: number, reaction_id: number, user_id: number) {
        return new Promise((resolve, reject) => {
            mysql_db.pquery(comments_sql.remove_comment_reaction(comment_id, reaction_id, user_id), reject, (result: any) => {
                resolve(result)
            });
        });
    }

    function get_comment_reactions(comment_id: number){
        return new Promise((resolve, reject) => {
            mysql_db.pquery(comments_sql.get_comment_reactions(comment_id), reject, (result: Reaction[]) => {
                resolve(result)
            });
        });
    }

    function get_comment_reactions_bulk(comment_ids: number[]){
        return new Promise((resolve, reject) => {
            mysql_db.pquery(comments_sql.get_comment_reactions_bulk(comment_ids), reject, (result: Reaction[]) => {
                resolve(result);
            });
        })
    }


export default{
    get_website_id,
    post_comment,
    get_comments,
    add_comment_reaction,
    remove_comment_reaction,
    get_comment_reactions,
    get_comment_reactions_bulk
}