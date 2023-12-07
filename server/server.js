const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000


app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  //res.send('Server Working!')
  res.sendFile('client.html', {root: __dirname}) //get the file client.html and send it to the client page
  res.status(200)
  //console.log("200 OK");
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

let items = //example data. will display up when client/server is running
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
    "image": "http://placekitten.com/100/100",
    "lat": 51.2798438,
    "lon": 1.0830275,
    "date_from": "2023-10-23T13:13:05.200Z",
    "date_to": "2023-10-23T13:13:05.200Z"
  }
]

app.post('/item', (req, res) => {
  
  const dateFrom = new Date().toISOString(); //creates new JavaScript Date object representing current date/time, then converts to string in ISO 8601 format, stored in the "dateFrom" variable
  const dateTo = new Date().toISOString();

  if (!req.body.user_id || !req.body.lat || !req.body.lon || !req.body.keywords || !req.body.description) //validates the inputs, if any fields are missing then 405 Method Not Allowed 

  {
    console.log("405 Method Not Allowed") //shows 405 Method Not Allowed in the console/terminal
    res.status(405).json({ error: "Missing Fields" }); //"res" - response object in Express.js | "status(405)" - Sets HTTP status code to 405 (Method Not Allowed) | "json({ error: "Missing Fields" })" - Sends JSON response with specified error message.
  }
  else
  {
    req.body['Date_From'] = dateFrom; //"Date_From" property set in "req.body" to the value of "dateFrom"
    req.body['Date_To'] = dateTo;

    const inputFields = 
    {
      "id": Math.floor(Math.random()*100), //generates random decimal between 0 and 1, multiply by 100, then uses math.floor on the result to get an integer
      "user_id": req.body.user_id,
      "lat": req.body.lat,
      "lon": req.body.lon,
      "image": req.body.image,
      "keywords": req.body.keywords,
      "description": req.body.description,
      "date_from": req.body['Date_From'],
      "date_to": req.body['Date_To'],
    };

    items.push(inputFields) //".push" used to add one or more elements from "inputFields" to "items"
    console.log("200 OK")
    return res.status(201).json(inputFields)
  }
})

app.get('/items', (req, res) => {
  console.log("GET items")
  return res.status(200).json(items) //returns all elements from "items"
})

app.get('/item/:id', (req, res) => {
  for (let i of items) //iterates through "items", if the "id" matches the one inputted, then return that id stored in "i"
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
  const itemId = parseFloat(req.params.id); //converts "id" parameter from the URL to floating-point number and store in "itemId" variable
  const itemIndex = items.findIndex(item => item.id === itemId); //using "findIndex" method to locate the index of an item in "items" 
  
  if (itemIndex === -1) 
  {
    return res.status(404).json({message: 'Item Not Found'}); //if the item to be deleted doesn't exist then 404 returned
  }
  else
  {
    items.splice(itemIndex, 1) //".splice" used to remove one element from "items" at specified index "itemIndex"
    console.log("204 No Content")
    return res.status(204).json();
  }
})

app.listen(port, () => {
  console.log(`server.js listening on port ${port}`)
})

process.on('SIGINT', function() {process.exit()})