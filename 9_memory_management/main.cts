const express = require('express')
const app = express()
const port = 3000

var count = 0;

app.get('/', (req, res) => {
  res.send({
    hello: `You are the ${++count}'th user since startup`
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
