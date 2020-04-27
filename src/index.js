const express = require('express')
const cors = require('cors')
const weatherRouter = require('./routers/weatherRouter')
const authRouter = require('./routers/authRouter')
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())
app.use(weatherRouter)
app.use(authRouter)

app.listen(port, () => {
    console.log('Server connected, port: ' + port)
})