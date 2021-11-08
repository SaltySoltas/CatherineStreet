\! echo "Creating users table..."
CREATE TABLE IF NOT EXISTS `users` (
    user_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    profile_pic_path varchar(1024),
    net_score bigint(20) unsigned NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id)
);
\! echo "Done"

\! echo "Creating websites table..."
CREATE TABLE IF NOT EXISTS `websites` (
    website_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    website_url varchar(2048) NOT NULL,
    url_hash char(40) GENERATED ALWAYS AS(SHA1(website_url)) STORED,
    PRIMARY KEY (website_id),
    INDEX (url_hash)
);
\! echo "Done"

\! echo "Creating comments table..."
CREATE TABLE IF NOT EXISTS `comments` (
    comment_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    comment_text varchar(300) NOT NULL,
    created_at datetime DEFAULT now(),
    user_id bigint(20) unsigned NOT NULL,
    website_id bigint(20) unsigned NOT NULL,
    parent_id bigint(20) unsigned DEFAULT NULL,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (website_id) REFERENCES websites(website_id),
    INDEX (website_id),
    INDEX (user_id)
);
\! echo "Done"

\! echo "Creating reactions table..."
CREATE TABLE IF NOT EXISTS `reactions` (
    comment_id bigint(20) unsigned NOT NULL,
    reaction_id int,
    user_id bigint(20) unsigned NOT NULL,
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
\! echo "Done"
