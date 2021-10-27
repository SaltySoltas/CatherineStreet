# Catherine Street

## Getting started locally

### Mac
1. Fill out fields in .env_template and rename the updated file to .env
2. Run server with ```yarn run start```
3. Start mysql with ```brew services start mysql```
    - If mysql is not yet installed/set up: ```brew install mysql```
    - Start mysql with ```mysql -u root``` and run ```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<NEW PASSWORD>'```
    - Run ```CREATE DATABASE <any db name>```
    - Run ```USE <db name>``` then ```source ./db_sql/create.sql``` to create tables
    - Update ./backend/.env with db credentials and database name
    