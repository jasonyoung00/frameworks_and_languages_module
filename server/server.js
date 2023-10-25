const express = require('express')
const app = express()
const port = 8000
//const cors = require('cors')

app.use(express.json())
//app.use(cors())

app.get('/', (req, res) => {
  res.send('Server Working!')
  res.status(200)
  console.log("200 OK");
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
    return res.status(405).json({"message": "Missing Input Fields"})
  }
  else
  {
    const date_from = new Date().toISOString();
    const unique_Num = Math.random();
    
    req.body.id = unique_Num
    req.body['fromDate'] = date_from
    req.body['id'] = unique_Num;

    items.push(req.body)
    res.status(201).json()
    console.log("201 Created")
  }
})

app.get('/items', (req, res) => {
  res.json(items)
  console.log("GET items")
})

app.get('/item/:itemId', (req, res) => {
  const itemId = parseFloat(req.params.itemId);
  const itemSearched = items.find(itemSearched => itemSearched.itemId === itemId)

  if(!itemSearched)
  {
    console.log("404 Not Found");
    res.status(404).json('Failed Search');
  }

  console.log("User Not Found" + itemSearched);
  res.status(200).json(itemSearched);
  return;
})

app.delete('item/:itemId', (req, res) => {
  const itemId = parseFloat(req.params.itemId);
  const itemIndex = items.findIndex(item => item.itemId === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({message: 'Item Not Found'});
  }

  items.splice(itemIndex, -1);
  console.log("204 No Content: " + itemId);
  res.status(204).json
})

app.listen(port, () => {
  console.log(`server.js listening on port ${port}`)
})

process.on('SIGINT', function() {process.exit()})