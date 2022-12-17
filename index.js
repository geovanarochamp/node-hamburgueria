const express = require("express")
const uuid = require("uuid")

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

// route: Route {
//     path: '/orders/:id',
//     stack: [ [Layer], [Layer] ],
//     methods: { get: true }
//   },

const orders = []

const showMethodAndPath = (request, response, next) => {
  const { method, path } = request

  console.log(`Request Method: ${method}`)
  console.log(`URL: ${path}`)

  next()
}

app.use(showMethodAndPath)

const checkOrderId = (request, response, next) => {
  const { id } = request.params

  const indexOfOrderToCheck = orders.findIndex((order) => order.id === id)
  if (indexOfOrderToCheck < 0) {
    return response.json({ error: "Order not found." })
  }

  request.orderIndex = indexOfOrderToCheck

  next()
}

app.get("/orders", (request, response) => {
  return response.json(orders)
})

app.get("/orders/:id", checkOrderId, (request, response) => {
  const index = request.orderIndex

  return response.json(orders[index])
})

app.post("/orders", (request, response) => {
  const { order, clientName, price } = request.body

  const newOrder = {
    id: uuid.v4(),
    order,
    clientName,
    price,
    status: "Em preparação",
  }

  orders.push(newOrder)

  return response.status(201).json(newOrder)
})

app.delete("/orders/:id", checkOrderId, (request, response) => {
  const index = request.orderIndex

  orders.splice(index, 1)

  return response.status(201).json({ message: "Pedido deletado." })
})

app.patch("/orders/:id", checkOrderId, (request, response) => {
  const index = request.orderIndex
  orders[index].status = "Pronto"

  return response.status(201).json(orders[index])
})

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}.`)
})
