import mysql from 'mysql';

export default {
    // Search by hash first, then by url from the results to resolve any potential collisions
    get_website_by_url (url: string){
        return `SELECT * FROM
                    (SELECT * FROM \`websites\` WHERE url_hash=SHA1(${mysql.escape(url)})) AS HASH_MATCHES
                WHERE website_url=${mysql.escape(url)}`;
    },

    create_website_id (url: string) {
        return `INSERT INTO \`websites\` (website_url) VALUES (${mysql.escape(url)})`;
    },

}