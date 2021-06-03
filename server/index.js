const dotenv = require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const app = express();
const axios = require('axios');
const cors = require('cors')

app.get('/api/getGames', (req, res) => {
  axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`)
  .then(response => {
    res.send(response.data)
  })
})

app.get('/api/getGenres', (req, res) => {
  axios.get(`https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`)
    .then(response => {
      res.send(response.data)
    })
})

app.get('/api/getGames/:id', (req, res) => {
  axios.get(`https://api.rawg.io/api/games/${req.params.id}?key=${process.env.RAWG_API_KEY}`)
    .then(response => {
      res.send(response.data)
    })
})

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
