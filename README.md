# Catherine Street

## Getting started locally

### Mac
#### Backend
1. Fill out fields in .env_template and rename the updated file to .env
2. Run server with ```yarn run start```
3. Start mysql with ```brew services start mysql```
    - If mysql is not yet installed/set up: ```brew install mysql```
    - Start mysql with ```mysql -u root``` and run ```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<NEW PASSWORD>'```
    - Run ```CREATE DATABASE <any db name>```
    - Run ```USE <db name>``` then ```source ./db_sql/create.sql``` to create tables
    - Update ./backend/.env with db credentials and database name

#### Frontend
1. Build the frontend with ```yarn run build``` or watch with ```yarn run watch```
2. To view the ui, you can either
    - Start the backend with ```yarn run start``` and navigaate to ```localhost:PORT/index.html```
    - View through the extension (see instructions below)

#### Installing the extension
1. Navigate to ```chrome://extensions```
2. Turn on ```developer mode``` in the top right corner
3. Click on ```load unpacked```
4. Select ```Catherine Street/extensions/chrome```
5. (Optional) Pin the extension by clicking on the extensions icon in the top right corner of chrome, and click the pin icon
6. To view the ui, click on the extension icon
    