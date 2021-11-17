SET FOREIGN_KEY_CHECKS = 0;

\! echo "Dropping comments..."
DROP TABLE IF EXISTS `comments`;
\! echo "Done"

\! echo "Dropping users..."
DROP TABLE IF EXISTS `users`;
\! echo "Done"

\! echo "Dropping webistes..."
DROP TABLE IF EXISTS `websites`;
\! echo "Done"

\! echo "Dropping reactions..."
DROP TABLE IF EXISTS `reactions`;
\! echo "Done"

SET FOREIGN_KEY_CHECKS = 1;