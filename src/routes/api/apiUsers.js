const router = require('express').Router();
const { all, getOneUser, getAvatar} = require('../../controllers/api/apiUsersController');

/* /api/users */

router
    .get('/',all)
    .get('/:id',getOneUser)
    .get('/avatar/:avatar',getAvatar)
module.exports = router