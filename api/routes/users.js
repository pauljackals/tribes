const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/login/:email', async (req, res) => {
    const email = req.params.email;
    User.findOne({email}, (error, user) => {
        if(error){
            return res.status(500).send({error});

        }
        const status = user===null ? 404 : 200
        return res.status(status).send({user});
    })
});

router.post('/', async (req, res) => {
    const body = req.body;
    const userNew = new User({
        name: body.name,
        email: body.email
    });
    userNew.save( (error, user) => {
        if(error){
            return res.status(500).send({error});
        }
        return res.send({user});
    })
});

module.exports = router;
