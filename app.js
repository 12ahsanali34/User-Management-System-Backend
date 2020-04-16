const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

db.authenticate()
.then(()=> console.log('Database connected...'))
.catch((err)=> console.log('Error: ', err))


const app = express();
app.use(bodyParser.json())

app.get(['/','/update','/get-user'], require('./router/users'))
app.get(['/contacts', '/contact_delete'], require('./router/contacts'))

app.post(['/add'], require('./router/users'))
app.post(['/contact_add', '/contact_update'], require('./router/contacts'))

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log('Server is running on port :'+PORT))