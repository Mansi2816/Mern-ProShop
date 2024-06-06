const express = require('express');
const router = express.Router()
const { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    updateUser,
    getUsersbyID,} = require('../controllers/userController')

router.route('/').get(getUsers).post(registerUser)
router.post('/login' , authUser)
router.post('/logout' , logoutUser)
router.get('/profile', getUserProfile)
router.put('/profile', updateUserProfile)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)
router.get('/:id', getUsersbyID)


module.exports = router