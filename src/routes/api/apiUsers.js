const router = require('express').Router();
const { getAllUsers, getOneUser, getAvatar} = require('../../controllers/api/apiUsersController');

/* /api/users */

router
    .get('/',getAllUsers)
    .get('/:id',getOneUser)
    .get('/avatar/:avatar',getAvatar)
module.exports = router