const router = require('express').Router();
const { getAllUsers, getOneUser, getAvatar,verifyEmail} = require('../../controllers/api/apiUsersController');

/* /api/users */

router
    .get('/',getAllUsers)
    .get('/:id',getOneUser)
    .get('/avatar/:avatar',getAvatar)
    .post('/verify-email',verifyEmail)
module.exports = router