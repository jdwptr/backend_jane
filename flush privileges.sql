-- user privileges
ALTER USER 'jdwptr'@'%' IDENTIFIED WITH mysql_native_password BY '2695Jejj$';

-- Where root as your user localhost as your URL and password as your password

-- Then run this query to refresh privileges:

flush privileges;

-- Try connecting using node after you do so.

-- If that doesn't work, try it without @'localhost' part.