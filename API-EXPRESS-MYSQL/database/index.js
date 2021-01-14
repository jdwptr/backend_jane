// NOTE import module mysql unutk menyambungkan API dengan MySQL
const mysql= require('mysql')

// NOTE SETUP MYSQL
const connection = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'jdwptr',
    password : '2695Jejj$',
    database : 'practice_jcwm15'
  })

  module.exports= connection