const express = require('express')
const app = express()
require('dotenv').config({
  path: `.env`
})
const port = process.env.PORT || 500
app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());
  

//database connection
require("./server/mongo/config");

app.use("/auth", require("./server/routes/auth"))
app.use("/user", require("./server/routes/user"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})