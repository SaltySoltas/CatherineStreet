import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

class mysql_db {

    connection: mysql.Connection;

    public constructor(){
        this.connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB
        });
        this.connection.connect(err => {
            if(err) throw err;
        });
    }

    // For querying the db within a promise, handles rejecting with errors automatically
    public pquery(query: string, reject: any, cb: any){
        this.connection.query(query, (err, result) => {
            if(err){
                reject(err);
            }else{
                cb(result);
            }
        })
    }
}

export default mysql_db;