import mysql_db from '../services/mysql_db';
import users_sql from '../sql/users_sql';


interface user{
    user_id: number;
    first_name: string;
    last_name: string;
}

    function get_user_by_id (id: number): Promise<user> {
        return new Promise((resolve, reject) => {
            let db = new mysql_db();
            let query = users_sql.get_user_by_id(id);
            db.pquery(query, reject, (result: user[]) => {
                    resolve(result[0]);
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

export default {
    get_user_by_id,
    create_new_user
}