require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();
const axios = require('axios');
const { response } = require('express');
const cors = require('cors')

app.get('/getGames', cors(), (req, res) => {
  axios.get('https://api.rawg.io/api/games?key=4ac7afb1b60f401eb680d188cfd7eaef')
  .then(response => {
    res.send(response.data)
  })
})

app.get('/getGenres', cors(), (req, res) => {
  axios.get('https://api.rawg.io/api/genres?key=4ac7afb1b60f401eb680d188cfd7eaef')
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
