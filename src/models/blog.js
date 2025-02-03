"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')

const BlogSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    title:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },

    content: {
        type: String,
        trim: true,
        required: true,
    },

    image:{
        type:String,
        required: true,
        trim:true
    },
    
    isPublish:{
        type:Boolean,
        default:false
    },
    
    likes:{
        type:Array,
        default:[]
    },
    
    countOfVisitors:{
        type:Array,
        default:[]
    },

}, {

    collection:'blogs',
    timestamps:true

})

module.exports = mongoose.model('Blog',BlogSchema);