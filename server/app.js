
import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import App from '../src/app'


const app = express();

app.use(express.static('public'))

app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
      <head>
        <link rel='stylesheet' href='/main.css'>
        <script src='/bundle.js defer'></script>
      </head>
      <body>
        <!-- append compiled React app-->
        <div id='root'>${renderToString(<App />)}</div>
      </body>
    </html>
  `)
})

module.exports = app