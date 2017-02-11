/**
 * Created by jonlazarini on 11/02/17.
 */
var express = require('express')
var router = express.Router()

router.get('/genres', function(req, res, next) {
    res.send('renders GENRES route')
})

module.exports = router