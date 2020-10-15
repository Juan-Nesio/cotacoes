const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Bem Vindo ao Sistema de Cotações',
        author: 'Juan Carlo'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'Sobre',
        author: 'Juan Carlo'
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        title: 'Posso Ajudar?',
    })
})


app.get('/cotacoes', (req, res) => {
    
    if (!req.query.ativo) {
        return res.status(400).json({
            error : {
                mensage : 'O ativo deve ser informado ',
                code : 400
            }
        }) 
        
        
    }

    const symbol = req.query.ativo.toUpperCase()
    
    cotacoes(symbol, (data, err) => {
        if (err) {
            return res.status(500).json(err)
        }
        res.status(200).json(data)
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMensage: 'Página não encontrada',
        author: 'Juan Carlo'
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server no ar na porta ${port}`)
})