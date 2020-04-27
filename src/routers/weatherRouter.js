const express = require('express')
const tiny = require('tiny-json-http')

const router = express.Router()
const URL = "http://ec2-52-213-160-18.eu-west-1.compute.amazonaws.com:3000"

router.get('/weather-service/weather/:city', async (req, res) => {
    const city = req.params.city
    const url = URL + "/weather/" + city

    try {
        const response = (await tiny.get({ url })).body

        res.send(response)
    } catch (e) {
        if (e.statusCode === 404) {
            res.status(404).send({ error: "city not found" })
        } else {
            res.status(500).send({ error: "bad connection" })
        }
    }
})

router.get('/weather-service/weather-history/:city', async (req, res) => {
    const city = req.params.city
    const url = URL + "/weather-history/" + city

    try {
        const response = (await tiny.get({ url })).body
        res.send(response)
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/weather-service/actual-temp/:city', async (req, res) => {
    const city = req.params.city
    const actual_temp = req.query.actual_temp
    url = URL + "/actual-temp/" + city + "?actual_temp=" + actual_temp

    try {
        if (actual_temp) {
            const response = (await tiny.post({ url })).body
            res.send(response)
        } else {
            res.status(400).send({ error: "lack of actual_temp query parameter" })
        }
    } catch (e) {
        if (e.statusCode === 404) {
            res.status(404).send({ error: "city not found" })
        } else if (e.statusCode === 500) {
            res.status(500).send({ error: "connection problem" })
        } else {
            res.status(400).send()
        }
    }

})

module.exports = router