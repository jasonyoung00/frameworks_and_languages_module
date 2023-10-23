const express = require('express')
const app = express()
const port = 8000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server Working!')
  res.status(200)
})

let items =
[
  {
    "id": 0,
    "user_id": "user1234",
    "keywords": [
      "hammer",
      "nails",
      "tools"
    ],
    "description": "A hammer and nails set",
    "image": "https://placekitten.com/200/300",
    "lat": 51.2798438,
    "lon": 1.0830275,
    "date_from": "2023-10-23T13:13:05.200Z",
    "date_to": "2023-10-23T13:13:05.200Z"
  }
]

app.post('/item', (req, res) => {
  if (Object.keys(req.body).toString() != "user_id,keywords,description,lat,lon") {
    return res.status(405).json({"message": "Missing Fields"})
  }
  else
  {
    const Time_Date = new Date().toISOString();
    const unique_Num = Math.random();
    
    req.body.id = unique_Num
    req.body['fromDate'] = Time_Date
    req.body['id'] = unique_Num;

    items.push(req.body)
    res.status(201).json()
    console.log("brick")
  }
})

app.get('/items', (req, res) => {
  res.json(items)
})

app.get('/item/', (req, res) => {
  res.json('Hello World!')
})

app.listen(port, () => {
  console.log(`server.js listening on port ${port}`)
})

process.on('SIGINT', function() {process.exit()})