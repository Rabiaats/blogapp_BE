"use strict"

const router = require('express').Router();

const { list, create, read, update, deletee } = require('../controllers/blog');
const { isLogin} = require('../middlewares/permissions')


router.route('/').get(list).post(isLogin, create);

router.route('/:id').get(isLogin, read).put(isLogin, update).patch(isLogin, update).delete(isLogin, deletee);

/* ------------------------------------------------------- */
module.exports = router;