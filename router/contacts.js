const express = require('express');
const router = express.Router();
const ContactsModel = require('../models/contacts');
var bodyParser = require('body-parser')

router.get('/contacts',(req, res) => {
    ContactsModel.findAll(
        {
            attributes: ['name','number','role', 'id', 'age'],
            where: {
                user_id: req.query.user_id
            }
        }
    )
    .then(users=> {
        console.log(JSON.stringify(users), ' JSON.stringify(users)')
        res.setHeader('Content-Type', 'application/json');
        res.status(200)
        res.send(JSON.stringify(users))
        res.end()
    })
    .catch(err=> console.log(err, ' Error res'))
})

router.post('/contact_add',(req, res) => {
    const { name, number, user_id, age, role } = req.body
    console.log("contact", req.body)

    ContactsModel.create({
        name,
        number,
        user_id,
        age,
        role
    })
    .then(contacts=> {
        res.send({
            status:200,
            message:'contact added.'
        })
        res.end()
    })
    .catch(err=> console.log(err, ' Error res contact'))
    
})

router.get('/contact_delete',(req, res) => {
    ContactsModel.destroy({
        attributes: ['name','number'],
        where: {
            id: req.query.id
        }
    })
    .then(contacts=> {
        res.send({
            status:200,
            message:'contact deleted.'
        })
        res.end()
    })
    .catch(err=> console.log(err, ' Error res contact'))
})

router.post('/contact_update',(req, res) => {
    const { name, number, user_id } = req.body
    ContactsModel.update(
        {
            name,
            number,
            user_id
        },
        {
            where: { id: req.query.id }
        }
    )
    .then(contacts=> {
        res.send({
            status:200,
            message:'contact updated.'
        })
        res.end()
    })
    .catch(err=> console.log(err, ' Error res contact'))
})

module.exports = router;
