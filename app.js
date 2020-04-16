const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

db.authenticate()
.then(()=> console.log('Database connected...'))
.catch((err)=> console.log('Error: ', err))

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
const app = express();
app.use(allowCrossDomain);
app.use(bodyParser.json())

app.get(['/','/update','/get-user'], require('./router/users'))
app.get(['/contacts', '/contact_delete'], require('./router/contacts'))

app.post(['/add', '/auth'], require('./router/users'))
app.post(['/contact_add', '/contact_update'], require('./router/contacts'))

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log('Server is running on port :'+PORT))