import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

class mysql_db {

    connection: mysql.Connection;

    public constructor(){
        console.log("Initializing db...");
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
}

export default mysql_db;