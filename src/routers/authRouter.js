const express = require('express')
const tiny = require('tiny-json-http')

const URL = "http://ec2-34-244-57-90.eu-west-1.compute.amazonaws.com:3000"

const router = express.Router()

router.post('/auth-service/signup', async (req, res) => {
    const data = req.body
    const url = URL + "/signup"

    try {
        const response = (await tiny.post({ url, data })).body
        res.status(201).send(response)
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/auth-service/login', async (req, res) => {
    const data = req.body
    const url = URL + "/login"

    try {
        const response = (await tiny.post({ url, data })).body
        res.send(response)
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/auth-service/new-token', async (req, res) => {
    const url = URL + "/new-token"
    const headers = req.headers

    try {
        const response = (await tiny.post({ url, headers })).body
        res.send(response)
    } catch (e) {
        if (e.statusCode === 401) {
            res.status(401).send()
        } else {
            res.status(400).send()
        }
    }
})

router.get('/auth-service/check-token', async (req, res) => {
    const url = URL + "/check-token"
    const headers = req.headers

    try {
        const response = (await tiny.get({ url, headers })).body
        res.send(response)
    } catch (e) {
        if (e.statusCode === 401) {
            res.status(401).send()
        } else {
            res.status(400).send()
        }
    }
})

module.exports = router
