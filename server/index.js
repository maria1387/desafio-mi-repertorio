
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cancionesRouter = require('./routes/canciones.routes')
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(cancionesRouter)



	


app.listen(8000)
console.log('serve on port 8000')