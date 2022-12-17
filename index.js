const express = require("express")

const port = 3000
const app = express()
app.use(express.json())

/*

{ id, order, clientName, price, status }

{ 
    id: "ac3ebf68-e0ad-4c1d-9822-ff1b849589a8", 
    order: "X- Salada, 2 batatas grandes, 1 coca-cola", 
    clientName:"José", 
    price: 44.50, 
    status:"Em preparação" 
}

*/

const orders = []

app.get("/orders", (request, response) => {
  return response.json(orders)
})

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}.`)
})
