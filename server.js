const http = require('http');
const express = require('express')
const db = require('./db')
const es6Renderer = require('express-es6-template-engine');
const cohorts = require('./db');
const cohort = require('./db');
const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.engine('html', es6Renderer)
app.set('views', 'templates')
app.set('view engine', 'html')

const server = http.createServer(app)

app.use((req, res, next) => {
    console.log('Sweet request bro!', req.url)
    next()
})


app.get('/', (req, res) => {
    // render the 'template/home.html' file
    // looks in themplates folder by default
    //don't need to include html either
    res.render('home', {
        locals: {
            title: 'Yes'
        },
        partials: {
            head: 'partials/head'
        }
    })
})



app.get('/greet/:handle', (req, res) => {
    const { handle } = req.params;
    res.send(`<h1>Hello, ${handle}!</h1>`);
})

app.get('/cohort', (req, res) => {
    let html = '';
    db.forEach(cohort => {
        html += `<li>${cohort.name}/${cohort.handle}: ${cohort.skill}</li>`
    })
    res.render('cohort', {
        locals: {
            title: 'Cohort Page',
            cohort: db
        },
        partials: {
            head: 'partials/head'
        }
    })
})

app.get('/cohort/:name', (req, res) => {
    const friendSingle = db.find((cohort) => {
        if (cohort.name === req.params.name) {
            return true
        } else {
            return false
        }
    })



    if (friendSingle) {
        res.render('friendSingle', {
            locals: {
                title: 'Cohort List',
                friend: db
            },
            partials: {
                head: 'partials/head'
            }
        })
    } else {
        res.status(404)
        res.send('Couldn\'t find user with that handle')
    }
})

app.get('*', (req, res) => {
    res.send('Page not found');
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello Wolrd')
//     if (req.url === '/'){
//         res.end('Hello')
//     } else if (req.url == '/about'){
//         res.end('About Page')
//     } else if (req.url === '/contact') {
//         res.end('Contace Page')
//     } else {
//         res.statusCode = 404
//         res.end('page not found')
//     }

// });

// server.listen(port, hostname, () => {
//     console.log(`Server is running at http://${hostname}:${port}`)
// })