const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Server is Working!')
})

app.listen(port, () => {
  console.log(`server.js listening on port ${port}`)
})