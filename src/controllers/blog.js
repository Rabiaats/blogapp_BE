"use strict";

/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

// Call Models:
const { Blog } = require("../models/blog");
const { NotFoundError } = require("../errors/customError");

/* ------------------------------------------------------- */

module.exports = {

    list: async (req, res) => {

        // Moved to middleware:
        const data = await res.getModelList(Blog, ['userId', 'categoryId'])

        res.send({
            details: await res.getModelListDetails(Blog),
            result: data,
        });
    },

    // CRUD ->

    create: async (req, res) => {

        // Login olmuşsa, userId'yi req.user'dan alalım. (session)
        req.body.userId = req.user._id

        const result = await Blog.create(req.body);

        res.send({
            result,
        });
    },

    read: async (req, res) => {
        const result = await Blog.findOne({ _id: req.params.id }).populate([
            {path: 'userId', select: 'firstName lastName'},
            {path: 'categoryId', select: 'name'}
        ]);
        if (!result) {
            throw new NotFoundError("No matching documents found");
        }

        const isUser = result.countOfVisitors.map((userId) => userId == req.user._id);

        if(!(result.userId == req.user._id) || !isUser){
            result.countOfVisitors.push(req.user._id);
        }

        res.send({
            isError: false,
            result,
        });
    },

    update: async (req, res) => {

        if (!req.user.isAdmin) req.body.userId = req.user._id;

        const result = await Blog.updateOne(
            { _id: req.params.id },
            req.body,
            { runValidators: true }
        );

        // //! güncellenmek istenen veri var ama güncelleme yapılmadı
        if (result.matchedCount > 0 && result.modifiedCount === 0) {
          return res.status(200).send({ message: "Document already up-to-date." });
        }

        res.status(202).send({
            isError: false,
            result,
            new: await Blog.findOne({ _id: req.params.postId }),
        });
    },

    deletee: async (req, res) => {

        if (!req.user.isAdmin) req.body.userId = req.user._id;

        const result = await Blog.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
            throw new NotFoundError("No matching documents found");
        }

        res.status(result.deletedCount ? 204 : 404).send({
            error: true,
            message: 'Something went wrong, data might be deleted already.'
        });
    },
};

/* ------------------------------------------------------- */
