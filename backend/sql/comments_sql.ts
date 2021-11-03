import mysql from 'mysql';

export default {
    create_comment (user_id: number, website_id: number, text: string): string {
        return `INSERT INTO \`comments\` (user_id, website_id, comment_text) VALUES (${mysql.escape(user_id)}, ${mysql.escape(website_id)}, ${mysql.escape(text)})`;
    },

    get_comments(website_id: number, start: number, limit = 20) {
        return `SELECT * FROM \`comments\` WHERE website_id=${mysql.escape(website_id)} LIMIT ${mysql.escape(start)}, ${mysql.escape(limit)}`;
    },

    add_comment_reaction(comment_id: number, reaction_id: number, user_id: number) {
        return `INSERT INTO \`reactions\` (comment_id, reaction_id, user_id) VALUES (${mysql.escape(comment_id)}, ${mysql.escape(reaction_id)}, ${mysql.escape(user_id)})`
    },

    remove_comment_reaction(comment_id: number, reaction_id: number, user_id: number) {
        return `DELETE FROM \`reactions\` WHERE comment_id=${mysql.escape(comment_id)} AND reaction_id=${mysql.escape(reaction_id)} AND user_id=${mysql.escape(user_id)}`;
    },

    get_comment_reactions(comment_id: number) {
        return `SELECT * FROM \`reactions\` WHERE comment_id=${mysql.escape(comment_id)}`;
    }
};