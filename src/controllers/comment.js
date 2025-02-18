"use strict"


const Comment = require('../models/comment');
const Blog  = require("../models/blog");


module.exports = {

    // list: async (req, res) => {
    //     /* 
    //         #swagger.tags = ["Comments"]
    //         #swagger.summary = "List Comments"
    //         #swagger.description = `
    //             You can send query with endpoint for search[], sort[], page and limit.
    //             <ul> Examples:
    //                 <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
    //                 <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
    //                 <li>URL/?<b>page=2&limit=1</b></li>
    //             </ul>
    //         `
    //     */

    //     const data = await res.getModelList(Comment)

    //     res.status(200).send({
    //         error: false,
    //         details: await res.getModelListDetails(Comment),
    //         data
    //     })
    // },

    create: async (req, res) => {
        /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "Create Comment"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    $ref"#/definitions/Comment"
                }
            }
        */

        req.body.userId = req.user._id;

        const comment = await Comment.create(req.body);

        const data =  await Comment.findById(comment._id).populate({
            path: "userId",
            select: "username firstName lastName image",
        });

        await Blog.findOneAndUpdate({_id : req.body.blogId}, {$push: { comments: comment._id }});

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /* 
           #swagger.tags = ["Comments"]
           #swagger.summary = "Get Single Comment"
        */

        const data = await Comment.findOne({ _id: req.params.id }).populate([
            { path: "userId", select: "firstName lastName image username" },
          ]);

          if (!data) {
            return res.status(404).send({
              error: true,
              message: "Comment not found",
            });
          }

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "Update Comment"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    $ref"#/definitions/Comment"
                }
            }
        */

        const data = await Comment.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true })

        if (!data) {
            return res.status(404).send({
              error: true,
              message: "Comment not found",
            });
          }


        res.status(202).send({
            error: false,
            data,
        })
    },

    deletee: async (req, res) => {
        /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "Delete Single Comment"
        */

        const data = await Comment.findOneAndDelete({ _id: req.params.id })

        if (!data) {
            return res.status(404).send({
              error: true,
              message: "Comment not found",
            });
          };

        await Blog.findByIdAndUpdate(data.blogId, {
            $pull: { comments: req.params.id },
        });

        res.status(data ? 204 : 404).send({
            error: true,
            message: 'Something went wrong, data might be deleted already.'
        })
    },

}