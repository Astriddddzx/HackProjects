const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// set the view engine to handlebars
app.use(express.static('public'))
app.set('view engine', 'hbs')

app.get('/', (req, res, next) => {
  res.render('login')
})

app.get('/rooms', (req, res, next) => {
  res.render('rooms')
})

// 404 for all unregistered routes
app.use((req, res, next) => {
  res.status(404).render('404')
})

app.listen(port, () => {
  console.log('BruinMessenger running on port: ', port)
})
