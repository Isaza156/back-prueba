const express = require('express')
const cors = require('cors')

const app = express()
const port = 3001

let transactionData = []

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json({
    type: "*/*"
}))

app.use(cors())

app.get('/', (req, res) => {
    res.send(JSON.stringify(transactionData))
})

app.post('/register', (req, res) => {
    let transaction = req.body
    let result = transactionData.find(value => value.userName === transaction.userName)
    if(result) {
        res.send({status: false})
    } else {
        transactionData.push(transaction)
        res.send(JSON.stringify(transactionData))
    }
})

app.post('/login', (req, res) => {
    let transaction = req.body
    let result = transactionData.find(value => value.userName === transaction.userName && value.password === transaction.password)
    if(result) {
        res.send(JSON.stringify(transactionData))
    } else {
        res.send({status: false})
    }
})

app.listen(port, () => {
    console.log("Conexión por el puerto ", port)
})
