Layer for defining SQL query logic. These modules are NOT responsible for executing the queries, 
but rather generating the query string to be used by controllers

ALWAYS USE mysql.escape() TO SANITIZE VARIABLE INPUTS