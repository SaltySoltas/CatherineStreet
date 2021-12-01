import { User } from '../types';
import mysql_db from '../services/mysql_db';
import users_sql from '../sql/users_sql';

    function get_user_by_id (id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            let query = users_sql.get_user_by_id(id);
            mysql_db.pquery(query, reject, (result: User[]) => {
                    resolve(result[0] || null);
            });
        });
    }

    function create_new_user(first_name: string, last_name: string, google_id: string){
        return new Promise((resolve, reject) => {
            let query = users_sql.create_user(first_name, last_name, google_id);
            mysql_db.pquery(query, reject, (result: any) => {
                // Resolve with the id of the newly inserted row
                resolve(result['insertId']);
            });
        });
    }

    function get_user_by_google_id(google_id: string){
        return new Promise((resolve, reject) => {
            mysql_db.pquery(users_sql.get_user_by_google_id(google_id), reject, (result: any) => {
                resolve(result[0] || null);
            })
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
    create_new_user,
    get_user_by_google_id
}