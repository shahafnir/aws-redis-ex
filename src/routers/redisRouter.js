const express = require('express')

const redisClient = require('../db/redis')

const router = new express.Router()

router.post('/set-string', async (req, res) => {
    try {
        await redisClient.setAsync(req.body.key, req.body.value)

        res.send()
    } catch (error) {
        console.log(error)
    }
})

router.get('/get-string/:key', async (req, res) => {
    try {
        const value = await redisClient.getAsync(req.params.key)

        res.send(value)
    } catch (error) {
        console.log(error)
    }
})

router.post('/set-list', async (req, res) => {
    try {
        await redisClient.rpushAsync(req.body.key, req.body.list)

        res.send()
    } catch (error) {
        console.log(error)
    }
})

router.get('/get-list/:key', async (req, res) => {
    try {
        const list = await redisClient.lrangeAsync(req.params.key, 0, -1)

        res.send(list)
    } catch (error) {
        console.log(error)
    }
})

router.post('/set-hash', async (req, res) => {
    const hashArray = []

    for (let [key, value] of Object.entries(req.body.hash)) {
        hashArray.push(key)
        hashArray.push(value)
    }

    try {
        await redisClient.hmsetAsync(req.body.key, hashArray)

        res.send()
    } catch (error) {
        console.log(error)
    }
})

router.get('/get-hash/:key', async (req, res) => {
    try {
        const hash = await redisClient.hgetallAsync(req.params.key)

        res.send(hash)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
