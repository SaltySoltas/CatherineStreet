import mysql_db from '../services/mysql_db';
import comments_sql from '../sql/comments_sql';
import util_sql from '../sql/util_sql';


    // Optionally reuse existing db connection as parameter
    // Useful for internal calls
    // Get website id from websites table, or create new record and return new id if not found
    function get_website_id(url: string, db = new mysql_db()): Promise<number> {
        return new Promise((resolve, reject) => {
            db.pquery(util_sql.get_website_by_url(url), reject, (result: any) => {
                if(result.length === 0){
                    db.pquery(util_sql.create_website_id(url), reject, (result: any) => {
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

    function post_comment(user_id: number, url: string, text: string){
        let db = new mysql_db();
        return new Promise((resolve, reject) => {
            get_website_id(url, db)
            .then(site_id => {
                db.pquery(comments_sql.create_comment(user_id, site_id, text), reject, (result: any) => {
                    resolve(result['insertId']);
                })
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    function get_comments(url: string, start: number, limit: number){
        let db = new mysql_db();
        return new Promise((resolve, reject) => {
            get_website_id(url, db)
            .then(site_id => {
                db.pquery(comments_sql.get_comments(site_id, start, limit), reject, (result:any) => {
                    resolve(result);
                });
            })
            .catch(err => {
                reject(err);
            })
        })
    }

    function add_comment_reaction(comment_id: number, reaction_id: number, user_id: number) {
        let db = new mysql_db();
        return new Promise((resolve, reject) => {
            db.pquery(comments_sql.add_comment_reaction(comment_id, reaction_id, user_id), reject, (result: any) => {
                resolve(result)
            });
        });
    }

    function remove_comment_reaction(comment_id: number, reaction_id: number, user_id: number) {
        let db = new mysql_db();
        return new Promise((resolve, reject) => {
            db.pquery(comments_sql.remove_comment_reaction(comment_id, reaction_id, user_id), reject, (result: any) => {
                resolve(result)
            });
        });
    }

    function get_comment_reactions(comment_id: number){
        let db = new mysql_db();
        return new Promise((resolve, reject) => {
            db.pquery(comments_sql.get_comment_reactions(comment_id), reject, (result: any) => {
                resolve(result)
            });
        });
    }


export default{
    get_website_id,
    post_comment,
    get_comments,
    add_comment_reaction,
    remove_comment_reaction,
    get_comment_reactions
}