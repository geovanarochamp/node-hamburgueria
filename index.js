const express = require("express")
const port = 3000

const app = express()

app.get("/orders", (request, response) => {
  return response.send("Hello Node")
})

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}.`)
})
