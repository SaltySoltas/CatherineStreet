import mysql_db from '../services/mysql_db';
import users_sql from '../sql/users_sql';
import util_sql from '../sql/util_sql';

    function get_user_by_id (id: number) {
        return new Promise((resolve, reject) => {
            let db = new mysql_db();
            let query = users_sql.get_user_by_id(id);
            db.pquery(query, reject, (result: any) => {
                    resolve(result);
            });
        });
    }

    function create_new_user(first_name: string, last_name: string){
        return new Promise((resolve, reject) => {
            let db = new mysql_db();
            let query = users_sql.create_user(first_name, last_name);
            db.pquery(query, reject, (result: any) => {
                // Resolve with the id of the newly inserted row
                resolve(result['insertId']);
            });
        });
    }

    function create_or_update_session(user_id: number, session_token: string) {
        return new Promise((resolve, reject) => {
            let db = new mysql_db();
            let query = users_sql.create_session(user_id, session_token);
            db.pquery(query, reject, (result: any) => {
                    resolve(result);
            });
        });
    }

    function validate_session(user_id:number, session_token: string) {
        return new Promise((resolve, reject) => {
            let db = new mysql_db();
            let query = users_sql.validate_session(session_token);
            db.pquery(query, reject, (result: any) => {
                resolve(result["user_id"] == user_id);
            });
        });
    }

export default {
    get_user_by_id,
    create_new_user
}