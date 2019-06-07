const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express()

const port = process.env.PORT || 3000
//Define paths
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'myself'
  })
})

//about page
app.get('/about', (req, res) => {
  res.render('about',{
    title: 'About me',
    name: 'myself'
  })
})


//help page
app.get('/help', (req, res) => {
  res.render('help',{
    message: 'help topics',
    title: 'HELP PAGE',
    name: 'myself'
  })
})

//
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address required'
    })
  }

  geocode(req.query.address, (error, {latitiude, longitude, location}={}) => {
    if (error) {
      return res.send({error})
    }
    forecast(longitude, latitiude, (error, forecastData) => {
      if (error) {return res.send({error})
    }
      res.send({
        location: location,
        forecast: forecastData.summary,
        address:req.query.address
      })
    })
  })
})

app.get('/products',(req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    produts: []
  })
})

//404 pages
app.get('/help/*', (req, res) => {
  res.render('404',{
    title:'404',
    name:'myself',
    errorMessage: 'Help page not found'
})
})

app.get('*', (req, res) => {
  res.render('404', {
    title:'404',
    name:'myself',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {

  console.log('Server is running on port '+ port)
})
