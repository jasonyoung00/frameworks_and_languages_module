const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile('client.html', {root: __dirname})
  console.log("200 OK");
})

/*var items = {
  1: {
    "id": 1,
    "user_id": "user1234",
    "keywords": ["hammer", "nails", "tools"],
    "description": "A hammer and nails set",
    "lat": 1,
    "lon": 1,
    "date_from": "2021-11-22T08:22:39.067408",
  }
};*/

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
    const date_Curr = new Date().toISOString();
    const unique_Num = Math.random();

    req.body.id = unique_Num;
    req.body['date_from'] = date_Curr;
    req.body['id'] = unique_Num;
    

    items.push(req.body)
    console.log("201 Created")
    return res.status(201).json(req.body)
  }
})

app.get('/items', (req, res) => {
  res.json(items)
  console.log("GET items")
})

app.get('/item/:id', (req, res) => {
  for (let i of items)
  {
    if (i.id == req.params.id)
    {
      console.log("GET item")
      return res.status(200).json(i)
    }
  }
  return res.status(404).json({message: "Not Found"});
})

app.delete('/item/:id', (req, res) => {

  const itemId = parseFloat(req.params.id);
  const itemIndex = items.findIndex(item => item.id === itemId);

  if (itemIndex === -1) 
  {
    return res.status(404).json({message: 'Item Not Found'});
  }
  else
  {
    items.splice(itemIndex, 1)
    console.log("204 No Content")
    return res.status(204).json();
  }
})

app.listen(port, () => {
  console.log(`server.js listening on port ${port}`)
})

process.on('SIGINT', function() {process.exit()})