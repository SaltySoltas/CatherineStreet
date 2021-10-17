import mysql from 'mysql';

export default {
    create_comment (user_id: string, website_id: string, text: string): string {
        return `INSERT INTO \`comments\` (user_id, website_id, comment_text) VALUES (${mysql.escape(user_id)}, ${mysql.escape(website_id)}, ${mysql.escape(text)})`;
    }
};