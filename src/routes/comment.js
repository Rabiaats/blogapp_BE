"use strict"

const router = require('express').Router();


const { list, create, read, update, deletee } = require('../controllers/comment');
const { isLogin } = require('../middlewares/permissions');

// URL: /comment

router.use(isLogin)

router.route('/').get(list).post(create);

router.route('/:id').get(read).put(update).patch(update).delete(deletee);

/* ------------------------------------------------------- */
module.exports = router;