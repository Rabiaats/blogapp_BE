"use strict"
/* -------------------------------------------------------
| FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const passwordEncrypt = require('../helpers/passwordEncrypt');
const sendMail = require('../helpers/sendMail')
const token = require('../models/token');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {

    list: async (req, res) => {
        /* 
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const result = await res.getModelList(User)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            result
        })
    },

    // CRUD:
    create: async (req, res) => {
        /* 
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    "username": "test",
                    "password": "Test01?",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */

        const result = await User.create(req.body);

    
        sendMail(
            result.email,
            'Wellcome to My Blog App',
            `
                <h1>Welcome</h1>
                <h2>${result.username}</h2>
                <p>Welcome to My Blog App</p>
            `
            )

        /* Auth Login */
        // Simple Token:
        const tokenresult = await token.create({
            userId: result._id,
            token: passwordEncrypt(result._id + Date.now())
        })

        // JWT:
        const accessToken = jwt.sign(result.toJSON(), process.env.ACCESS_KEY, { expiresIn: process.env.ACCESS_EXP })
        const refreshToken = jwt.sign({ _id: result._id, password: result.password }, process.env.REFRESH_KEY, { expiresIn: process.env.REFRESH_EXP })

        res.status(200).send({
            error: false,
            token: tokenresult.token,
            bearer: { accessToken, refreshToken },
            result
        })
    },

    read: async (req, res) => {
        /* 
           #swagger.tags = ["Users"]
           #swagger.summary = "Get Single User"
           
        */

        if (!req.user.isAdmin) req.params.id = req.user._id;

        const result = await User.findOne({ _id: req.params.id });

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {
        /* 
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    "username": "test",
                    "password": "Test01?",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */

        if (!req.user.isAdmin) req.params.id = req.user._id;

        const result = await User.updateOne({ _id: req.params.id }, req.body, { runValidators: true });


        res.status(202).send({
            error: false,
            result,
            new: await User.findOne({ _id: req.params.id })
        })
    },

    deletee: async (req, res) => {
        /* 
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete Single User"
        */

        if (!req.user.isAdmin) req.params.id = req.user._id;

        const result = await User.deleteOne({ _id: req.params.id });

        res.status(result.deletedCount ? 204 : 404).send({
            error: true,
            message: 'Something went wrong, data might be deleted already.'
        })
    },

    //todo multiDelete controller

}