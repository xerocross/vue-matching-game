const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'))
app.use('/dist', express.static('dist'))


app.listen(port, () => console.log(`istening on port ${port}!`))