const express = require('express')
const server = express()

const db = require('./db')

const methodOverride = require('method-override')
server.use(methodOverride('_method'))

server.use(express.static('public'))

server.use(express.urlencoded({ extended: true }))

const nunjucks = require('nunjucks')
nunjucks.configure('views', {
    express: server,
    noCache: true,
})

server.get('/', function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if(err)  {
            console.log(err)
            return res.send('Erro no banco de dados!')
        }

        const reverseIdeas = [...rows].reverse()
    
        let lastIdeas = []
        for(let idea of  reverseIdeas) {
            if(lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }
    
        return res.render('index.html', { ideas: lastIdeas })
    })
   
})

server.get('/ideias', function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if(err)  {
            console.log(err)
            return res.send('Erro no banco de dados!')
        }

        const reverseIdeas = [...rows].reverse()
    
        return res.render('ideias.html', { ideas: reverseIdeas})
    })
   
})

server.post('/', function(req, res) {

    const query = `
    INSERT INTO ideas (
        image,
        title,
        category,
        description,
        link
    ) VALUES ($1, $2, $3, $4, $5)    
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err) {
         if(err)  {
            console.log(err)
            return res.send('Erro no banco de dados!')
        }

        return res.redirect('/ideias')
    })
})

server.delete('/', function(req, res) {
    const {id} = req.body

    db.run(`DELETE FROM ideas WHERE id = $1`, [id], function(err) {
        if(err)  {
            console.log(err)
            return res.send('Erro no banco de dados!')
        }

        return res.redirect('/')
    })
})

server.listen(3000)