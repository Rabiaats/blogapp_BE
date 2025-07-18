"use strict"


const Category = require('../models/category');

module.exports = {

    list: async (req, res) => {
        /* 
            #swagger.tags = ["Categories"]
            #swagger.summary = "List Categories"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const result = await res.getModelList(Category)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Category),
            result
        })
    },

    // CRUD:
    create: async (req, res) => {
        /* 
            #swagger.ignore = true
        */

        const result = await Category.create(req.body)

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {
        /* 
           #swagger.tags = ["Categories"]
           #swagger.summary = "Get Single Category"
        */

        const result = await Category.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {
        /* 
            #swagger.ignore = true
        */

        const result = await Category.updateOne({ _id: req.params.id }, req.body, { runValidators: true })


        res.status(202).send({
            error: false,
            result: await Category.findOne({ _id: req.params.id })
        })
    },

    deletee: async (req, res) => {
        /* 
            #swagger.ignore = true
        */

        const result = await Category.deleteOne({ _id: req.params.id })

        res.status(result.deletedCount ? 204 : 404).send({
            error: true,
            message: 'Something went wrong, data might be deleted already.'
        })
    },

}