import mysql from 'mysql';

export default {

    create_user (first_name: string, last_name: string) {
        return `INSERT INTO \`users\` (first_name, last_name) VALUES (${mysql.escape(first_name)}, ${mysql.escape(last_name)});`;
    },

    get_user_by_id (id: string) {
        return `SELECT * FROM \`users\` WHERE user_id=${mysql.escape(id)}`
    }
};