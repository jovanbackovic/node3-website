const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Backo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Backo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Backo'
    })
})

app.get('/weather', (req, res) => {
    const {address} = req.query
    if(!address){
        res.send({
            error: 'You must provide an address'
        })
        return
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            res.send({
                error
            })
            return
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                res.send({
                    error
                })
                return
            }
            res.send({
                location, forecastData
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: 'Doc not found',
        name: 'Backo',
        error: 'Documentation page is not found'
    })
})

app.get('*', (req, res) => {
    res.render('not-found', {
        title: 'Page not found',
        name: 'Backo',
        error: '404'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})