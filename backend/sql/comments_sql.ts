import mysql from 'mysql';

export default {
    create_comment (user_id: number, website_id: number, text: string): string {
        return `INSERT INTO \`comments\` (user_id, website_id, comment_text) VALUES (${mysql.escape(user_id)}, ${mysql.escape(website_id)}, ${mysql.escape(text)})`;
    },

    get_comments(website_id: number, start: number, limit = 20) {
        console.log(website_id, start, limit);
        console.log(typeof(website_id), typeof(start), typeof(limit));
        return `SELECT * FROM \`comments\` WHERE website_id=${mysql.escape(website_id)} LIMIT ${mysql.escape(start)}, ${mysql.escape(limit)}`
    }
};