import mysql from 'mysql';

export default {

    create_user (first_name: string, last_name: string, google_id: string) {
        return `INSERT INTO \`users\` (first_name, last_name, google_id) VALUES (${mysql.escape(first_name)}, ${mysql.escape(last_name)}, ${mysql.escape(google_id)});`;
    },

    get_user_by_id (id: number) {
        return `SELECT * FROM \`users\` WHERE user_id=${mysql.escape(id)}`
    },

    create_session(uid: number, token: string) {
        return `INSERT INTO \`sessions\` (user_id, session_id) VALUES (${mysql.escape(uid)}, ${mysql.escape(token)})`
    },

    validate_session(token: string){
        return `SELECT user_id FROM \`sessions\` WHERE session_id=${mysql.escape(token)}`
    },

    get_user_by_google_id (google_id: string) {
        return `SELECT * FROM \`users\` WHERE google_id=${mysql.escape(google_id)}`
    }
};