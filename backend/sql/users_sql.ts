import mysql from 'mysql';

export default {

    create_user (first_name: string, last_name: string) {
        return `INSERT INTO \`users\` (first_name, last_name) VALUES (${mysql.escape(first_name)}, ${mysql.escape(last_name)});`;
    },

    get_user_by_id (id: number) {
        return `SELECT * FROM \`users\` WHERE user_id=${mysql.escape(id)}`
    },

    create_session(uid: number, token: string) {
        return `INSERT INTO \`session\` (user_id, session_id) VALUES (${mysql.escape(uid)}, ${mysql.escape(token)})`
    },

    validate_session(token: string){
        return `SELECT user_id FROM \`sessions\` WHERE session_id=${mysql.escape(token)}`
    }
};