const sqlite3 = require('sqlite3').verbose()
const  db = new sqlite3.Database('./workshopdev.db')

db.serialize(function() {
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS ideas(
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         title TEXT,
    //         category TEXT,
    //         description TEXT,
    //         link TEXT
    //     )
    // `)
    
    // const query = `
    // INSERT INTO ideas (
    //     image,
    //     title,
    //     category,
    //     description,
    //     link
    // ) VALUES ($1, $2, $3, $4, $5)    
    // `
    // const values = [
    //     req.body.image,
    //     req.body.title,
    //     req.body.category,
    //     req.body.description,
    //     req.body,
    // ]

    // db.run(query, values, function(err) {
    //      if(err)  {
    //         console.log(err)
    //         return res.send('Erro no banco de dados!')
    //     }

    // db.run(`DELETE FROM ideas WHERE id = ?`, [4], function(err) {
    //     if(err) return console.log(err)

    //     console.log("DELETEI", this)
    // })

}) 

module.exports = db