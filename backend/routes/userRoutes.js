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


const {protect, admin} = require('../middleware/authMiddleware') 


router.route('/').get(protect, admin, getUsers).post(registerUser)
router.post('/auth', authUser)
router.post('/logout' , protect, logoutUser)
router.get('/profile',protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)
router.delete('/:id', protect, admin, deleteUser)
router.put('/:id',protect, admin, updateUser)
router.get('/:id',protect, admin, getUsersbyID)


module.exports = router