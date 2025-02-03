# BLOG API

### ERD:

![ERD](./erdBlogAPI.png)

### Folder/File Structure:

```
    .env
    .gitignore
    index.js
    package.json
    readme.md
    src/
        config/
            dbConnection.js
            swagger.json
        controllers/
            auth.js
            token.js
            user.js
        helpers/
            passwordEncrypt.js
            sendMail.js
        middlewares/
            authentication.js
            errorHandler.js
            findSearchSortPage.js
            logger.js
            permissions.js
            upload.js
        models/
            token.js
            user.js
        routes/
            auth.js
            document.js
            index.js
            token.js
            user.js
```