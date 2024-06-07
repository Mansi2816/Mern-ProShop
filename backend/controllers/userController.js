const asyncHandler = require('../middleware/async-Handler')
// const User = require('../models/userModel')

//@desc Auth user & get token
//@route POST/api/users/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const {email,password} = req.body

  const user = await User.findOne({email})

  if(user && (await user.matchPassword(password))) {
    res.json(
        {
            _id:user._id,
            name: user.name,
            email:user.email,
            isAdmin:user.isAdmin
        } 
    )
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }

})

//@desc Resgister user
//@route POST/api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    res.send('register user')
})

//@desc Logout user/ clear cookie
//@route POST/api/users/logout
//@access Private

const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user')
})

//@desc Get user profile
//@route GET/api/users/profile
//@access Public

const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile')
})


//@desc update user profile
//@route PUT/api/users/update
//@access Private

const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile')
})


//@desc Get users 
//@route GET/api/users
//@access Private/admin

const getUsers = asyncHandler(async (req, res) => {
    res.send('get users')
})

//@desc Delete users
//@route delete/api/users/delete:id
//@access Private   

const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user')
})

//@desc Update users
//@route update/api/users/:id
//@access Private   

const updateUser = asyncHandler(async (req, res) => {
    res.send('update user')
})


//@desc Get users by Id
//@route GET/api/users/:id
//@access Private/admin

const getUsersbyID = asyncHandler(async (req, res) => {
    res.send('get user by id')
})

module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    updateUser,
    getUsersbyID,
}