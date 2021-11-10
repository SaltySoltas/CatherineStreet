import mysql from 'mysql';

export default {
    create_comment (user_id: number, website_id: number, text: string, parent_id: number | null): string {
        return `INSERT INTO \`comments\` (user_id, website_id, comment_text, parent_id) 
                    VALUES (${mysql.escape(user_id)}, ${mysql.escape(website_id)}, ${mysql.escape(text)}, ${mysql.escape(parent_id)})`;
    },

    get_comments(website_id: number, parent_id: number | null, start: number, limit = 20) {
        let parent_sql: string;
        if(parent_id === null){
            parent_sql = " IS NULL"
        }else{
            parent_sql = `=${mysql.escape(parent_id)}`;
        }

        return `SELECT comments.*, users.first_name, users.last_name 
                    FROM \`comments\`
                    JOIN \`users\`
                        ON users.user_id = comments.user_id
                    WHERE website_id=${mysql.escape(website_id)} AND parent_id${parent_sql}
                    LIMIT ${mysql.escape(start)}, ${mysql.escape(limit)}`;
    },

    get_comment_by_id(comment_id: number){
        return `SELECT comments.*, users.first_name, users.last_name
                    FROM \`comments\`
                    JOIN \`users\`
                        ON users.user_id = comments.user_id
                    WHERE comment_id=${mysql.escape(comment_id)}`;
    },

    add_comment_reaction(comment_id: number, reaction_id: number, user_id: number) {
        return `INSERT INTO \`reactions\` (comment_id, reaction_id, user_id) 
                    VALUES (${mysql.escape(comment_id)}, ${mysql.escape(reaction_id)}, ${mysql.escape(user_id)})`
    },

    remove_comment_reaction(comment_id: number, reaction_id: number, user_id: number) {
        return `DELETE FROM \`reactions\` 
                    WHERE comment_id=${mysql.escape(comment_id)} AND reaction_id=${mysql.escape(reaction_id)} AND user_id=${mysql.escape(user_id)}`;
    },

    get_comment_reactions(comment_id: number) {
        return `SELECT * 
                    FROM \`reactions\` 
                    WHERE comment_id=${mysql.escape(comment_id)}`;
    },

    get_comment_reactions_bulk(comment_ids: number[]) {
        return `SELECT * 
                    FROM \`reactions\` 
                    WHERE comment_id IN (${mysql.escape(comment_ids)})`;
    }

};