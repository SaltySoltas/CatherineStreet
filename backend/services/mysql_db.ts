import mysql from 'mysql';
require('dotenv').config();

class mysql_db {

    private static connectionOptions = {
        connectionLimit : 151,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        socketPath: process.env.MYSQL_SOCKET_PATH
    };
    private static pool = mysql.createPool(this.connectionOptions);


    // For querying the db within a promise, handles rejecting with errors automatically
    public static pquery(query: string, fail_cb: any, cb: any){
        this.pool.query(query, (err, result) => {
            if(err){
                fail_cb(err);
            }else{
                cb(result);
            }
        })
    }
}

export default mysql_db;