const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routers/index');
const routesAuth = require('./routers/auth');
const PORT = process.env.PORT;

const app = express();

app.use(express.static('public'));

app.use(cors());
app.use(express.json());

app.use('/', routes);
app.use('/auth', routesAuth);
app.use((req, res) =>
  res.status(404).json({
    success: false,
    message: 'router is not found.',
  }),
);
app.listen(PORT, () => console.log('App is running on port : ' + PORT));
