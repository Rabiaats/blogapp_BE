"use strict";

/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

// Call Models:
const Blog  = require("../models/blog");
const { NotFoundError } = require("../errors/customError");
const requestIP = require("request-ip");
const encrypt = require("../helpers/passwordEncrypt");

/* ------------------------------------------------------- */

module.exports = {

    list: async (req, res) => {
         /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "List Blogs"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

        if (req.query.author) {
            const data = await Blog.find({ userId: req.query.author }).populate([
                {
                  path: "userId",
                  select: "firstName lastName image",
                }
            ]);
    
          res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Blog, {
              userId: req.query.author,
            }),
            data,
          });
        } else {
            const data = await Blog.find({ isPublish: true }).sort({createdAt: 'desc'}).populate([
                "categoryId",
                {
                  path: "userId",
                  select: "firstName lastName image",
                }
              ]);
    
          res.status(200).send({
            error: false,
            data,
          });
        }
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Create Blog"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref"#/definitions/Blog"
                    }
            }
        */

        req.body.userId = req.user._id

        const result = await Blog.create(req.body);

        res.send({
            error: false,
            result
        });
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Get Single Blog"
        */
       

        const ip = encrypt(requestIP.getClientIp(req));

        const result = await Blog.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { visitors: ip } },
            { new: true }
          ).populate([
            {
              path: "userId",
              select: "username firstName lastName image",
            },
            {
              path: "comments",
              select: "_id comment blogId updatedAt",
              populate: {
                path: "userId",
                select: "username firstName lastName image",
              },
            }
          ]);

        res.send({
            isError: false,
            result,
        });
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Update Blog"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref"#/definitions/Blog"
                    }
            }
        */

        if (!req.user.isAdmin) req.body.userId = req.user._id;

        const result = await Blog.updateOne(
            { _id: req.params.id },
            req.body,
            {runValidators:true}
          ).populate(
            {
              path: "userId",
              select: "username firstName lastName image",
            },
            {
              path: "comments",
              select: "_id comment blogId updatedAt",
              populate: {
                path: "userId",
                select: "username firstName lastName image",
              },
            }
          );

        if (result.matchedCount > 0 && result.modifiedCount === 0) {
          return res.status(200).send({ message: "Document already up-to-date." });
        }

        res.status(202).send({
            isError: false,
            result,
            new: await Blog.findOne({ _id: req.params.id }),
        });
    },

    deletee: async (req, res) => {
         /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Delete Blog"
        */

        const result = await Blog.deleteOne({
            userId: req.user._id, 
            _id: req.params.id 
        });

        if (result.deletedCount === 0) {
            throw new NotFoundError("No matching documents found");
        }

        res.status(result.deletedCount ? 204 : 404).send({
            isError: true,
            message: 'Something went wrong, data might be deleted already.'
        });
    },

    postLike: async (req, res) => {
         /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Add/Remove Like"
        */

        const blog = await Blog.findOne({ _id: req.params.id });

        if(!blog){
            return res.status(404).send({
                error: true,
                message: "Blog not found",
            });
        }

        const like = blog.likes.includes(req.user._id);

        const update = like
            ? { $pull: { likes: req.user._id } }
            : { $addToSet: { likes: req.user._id } };

        const data = await Blog.findByIdAndUpdate(req.params.id, update, {
            new: true,
        }).select("likes");

        res.status(200).send({
            error: false,
            userLike: !like,
            data
          });
    }
};

/* ------------------------------------------------------- */
