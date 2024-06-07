const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync("123456",10),
        isAdmin:true,
    },
    {
        name: 'Mansi Soni',
        email: 'mansi@gmail.com',
        password: bcrypt.hashSync("123456",10),
        isAdmin:true,
    },
    {
        name: 'Avesh Gaur',
        email: 'avesh@gmail.com',
        password: bcrypt.hashSync("123456",10),
        isAdmin:true,
    }
]
module.exports = users