import mysql_db from '../services/mysql_db';
import users_sql from '../sql/users_sql';


interface user{
    user_id: number;
    google_id: string,
    first_name: string;
    last_name: string;
}

    function get_user_by_id (id: number): Promise<user> {
        return new Promise((resolve, reject) => {
            let db = new mysql_db();
            let query = users_sql.get_user_by_id(id);
            db.pquery(query, reject, (result: user[]) => {
                    resolve(result[0] || null);
            });
        });
    }

    function create_new_user(first_name: string, last_name: string, google_id: string){
        return new Promise((resolve, reject) => {
            let db = new mysql_db();
            let query = users_sql.create_user(first_name, last_name, google_id);
            db.pquery(query, reject, (result: any) => {
                // Resolve with the id of the newly inserted row
                resolve(result['insertId']);
            });
        });
    }

    function get_user_by_google_id(google_id: string){
        return new Promise((resolve, reject) => {
            let db = new mysql_db();
            db.pquery(users_sql.get_user_by_google_id(google_id), reject, (result: any) => {
                resolve(result[0] || null);
            })
        });
    }

export default {
    get_user_by_id,
    create_new_user,
    get_user_by_google_id
}