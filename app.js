const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');

db.authenticate()
.then(()=> console.log('Database connected...'))
.catch((err)=> console.log('Error: ', err))

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
}
const app = express();
app.use(allowCrossDomain);
app.use(bodyParser.json())

function varifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1]
        req.token = bearerToken
    }
    else{
        res.sendStatus(403)
    }
    next();
}

app.get(['/','/update','/get-user'], varifyToken ,require('./router/users'))
app.get(['/contacts', '/contact_delete'], varifyToken ,require('./router/contacts'))

app.post(['/add', '/auth'], require('./router/users'))
app.post(['/contact_add', '/contact_update'], varifyToken ,require('./router/contacts'))

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log('Server is running on port :'+PORT))