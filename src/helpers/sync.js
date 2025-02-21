"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// sync():

module.exports = async function () {

    // return null;

    /* REMOVE DATABASE *
    const { mongoose } = require('../configs/dbConnection')
    await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')
    /* REMOVE DATABASE */

    /* User *
    {
        "_id": "67b882237fdd3cff30523c72",
        "username": "admin",
        "password": "Admin123.7"
    }
    {
        "_id": "67b8829c19bb73bb459f3da9",
        "username": "user1",
        "password": "User1123.7"
    }
    {
        "_id": "67b882c619bb73bb459f3dae",
        "username": "user2",
        "password": "User2123.7"
    }

    /* Category *
    {
      "_id": "67b8847819bb73bb459f3dc0",
      "name": "Tecnology",
      "createdAt": "2025-02-21T13:49:44.435Z",
      "updatedAt": "2025-02-21T13:49:44.435Z",
      "__v": 0
    },
    {
      "_id": "67b8848419bb73bb459f3dc4",
      "name": "Travel",
      "createdAt": "2025-02-21T13:49:56.022Z",
      "updatedAt": "2025-02-21T13:49:56.022Z",
      "__v": 0
    },
    {
      "_id": "67b8848e19bb73bb459f3dc8",
      "name": "Life Style",
      "createdAt": "2025-02-21T13:50:06.868Z",
      "updatedAt": "2025-02-21T13:50:06.868Z",
      "__v": 0
    },
    {
      "_id": "67b8849719bb73bb459f3dcc",
      "name": "Fitness",
      "createdAt": "2025-02-21T13:50:15.688Z",
      "updatedAt": "2025-02-21T13:50:15.688Z",
      "__v": 0
    },
    {
      "_id": "67b884a019bb73bb459f3dd0",
      "name": "Fashion",
      "createdAt": "2025-02-21T13:50:24.990Z",
      "updatedAt": "2025-02-21T13:50:24.990Z",
      "__v": 0
    },
    {
      "_id": "67b884ab19bb73bb459f3dd4",
      "name": "Food",
      "createdAt": "2025-02-21T13:50:35.599Z",
      "updatedAt": "2025-02-21T13:50:35.599Z",
      "__v": 0
    },
    {
      "_id": "67b884b319bb73bb459f3dd8",
      "name": "Music",
      "createdAt": "2025-02-21T13:50:43.498Z",
      "updatedAt": "2025-02-21T13:50:43.498Z",
      "__v": 0
    },
    {
      "_id": "67b884b919bb73bb459f3ddc",
      "name": "DIY",
      "createdAt": "2025-02-21T13:50:49.647Z",
      "updatedAt": "2025-02-21T13:50:49.647Z",
      "__v": 0
    },
    {
      "_id": "67b884c019bb73bb459f3de0",
      "name": "Sport",
      "createdAt": "2025-02-21T13:50:56.274Z",
      "updatedAt": "2025-02-21T13:50:56.274Z",
      "__v": 0
    },
    {
      "_id": "67b884c619bb73bb459f3de4",
      "name": "Finance",
      "createdAt": "2025-02-21T13:51:02.911Z",
      "updatedAt": "2025-02-21T13:51:02.911Z",
      "__v": 0
    },
    {
      "_id": "67b884d019bb73bb459f3de8",
      "name": "Political",
      "createdAt": "2025-02-21T13:51:12.156Z",
      "updatedAt": "2025-02-21T13:51:12.156Z",
      "__v": 0
    },
    {
      "_id": "67b884d719bb73bb459f3dec",
      "name": "Parent",
      "createdAt": "2025-02-21T13:51:19.235Z",
      "updatedAt": "2025-02-21T13:51:19.235Z",
      "__v": 0
    },
    {
      "_id": "67b884dd19bb73bb459f3df0",
      "name": "Business",
      "createdAt": "2025-02-21T13:51:25.845Z",
      "updatedAt": "2025-02-21T13:51:25.845Z",
      "__v": 0
    },
    {
      "_id": "67b884fc19bb73bb459f3df4",
      "name": "Personal",
      "createdAt": "2025-02-21T13:51:56.686Z",
      "updatedAt": "2025-02-21T13:51:56.686Z",
      "__v": 0
    },
    {
      "_id": "67b8851919bb73bb459f3df8",
      "name": "Movie",
      "createdAt": "2025-02-21T13:52:25.198Z",
      "updatedAt": "2025-02-21T13:52:25.198Z",
      "__v": 0
    },
    {
      "_id": "67b8852019bb73bb459f3dfc",
      "name": "Car",
      "createdAt": "2025-02-21T13:52:32.200Z",
      "updatedAt": "2025-02-21T13:52:32.200Z",
      "__v": 0
    },
    {
      "_id": "67b8852619bb73bb459f3e00",
      "name": "News",
      "createdAt": "2025-02-21T13:52:38.322Z",
      "updatedAt": "2025-02-21T13:52:38.322Z",
      "__v": 0
    },
    {
      "_id": "67b8852b19bb73bb459f3e04",
      "name": "Pet",
      "createdAt": "2025-02-21T13:52:43.830Z",
      "updatedAt": "2025-02-21T13:52:43.830Z",
      "__v": 0
    },
    {
      "_id": "67b8853319bb73bb459f3e08",
      "name": "Software",
      "createdAt": "2025-02-21T13:52:51.717Z",
      "updatedAt": "2025-02-21T13:52:51.717Z",
      "__v": 0
    }

    /* Blog *
    "userId": "67b882237fdd3cff30523c72",
    "categoryId": "67b884fc19bb73bb459f3df4",
    "title": "Deneme Blog",
    "content": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
    "image": "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600",
    "isPublish": true,
    "likes": [],
    "comments": [],
    "visitors": [],
    "_id": "67b88d695d0482cf142bc002",
    "createdAt": "2025-02-21T14:27:53.976Z",
    "updatedAt": "2025-02-21T14:27:53.976Z",
    "__v": 0
  }

    /* Finished */
    console.log('* Synchronized.')
}