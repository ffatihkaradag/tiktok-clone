import express from 'express'
import mongoose from 'mongoose'
import Data from './data.js'
import Videos from './dbModel.js'
//app config
const app = express()
const port = process.env.PORT || 9000

//middlewares
app.use(express.json())
app.use((req, res, next) => {
  res.setHeaders('Access-Control-Allow-Origin', '*'),
    res.setHeaders('Access-Control-Allow-Headers', '*'),
    next()
})

//DB config
const connection_url =
  'mongodb+srv://admin:cWojsBYb9KoJeJnj@cluster0.0l73i.mongodb.net/tiktok?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

//api endpoints
app.get('/', (req, res) => {
  res.send('Hello Worlds!')
})

app.get('/v1/posts', (req, res) => {
  res.status(200).send(Data)
})

app.get('/v2/posts', (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.post('/v2/posts', (req, res) => {
  //post request is to add data to the database
  const dbVideos = req.body

  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

//listen
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
