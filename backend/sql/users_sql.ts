import mysql from 'mysql';

export default {

    create_user (first_name: string, last_name: string, google_id: string) {
        return `INSERT INTO \`users\` (first_name, last_name, google_id) VALUES (${mysql.escape(first_name)}, ${mysql.escape(last_name)}, ${mysql.escape(google_id)});`;
    },

    get_user_by_id (id: number) {
        return `SELECT * FROM \`users\` WHERE user_id=${mysql.escape(id)}`
    },

    get_user_by_google_id (google_id: string) {
        return `SELECT * FROM \`users\` WHERE google_id=${mysql.escape(google_id)}`
    }
};