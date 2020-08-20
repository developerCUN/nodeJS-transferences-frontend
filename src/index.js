const express = require('express');
const bodyParser = require('body-parser');
const config = require ('./config/config.js');
const userRoutes = require('./routes/userRoutes.js');

//const url = config.api_url

//Server Configuration
const port = config.port;
const app = express();

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', userRoutes);

app.set('view engine', 'pug');
app.set('views', './src/templates');


app.set('port', port || 3001);


const server = app.listen(port, () => {
  console.log(`Server Client: Server app listening on port ${port}!` );
});
